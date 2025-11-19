// 对外输出 包含组件的对外json定义、属性配置页面、展示页面 三部分

import BaseIndex from './index.vue';
import BaseProperties from './properties.vue';
import { t, $t } from '../../../../locale/index.js';
import { modelRules, labelRules } from '../../common.js';

const obj = {};

obj.type = 'checkbox'; //, // 表单类型
obj.component = BaseIndex;
obj.properties = BaseProperties;

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
      default: $t('dyform.item.checkbox.name'), //'多选框',
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
          label: $t('dyform.item.default_value'), //'默认值',
          prop: 'defaultValue',
          default: '',
          show: false,
          span: 24
        },
        {
          label: $t('dyform.item.placeholder'), //'输入提示',
          prop: 'placeholder',
          default: $t('dyform.item.placeholder_input'), // '请输入'
          span: 24
        },
        {
          label: $t('dyform.item.datasource_static'),
          prop: 'options',
          default: [
            {
              value: '1',
              label: '选项1'
            },
            {
              value: '2',
              label: '选项2'
            }
          ],
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
        },
        {
          label: $t('dyform.item.select_config'), //'数据获取',
          prop: 'dynamic',
          default: 0,
          span: 24,
          type: 'select',
          dicData: [
            { label: $t('dyform.item.datasource_static'), value: 0 },
            { label: $t('dyform.item.datasource_api'), value: 1 },
            { label: $t('dyform.item.datasource_dict'), value: 2 }
          ],
          show: false
        },
        {
          prop: 'labelInValue',
          type: 'checkbox',
          default: false,
          span: 24
        },
        {
          label: $t('dyform.item.datasource_static'), //'静态数据',
          prop: 'options',
          type: 'Kv',
          default: [{ label: '', value: '' }],
          span: 24,
          show: false
        },
        {
          prop: 'modelId',
          show: false,
          span: 24
        },
        {
          prop: 'columnName',
          default: [],
          show: false,
          span: 24
        },
        {
          prop: 'dataSourceType',
          show: false,
          span: 24
        },
        {
          prop: 'dbKey',
          show: false,
          span: 24
        },
        {
          prop: 'schemaPk',
          show: false,
          span: 24
        },
        {
          prop: 'tableName',
          default: [],
          show: false,
          span: 24
        },
        {
          label: $t('dyform.item.method_type'), //'方法类型',
          default: 'post',
          prop: 'methodType',
          show: false
        },
        {
          label: $t('dyform.item.method_type'), //'post请求携带数据',
          prop: 'dynamicPostData',
          default:
            '{"conditions":[],"keyColumnName":"$.options.columnName","modelId":"$.options.modelId","valueColumnName":"$.options.columnName"}',
          show: false
        },
        {
          label: $t('dyform.item.api_path'), //'远程获取数据链接',
          prop: 'remoteFunc',
          default: '/api/dc_easybi/query/keyList',
          show: false
        },
        {
          label: $t('dyform.item.data_path'), //'数据路径',
          prop: 'dataPath',
          default: 'resultContent',
          show: false
        },
        {
          label: $t('dyform.item.filed_value'), //'数据值字段',
          prop: 'remoteValue',
          default: '$.options.columnName',
          show: false
        },
        {
          label: $t('dyform.item.filed_label'), //'数据值字段',
          prop: 'remoteLabel',
          default: '$.options.columnName',
          show: false
        }
      ]
    }
  ]
};

export default obj;
