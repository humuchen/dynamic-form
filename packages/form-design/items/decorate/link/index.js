// 对外输出 包含组件的对外json定义、属性配置页面、展示页面 三部分

import BaseIndex from './index.vue';
import { t, $t } from '../../../../locale/index.js';
import { modelRules, labelRules } from '../../common.js';

const obj = {};

obj.type = 'link'; //, // 表单类型
obj.component = BaseIndex;
// 序号 实际在json中删除
obj.seq = 5;

// 补充配置样式
obj.options = {
  config: {
    size: 'mini'
  },
  columns: [
    {
      label: $t('dyform.item.label'),
      prop: 'label',
      type: 'input',
      default: $t('dyform.item.link.name'), //'输入框',
      rules: labelRules(),
      span: 24
    },
    {
      label: $t('dyform.item.model'), //'数据字段',
      prop: 'model',
      span: 24,
      rules: modelRules()
    },
    {
      label: $t('dyform.item.width'), //'要素宽度',
      prop: 'width',
      default: '100%',
      span: 24,
      show: false
    },
    {
      label: $t('dyform.item.label_width'), //'标签宽度',
      prop: 'labelWidth',
      type: 'number',
      min: -1,
      show: false,
      max: 1000,
      default: 0,
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
          label: $t('dyform.item.link.href'), // 跳转链接
          prop: 'href',
          type: 'textarea',
          span: 24
        },
        {
          label: $t('dyform.item.link.type'), // 类型
          prop: 'type',
          default: 'default',
          type: 'select',
          dicData: [
            { value: 'default', label: $t('dyform.item.link.default') },
            { value: 'primary', label: $t('dyform.item.link.primary') },
            { value: 'success', label: $t('dyform.item.link.success') },
            { value: 'warning', label: $t('dyform.item.link.warning') },
            { value: 'danger', label: $t('dyform.item.link.danger') },
            { value: 'info', label: $t('dyform.item.link.info') }
          ],
          span: 24
        },
        // {
        //   label: $t('dyform.item.link.icon') ,//'是否隐藏',
        //   prop: 'icon',
        //   type: 'switch',
        //   default: true,
        //   span: 24,
        // },
        {
          label: $t('dyform.item.link.underline'), //'是否隐藏',
          prop: 'underline',
          type: 'switch',
          default: true,
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
