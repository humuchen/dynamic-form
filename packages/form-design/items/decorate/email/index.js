// 对外输出 包含组件的对外json定义、属性配置页面、展示页面 三部分

import BaseIndex from '../../base/input/index.vue';
import { t, $t } from '../../../../locale/index.js';
import { modelRules, labelRules } from '../../common.js';

const obj = {};

obj.type = 'email'; // 表单类型
obj.component = BaseIndex;
// 序号 实际在json中删除
obj.seq = 7;

// 补充配置样式
obj.options = {
  config: {
    size: 'mini'
  },
  columns: [
    {
      label: $t('dyform.item.label'),
      prop: 'label',
      default: $t('dyform.item.email.name'), //'输入框',
      span: 24,
      rules: labelRules()
    },
    {
      label: $t('dyform.item.label_width'),
      prop: 'labelWidth',
      type: 'number',
      min: -1,
      max: 1000,
      default: -1,
      span: 24,
      show: false
    },
    {
      label: $t('dyform.item.width'),
      prop: 'width',
      default: '100%',
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
      label: $t('dyform.item.key'), //'数据KEY',
      prop: 'key',
      show: false,
      span: 24
    },
    {
      prop: 'rules',
      type: 'rules',
      labelWidth: 0,
      showFormatValidate: true,
      default: [
        {
          required: false, // 必须填写
          message: $t('dyform.item.required'), //"必填项",
          trigger: ['blur']
        },
        {
          vtype: 1,
          pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
          message: '请输入正确的邮箱地址'
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
          prop: 'formatValidate',
          show: false,
          span: 24,
          default: 'COMMON'
        },
        {
          label: $t('dyform.item.max_length'), //'最大长度',
          type: 'number',
          min: 0,
          max: 100,
          prop: 'maxLength',
          default: 100,
          span: 24
        },
        {
          label: $t('dyform.item.default_value'), //'默认值',
          prop: 'defaultValue',
          placeholder: $t('dyform.item.input.placeholder'), //'请输入默认值',
          span: 24
        },
        {
          label: $t('dyform.item.placeholder'), //'输入提示',
          prop: 'placeholder',
          default: $t('dyform.item.placeholder_input'), // '请输入',
          span: 24
        },
        {
          label: $t('dyform.item.clearable'), //'可清除',
          prop: 'clearable',
          type: 'switch',
          default: false,
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
        {
          label: $t('dyform.item.tip_msg'), //'是否只读',
          prop: 'tipMsg',
          type: 'input',
          clearable: true,
          placeholder: $t('dyform.item.placeholder_input'),
          span: 24
        }
      ]
    }
  ]
};

export default obj;
