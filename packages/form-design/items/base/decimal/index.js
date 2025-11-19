// 对外输出 包含组件的对外json定义、属性配置页面、展示页面 三部分

import BaseIndex from '../number/index.vue';
import { modelRules, labelRules } from '../../common.js';
import { t, $t } from '../../../../locale/index.js';

const obj = {};

obj.type = 'decimal'; //, // 表单类型
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
      label: $t('dyform.item.label'),
      prop: 'label',
      default: $t('dyform.item.decimal.name'), //'数字输入框',
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
      show: false,
      prop: 'width',
      default: '100%',
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
          label: $t('dyform.item.number.precision'), //'精度',
          prop: 'precision',
          type: 'number',
          precision: 0,
          step: 1,
          default: 0,
          span: 24,
          show: false
        },
        {
          label: $t('dyform.item.number.step'), //'步长',
          prop: 'step',
          type: 'number',
          default: 1,
          span: 24,
          show: false
        },
        {
          label: $t('dyform.item.number.min'), //'最小值',
          prop: 'min',
          type: 'number',
          default: 0,
          span: 24
        },
        {
          label: $t('dyform.item.number.max'), //'最大值',
          prop: 'max',
          type: 'number',
          default: 1000,
          span: 24
        },
        {
          label: $t('dyform.item.default_value'), //'默认值',
          prop: 'defaultValue',
          type: 'number',
          span: 24
        },
        {
          label: $t('dyform.item.decimal.precision'), //'默认值',
          prop: 'precision',
          type: 'select',
          clearable: false,
          default: 1,
          dicData: [
            {
              label: 1,
              value: 1
            },
            {
              label: 2,
              value: 2
            },
            {
              label: 3,
              value: 3
            }
          ],
          span: 24
        },
        {
          label: $t('dyform.item.number.append'), //'后缀',
          prop: 'append',
          span: 24,
          show: false
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
