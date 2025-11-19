// 对外输出 包含组件的对外json定义、属性配置页面、展示页面 三部分

import BaseIndex from './index.vue';
import { t, $t } from '../../../../locale/index.js';
import { modelRules, labelRules } from '../../common.js';

const obj = {};

obj.type = 'textarea'; //, // 表单类型
obj.component = BaseIndex;
// 序号 实际在json中删除
obj.seq = 2;

// 补充配置样式
obj.options = {
  config: {
    size: 'mini'
  },
  columns: [
    {
      label: $t('dyform.item.label'), //'标签', '标签',
      prop: 'label',
      default: $t('dyform.item.textarea.name'), //'文本框',
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
      span: 24,
      show: false
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
      type: 'divider',
      label: $t('dyform.item.validate_rule'), //'效验规则'
      show: false
    },
    {
      prop: 'rules',
      type: 'rules',
      labelWidth: 0,
      default: [
        {
          required: false, // 必须填写
          message: $t('dyform.item.required'), //"必填项",
          trigger: ['blur']
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
          prop: 'defaultValue',
          span: 24
        },
        {
          label: $t('dyform.item.textarea.rows'), //'输入框行数',
          prop: 'rows',
          type: 'number',
          default: 4,
          min: 1,
          span: 24
        },

        {
          label: $t('dyform.item.placeholder'), //'输入提示',
          prop: 'placeholder',
          default: $t('dyform.item.placeholder_input'), // '请输入',
          span: 24
        },
        {
          label: $t('dyform.item.max_length'), //'最大长度',
          type: 'number',
          min: -1,
          max: 10000000,
          prop: 'maxLength',
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
          label: $t('dyform.item.textarea.autosize'), //'自动高度',
          prop: 'autosize',
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
