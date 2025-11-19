import { dynamicFun, dateFormater, pickerOptions } from '../../utils/index.js';
import LocalMixin from '../../locale/mixin.js';
import request from '../../utils/request.js';
import cloneDeep from 'lodash/cloneDeep';

export default {
  mixins: [LocalMixin],
  props: {
    // 表单数组
    record: {
      type: Object,
      required: true
    },
    // form-item 宽度配置
    models: {
      type: Object,
      default: () => {
        return {};
      }
      //required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否预览结果表单
    preview: {
      type: Boolean,
      default: false
    },
    // 当前是否拖拽面板
    isDragPanel: {
      type: Boolean,
      default: false
    },
    selectItem: {
      type: Object
    },
    propPrepend: {
      type: String,
      default: ''
    },
    cascade: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      //针对实时搜索回调的时候将动态的url放置在外部，方便组件联动的时候引用
      remoteUrl: '',
      remoteFilter: {}, // 远程过滤搜索 结构 {key:xx,value:xx}
      // select radio checkbox 等这种array的远程数据
      checkValues: [],
      loading: false,
      copyLstenModel: '' // 监听数据字段的变化
    };
  },
  inject: {
    // 自定义组件
    customComponents: {
      from: 'customC',
      default: () => []
    },
    // 表单全局config配置
    configInject: {
      from: 'configC'
    },
    ngConfig: {
      from: 'ngConfig',
      default: () => {
        return {};
      }
    },
    topModelsC: {
      from: 'topModelsC',
      default: null
    }
  },
  computed: {
    config() {
      if (
        this.configInject &&
        this.configInject != null &&
        this.configInject != undefined
      ) {
        return this.configInject() || {};
      }
      return {};
    },
    topModels() {
      console.log('this.topModelsC', this.topModelsC);
      if (
        this.topModelsC &&
        this.topModelsC != null &&
        this.topModelsC != undefined
      ) {
        return this.topModelsC() || {};
      }
      return {};
    },
    // 禁用
    recordDisabled() {
      if (this.isDragPanel) return false;

      if (this.disabled || this.preview) return true;
      if (this.record.options && this.record.options.disabled) return true;

      // 判断动态禁用是否打开 并且条件是否满足
      if (
        this.record.options.dynamicDisabled &&
        this.record.options.dynamicDisabledValue
      ) {
        const script = this.record.options.dynamicDisabledValue;

        // 打开了开关 这里获取函数内容
        const fvalue = dynamicFun(script, this.models, this.topModels);
        return fvalue;
      }

      return false;
    },
    dicts() {
      return this.ngConfig ? this.ngConfig.dict : undefined;
    },
    getPickerOptions() {
      const { options } = this.record;
      return pickerOptions(options, this.$dyform_config.moment)[
        options.format === 'yyyy-MM-dd'
          ? 'date'
          : options.format === 'HH:mm:ss'
          ? 'time'
          : 'datetime'
      ];
    },
    getRemoteLabelInValue() {
      const { remoteLabel = 'label', remoteValue = 'value' } =
        this.record.options;
      const obj = { remoteLabel, remoteValue };
      if (obj.remoteLabel && obj.remoteLabel.includes('$.')) {
        obj.remoteLabel = dynamicFun(obj.remoteLabel, this.record);
        obj.remoteLabel = obj.remoteLabel.length ? obj.remoteLabel : 'label';
      }
      if (obj.remoteValue && obj.remoteValue.includes('$.')) {
        obj.remoteValue = dynamicFun(obj.remoteValue, this.record);
        obj.remoteValue = obj.remoteValue.length ? obj.remoteValue : 'value';
      }
      return obj;
    }
  },
  watch: {
    dicts(val) {
      if (!this.record || !this.record.options) return;
      // 只有数据字典要素才需要
      if (this.record.options.dynamic != 2 || !this.record.options.dictType)
        return;
      //console.log('watch dict' , val)
      if (val) {
        this.initDynamicValue();
      } else {
        this.checkValues = [];
      }
    }
  },
  methods: {
    // 设置数组类默认值
    updateArrayDefaultValue() {
      if (
        this.models &&
        (!Object.prototype.hasOwnProperty.call(
          this.models,
          this.record.model
        ) ||
          // 当前赋值类型不是数组
          !(this.models[this.record.model] instanceof Array))
      ) {
        if (!this.record.options) return;
        const defaultValue = this.record.options.defaultValue;
        if (
          defaultValue != null &&
          defaultValue != undefined &&
          defaultValue instanceof Array
        ) {
          this.$set(this.models, this.record.model, defaultValue);
        } else {
          this.$set(this.models, this.record.model, []);
        }
      } else if (
        this.models &&
        Object.prototype.hasOwnProperty.call(this.models, this.record.model) &&
        // 当前赋值类型不是数组
        !(this.models[this.record.model] instanceof Array)
      ) {
        // 当前数据如果[开头 则json转数组 否则 使用str.split 转数组
        const modelValueStr = this.models[this.record.model];
        if (modelValueStr.indexOf('[') == 0) {
          this.$set(this.models, this.record.model, JSON.parse(modelValueStr));
        } else {
          this.$set(this.models, this.record.model, modelValueStr.split(','));
        }
      }
    },
    // 设置文本类默认值
    updateSimpleDefaultValue() {
      // 判断当前models中是否有值 有值则不需要赋予默认值
      // 必须要包含key但没值
      if (
        this.models &&
        (!Object.prototype.hasOwnProperty.call(
          this.models,
          this.record.model
        ) ||
          this.models[this.record.model] == undefined)
      ) {
        if (!this.record.options) return;

        let defaultValue = this.record.options.defaultValue;
        if (defaultValue != null && defaultValue != undefined) {
          // 日期类型比较特殊 如果是now 则回填当前日期
          if (
            (this.record.type == 'date' ||
              this.record.type == 'time' ||
              this.record.type == 'datePicker') &&
            defaultValue == 'now'
          ) {
            defaultValue = dateFormater(new Date(), this.record.options.format);
          }

          this.$set(this.models, this.record.model, defaultValue);
        } else {
          this.$set(this.models, this.record.model, '');
        }
      }
    },
    handleSelectItem(item) {
      this.$emit('handleSelectItem', item);
    },
    // 判断列表中具体某个值是否应该显示
    dynamicVisible(script, item) {
      const func =
        script.indexOf('return') >= 0
          ? '{' + script + '}'
          : 'return (' + script + ')';
      const Fn = new Function('$', '$item', func);
      return Fn.call(this, this.models, item);
    },
    // 针对select radio checkbox判断如果有本地过滤关联，判断该条数据是否该显示
    itemVisible(item) {
      if (!item) return false;
      // 没有过滤条件 直接全部展示
      if (this.isDragPanel || !this.localFilter || this.localFilter.length == 0)
        return true;

      //挨个过滤判断
      // 本地搜索开始
      for (let i = 0; i < this.localFilter.length; i++) {
        const v = this.dynamicVisible(this.localFilter[i], item);
        // console.log('sitem' , item , v)
        if (!v) {
          return false;
        }
      }
      return true;
    },
    transformAppend(append) {
      if (
        append &&
        (append.indexOf('return') >= 0 || append.indexOf('$') >= 0)
      ) {
        // 创建函数 返回结果
        const script = append;

        // 打开了开关 这里获取函数内容
        const fvalue = dynamicFun(script, this.models, this.topModels);

        return fvalue;
      }
      return append;
    },
    // 初始化远程数据或者数据字典 针对select radio checkbox
    initDynamicValue() {
      if (!this.record || !this.record.options) return;
      if (
        [1, 2].includes(this.record.options.dynamic) &&
        this.record.options.remoteFunc
      ) {
        const url = this.record.options.remoteFunc;

        this.remoteUrl = url;
        // 在配置了远程数据的label和value之后在请求接口
        if (
          // this.record.options.remoteLabel &&
          // this.record.options.remoteValue &&
          !this.record.options.onlineSearch &&
          //判断是否有联动 如果有链接并且还是接口 则此处不处理，等后面处理
          !(
            this.linkageData &&
            this.linkageTypes &&
            this.linkageTypes.includes(2)
          )
        ) {
          this.getRemoteData();
        }

        this.itemProp.label = this.getRemoteLabelInValue.remoteLabel;
        this.itemProp.value = this.getRemoteLabelInValue.remoteValue;
        this.itemProp.children = this.record.options.remoteChildren;
      } else if (
        this.record.options.dynamic == 2 &&
        this.record.options.dictType
      ) {
        //引入数据字典后判断数据字典

        if (
          this.ngConfig &&
          this.ngConfig.dict &&
          this.ngConfig.dict.length > 0
        ) {
          const fsDict = this.ngConfig.dict.filter(
            (t) => t.type == this.record.options.dictType
          );
          this.checkValues = cloneDeep(fsDict);

          this.itemProp.label = 'label';
          this.itemProp.value = 'value';
          this.itemProp.children = 'children';
        }
      }
    },
    remoteMethod(query) {
      if (!this.record || !this.record.options) return;
      let queryParam = this.record.options.onlineParams;
      queryParam = queryParam.replace('$', query);

      let url = this.record.options.remoteFunc;

      if (url.indexOf('?') >= 0) {
        url += '&' + queryParam;
      } else {
        url += '?' + queryParam;
      }

      this.remoteUrl = url;

      this.getRemoteData();
    },
    dealwithRequestPostData(data) {
      if (!data) return;
      const processValue = (value) => {
        // 处理字符串类型的值
        if (typeof value === 'string' && value.startsWith('$.')) {
          return dynamicFun(value, this.record);
        }

        // 处理数组类型的值
        if (Array.isArray(value)) {
          return value.map((item) => processValue(item));
        }

        // 处理对象类型的值
        if (typeof value === 'object' && value !== null) {
          const result = {};
          Object.keys(value).forEach((key) => {
            result[key] = processValue(value[key]);
          });
          return result;
        }

        // 其他类型直接返回
        return value;
      };

      return processValue(data);
    },
    // 获取远程数据
    getRemoteData() {
      if (!this.record || !this.record.options) return;
      this.loading = true;
      const dataPath = this.record.options.dataPath;

      // 如果么有datapath 直接返回
      if (!dataPath) {
        this.checkValues = [];
        return;
      }

      //获取方法类型
      const methodType = this.record.options.methodType || 'get';
      let postData = this.record.options.dynamicPostData;

      const requsetData = {
        url: this.remoteUrl,
        method: methodType,
        params: this.remoteFilter
      };

      if (methodType == 'post' && postData) {
        requsetData.data = JSON.parse(postData);
        requsetData.data = this.dealwithRequestPostData(requsetData.data);
      }

      request(requsetData)
        .then((res) => {
          if (res && res.data) {
            const data = res.data;
            // 获取list 根据dataPath
            const objectPath = require('object-path');
            const rdata = objectPath.get(data, dataPath);

            this.checkValues = this.record.options.merge
              ? [...rdata, ...this.checkValues]
              : rdata;
          }
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          console.error('remote request', e);
        });
    },
    // 获取远程数据
    getRemoteDataByItem(item) {
      if (!item || !item.options) return;
      const dataPath = item.options.dataPath;

      // 如果么有datapath 直接返回
      if (!dataPath) {
        this.checkValues = [];
        return;
      }

      //获取方法类型
      const methodType = item.options.methodType || 'get';
      let postData = item.options.dynamicPostData;

      const requsetData = {
        url: this.remoteUrl,
        method: methodType,
        params: this.remoteFilter
      };

      if (methodType == 'post' && postData) {
        requsetData.data = JSON.parse(postData);
        requsetData.data = this.dealwithRequestPostData(requsetData.data);
      }
      return new Promise((resolve, reject) => {
        request(requsetData)
          .then((res) => {
            if (res && res.data) {
              const data = res.data;
              // 获取list 根据dataPath
              const objectPath = require('object-path');
              const rdata = objectPath.get(data, dataPath);
              resolve(rdata);
            }
          })
          .catch((e) => {
            reject([]);
          });
      });
    },
    handleBlur(e) {
      this.$emit('handleBlur', e);
    },
    handleFocus(e) {
      this.$emit('handleFocus', e);
    }
  }
};
