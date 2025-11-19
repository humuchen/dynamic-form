// 对外输出 包含组件的对外json定义、属性配置页面、展示页面 三部分

import BaseIndex from './index.vue';
import { t, $t } from '../../../../locale/index.js';
import { modelRules, labelRules } from '../../common.js';

const obj = {};

obj.type = 'datePicker'; //, // 表单类型
obj.component = BaseIndex;

// 序号 实际在json中删除
obj.seq = 8;

// 补充配置样式
obj.options = {
  config: {
    size: 'mini'
  },
  columns: [
    {
      label: $t('dyform.item.label'),
      prop: 'label',
      default: $t('dyform.item.datePicker.name'), //'多选框',
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
          label: $t('dyform.item.date.date_format'), //'日期格式',
          prop: 'format',
          type: 'select',
          dicData: [
            {
              label: `${t('dyform.item.date.year')}-${t(
                'dyform.item.date.month'
              )}-${t('dyform.item.date.day')}`,
              value: 'yyyy-MM-dd'
            },
            {
              label: `${t('dyform.item.date.year')}-${t(
                'dyform.item.date.month'
              )}-${t('dyform.item.date.day')} ${t('dyform.item.date.hour')}:${t(
                'dyform.item.date.minute'
              )}:${t('dyform.item.date.second')}`,
              value: 'yyyy-MM-dd HH:mm:ss'
            }
          ],
          default: 'yyyy-MM-dd',
          span: 24
        },
        {
          label: $t('dyform.item.date.select_limit'),
          prop: 'limit',
          type: 'select',
          clearable: false,
          dicData: [
            {
              label: $t('dyform.item.date.system_time_before'),
              value: 'systemTimeBefore'
            },
            {
              label: $t('dyform.item.date.system_time_after'),
              value: 'systemTimeAfter'
            },
            {
              label: $t('dyform.item.date.step_range'),
              value: 'stepRange'
            }
          ],
          default: 'systemTimeBefore',
          span: 24
        },
        {
          label: $t('dyform.item.date.step_range_before'),
          prop: 'stepRangeBefore',
          type: 'number',
          min: 0,
          default: 0,
          suffix: t('dyform.item.date.suffix'),
          show: '$.options.limit==="stepRange"',
          span: 24
        },
        {
          label: $t('dyform.item.date.step_range_after'),
          prop: 'stepRangeAfter',
          type: 'number',
          min: 0,
          default: 0,
          suffix: t('dyform.item.date.suffix'),
          show: '$.options.limit==="stepRange"',
          span: 24
        },
        {
          label: $t('dyform.item.default_value'), //'默认值',
          prop: 'defaultValue',
          type: 'date',
          placeholder: $t('dyform.item.date.placeholder'),
          span: 24
        },
        {
          label: $t('dyform.item.placeholder'), //'输入提示',
          prop: 'placeholder',
          default: $t('dyform.item.placeholder_input'), // '请输入',
          placeholder: $t('dyform.item.placeholder_input'), // '请输入',
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
          label: $t('dyform.item.editable'), //'可编辑',
          prop: 'editable',
          type: 'switch',
          default: true,
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
