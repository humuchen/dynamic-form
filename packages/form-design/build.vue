<template>
  <div class="form-build-panel">
    <el-form
      v-if="formTemplate && formTemplate.config && formTemplate.list"
      :label-width="formTemplate.config.labelWidth + 'px'"
      class="dy-form-build"
      :label-position="formTemplate.config.labelPosition"
      :hide-required-asterisk="formTemplate.config.hideRequiredMark"
      :label-suffix="formTemplate.config.labelSuffix"
      ref="form"
      :style="formTemplate.config.customStyle"
      :size="formTemplate.config.size"
      :model="models"
      :disabled="disabled"
      :id="randomId"
    >
      <el-row :gutter="20" class="row">
        <Node
          v-for="record in formTemplate.list"
          :key="record.key"
          :record="record"
          :models="models"
          :disabled="disabled"
          :preview="preview"
          :isDrag="false"
          :cascade="formTemplate.cascade"
        >
          <!-- 递归传递插槽！！！ -->
          <template v-for="slot in Object.keys($slots)" :slot="slot">
            <slot :name="slot" :record="record" />
          </template>
        </Node>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Node from './panel-container/node.vue';
import cloneDeep from 'lodash/cloneDeep';
import { use } from '../locale/index';
import { getUUID } from '../utils/index';
export default {
  name: 'dy-form-build',
  components: {
    Node
  },
  data() {
    return {
      randomId: new Date().getTime() + '111',
      models: this.formData
    };
  },
  props: {
    formTemplate: {
      type: Object,
      required: true
    },
    // 外部属性配置
    config: {
      type: Object
    },
    formData: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    // 是否查看模式
    preview: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    customComponents: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    cascadeControlList() {
      return this.formTemplate.list.filter((item) =>
        ['select', 'multipleSelect', 'radio', 'checkbox'].includes(item.type)
      );
    },
    templateConfig() {
      if (this.formTemplate && this.formTemplate.config)
        return this.formTemplate.config;
      return {};
    },
    // 配置中的http配置
    httpConfig() {
      //判断是否注入了全局config
      // 优先判断内部
      if (this.config && this.config.httpConfig) {
        return this.config.httpConfig;
      } else if (this.$dyform_httpConfig) {
        return this.$dyform_httpConfig;
      }
      return null;
    },
    ngConfig() {
      const ngofrm_config = this.$dyform_config || {};

      // 优先判断内部
      if (this.config) {
        return {
          ...this.config,
          ...ngofrm_config,
          list: () => this.cascadeControlList
        };
      }
      return { ...ngofrm_config, list: () => this.cascadeControlList };
    },
    // 自定义组件
    components() {
      if (this.$dyform_components && this.$dyform_components.length > 0) {
        return this.$dyform_components;
      } else if (this.customComponents && this.customComponents.length > 0) {
        return this.customComponents;
      }

      return undefined;
    },
    // 最顶层的models
    topModelsC() {
      return this.models;
    }
  },
  watch: {
    httpConfig: {
      handler(newVal) {
        window.nghttpConfig = newVal;
      },
      deep: true,
      immediate: false
    },
    formData: {
      handler(newVal) {
        this.models = cloneDeep(newVal);
      },
      deep: true
    }
  },
  provide: function () {
    const this_ = this;
    return {
      customC: this.components,
      configC: () => this.templateConfig,
      //dictsC: this.dicts,
      httpConfigC: this.httpConfig,
      ngConfig: this.ngConfig,
      topModelsC: () => this.topModelsC
    };
  },
  created() {
    if (this.httpConfig) {
      window.nghttpConfig = this.httpConfig;
    }
  },
  mounted() {
    // console.log('0 $slots' , this.$slots)
    this.$dyform_bus.$on('reset', () => {
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    });
  },
  methods: {
    reset() {
      this.$refs.form && this.$refs.form.resetFields();
    },
    useLocale(val) {
      use(val);
      this.key = getUUID();

      this.$dyform_bus.$emit('i18nRefresh');
    },
    validate() {
      return new Promise((resolve, reject) => {
        if (this.$refs.form) {
          this.$refs.form.validate((valid, values) => {
            resolve(valid, values);
          });
        } else {
          reject();
        }
      });
    },
    getData(async = true) {
      const data = cloneDeep(this.models);

      this.clearHiddenValue(data);
      if (!async) {
        return new Promise((resolve, reject) => {
          this.$refs.form &&
            this.$refs.form.validate((valid, values) => {
              if (!valid) {
                reject('验证失败');
              }

              resolve(data);
            });
        });
      }

      return data;
    },
    //清理没有显示的组件的数据
    clearHiddenValue(data) {
      // 根据组件ID 是否隐藏为准
      // 根据 formTemplate.config.outputHidden 来判断是否要输出隐藏
      if (!this.formTemplate.config || !this.formTemplate.config.outputHidden) {
        const formdesign = document.getElementById(this.randomId);

        // 循环当前数据 非P 开头的统一不深入第二层
        for (let key in data) {
          if (key.indexOf('_label') > 0) continue;
          //  判断key的id是否还在
          // 目前采用隐藏的手段，修改之前判断在不在的方法为判断是否隐藏
          const key_div = formdesign.querySelector('#' + key);
          // 判断是否隐藏
          //console.log('key_div' , key_div)
          if (!key_div || (key_div.style && key_div.style.display == 'none')) {
            // 删除
            delete data[key];
            delete data[key + '_label'];
          }
        }
      }
    }
  }
};
</script>
<style>
.form-build-panel {
  /* height: 100%; */
  text-align: left;
}

.form-build-panel .row {
  height: 100%;
  overflow: auto;
}

.dy-form-build .row {
  display: flex;
  flex-wrap: wrap;
}

.form-build-panel .dy-form-build {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
