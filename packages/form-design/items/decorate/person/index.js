// 对外输出 包含组件的对外json定义、属性配置页面、展示页面 三部分

import BaseIndex from '../../base/select/index.vue';
import { t, $t } from '../../../../locale/index.js';
import { modelRules, labelRules } from '../../common.js';

const obj = {};

obj.type = 'person'; //, // 表单类型
obj.component = BaseIndex;

// 序号 实际在json中删除
obj.seq = 4;

// 补充配置样式
obj.options = {
  config: {
    size: 'mini'
  },
  columns: [
    {
      label: $t('dyform.item.label'), //'标签',
      prop: 'label',
      default: $t('dyform.item.person.name'), //'下拉选择器',
      span: 24,
      rules: labelRules()
    },
    {
      label: $t('dyform.item.label_width'), //'标签宽度',
      prop: 'labelWidth',
      type: 'number',
      min: -1,
      max: 1000,
      default: -1,
      span: 24,
      show: false
    },
    {
      label: $t('dyform.item.width'), //'要素宽度',
      prop: 'width',
      default: '100%',
      show: false,
      span: 24
    },
    {
      label: $t('dyform.item.span'), //'所占栅格',
      type: 'spanGroup',
      prop: 'span',
      min: 1,
      max: 24,
      default: 24,
      span: 24,
      show: false
    },
    {
      label: $t('dyform.item.model'), //'数据字段',
      prop: 'model',
      span: 24,
      rules: modelRules()
    },
    {
      label: $t('dyform.item.key'), //'数据KEY',
      prop: 'key',
      show: false,
      span: 24
    },
    {
      prop: 'rules',
      type: 'rules',
      labelWidth: 0,
      default: [
        {
          required: false, // 必须填写
          message: `${t('dyform.item.placeholder_select')}${t(
            'dyform.item.person.name'
          )}`, //"必填项",
          trigger: ['blur', 'change']
        }
      ],
      span: 24
    }
  ],
  group: [
    {
      label: $t('dyform.item.options'), //'属性',
      prop: 'options',
      alone: false, // 是否独立与columns之外展示 false则和columns一起，不另外显示
      collapse: false, // 是否启用 collapse 必须alone=true
      column: [
        {
          label: $t('dyform.item.default_value'), //'默认值',
          type: 'select',
          multiple: true,
          prop: 'defaultValue',
          show: false,
          span: 24
        },
        {
          label: $t('dyform.item.placeholder'), //'输入提示',
          prop: 'placeholder',
          default: $t('dyform.item.placeholder_input'), // '请输入',
          span: 24
        },
        {
          label: $t('dyform.item.multipleSelect.multipleLimit'),
          prop: 'multipleLimit',
          type: 'number',
          span: 24,
          min: 0,
          default: 0
        },
        {
          label: $t('dyform.item.multiple'), //'多选',
          prop: 'multiple',
          type: 'switch',
          default: true,
          show: false,
          span: 24
        },
        {
          label: $t('dyform.item.search'), //'可搜索',
          prop: 'showSearch',
          type: 'switch',
          default: true,
          show: false,
          span: 24
        },
        {
          label: $t('dyform.item.clearable'), //'可清除',
          prop: 'clearable',
          type: 'switch',
          default: true,
          show: false,
          span: 24
        },
        {
          label: $t('dyform.item.if_hidden'), //'是否隐藏',
          prop: 'hidden',
          type: 'switch',
          default: false,
          span: 24
        },
        {
          label: $t('dyform.item.if_disabled'), //'是否禁用',
          prop: 'disabled',
          type: 'switch',
          default: false,
          span: 24
        },
        // dynamic: 0, // 数据获取方式
        //  remoteFunc: '',//远程获取数据链接
        //  dataPath: '',
        //  remoteValue:'' ,
        //  remoteLabel:'',
        //  dictType: '' ,// 数据字典类型
        {
          prop: 'dynamic',
          default: 1,
          span: 24,
          show: false
        },
        {
          label: $t('dyform.item.method_type'), //'方法类型',
          default: 'get',
          prop: 'methodType',
          show: false
        },
        {
          label: $t('dyform.item.api_path'), //'远程获取数据链接',
          prop: 'remoteFunc',
          default: '/api/dc_easybi/open-api/v1/luban-rbac/user',
          show: false
        },
        {
          label: $t('dyform.item.data_path'), //'数据路径',
          prop: 'dataPath',
          default: 'content',
          show: false
        },
        {
          label: $t('dyform.item.filed_value'), //'数据值字段',
          prop: 'remoteValue',
          default: 'userId',
          show: false
        },
        {
          label: $t('dyform.item.filed_label'), //'数据值字段',
          prop: 'remoteLabel',
          default: 'userName',
          show: false
        },
        {
          label: $t('dyform.item.search'),
          prop: 'showSearch',
          type: 'switch',
          default: true,
          show: false,
          span: 24
        },
        {
          label: $t('dyform.item.online_search'),
          prop: 'onlineSearch',
          type: 'switch',
          default: true,
          show: false,
          span: 24
        },
        {
          label: $t('dyform.item.online_search_query'),
          prop: 'onlineSearchQuery',
          show: false,
          default: 'userName',
          span: 24
        },
        {
          label: $t('dyform.item.tip_msg'), //'是否只读',
          prop: 'tipMsg',
          type: 'input',
          clearable: true,
          placeholder: $t('dyform.item.placeholder_input'),
          span: 24
        },
        {
          prop: 'merge',
          default: true,
          show: false,
          span: 24
        }
      ]
    }
  ]
};

export default obj;
