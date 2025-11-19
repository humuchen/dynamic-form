// 对外输出 包含组件的对外json定义、属性配置页面、展示页面 三部分

import BaseIndex from './index.vue';
import { t, $t } from '../../../../locale/index.js';
import { modelRules, labelRules } from '../../common.js';

const obj = {};

obj.type = 'slider'; //, // 表单类型
obj.component = BaseIndex;
// 序号 实际在json中删除
obj.seq = 10;

// 补充配置样式
obj.options = {
  config: {
    size: 'mini'
  },
  columns: [
    {
      label: $t('dyform.item.label'), //'标签',
      prop: 'label',
      default: $t('dyform.item.slider.name'), //'滑动输入条',
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
          label: $t('dyform.item.slider.min'), //'最小值',
          prop: 'min',
          type: 'number',
          min: 0,
          default: 0,
          span: 24
        },
        {
          label: $t('dyform.item.slider.max'), //'最大值',
          prop: 'max',
          type: 'number',
          min: 1,
          default: 5,
          span: 24
        },
        {
          label: $t('dyform.item.slider.step'), //'步长',
          prop: 'step',
          type: 'number',
          min: 1,
          default: 0,
          span: 24
        },
        {
          label: $t('dyform.item.default_value'), //'默认值',
          prop: 'defaultValue',
          type: 'number',
          default: 0,
          min: 0,
          span: 24
        },

        {
          label: $t('dyform.item.slider.show_input'), //'输入框',
          prop: 'showInput',
          type: 'switch',
          default: false,
          span: 24,
          show: false
        },
        {
          label: $t('dyform.item.slider.marks'), //'标记',
          prop: 'marks',
          type: 'kv',
          default: [],
          span: 24,
          show: false
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
