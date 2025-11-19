// 对外输出 包含组件的对外json定义、属性配置页面、展示页面 三部分

import BaseIndex from './index.vue';
import { t, $t } from '../../../../../locale/index.js';
import { modelRules, labelRules } from '../../../common.js';

const obj = {};

obj.type = 'uploadImg'; //, // 表单类型
obj.component = BaseIndex;

// 序号 实际在json中删除
obj.seq = 2;

// 不需要事件和监听
obj.event_ = false;
obj.listen_ = false;

// 补充配置样式
obj.options = {
  config: {
    size: 'mini',
    labelWidth: 80
  },
  columns: [
    {
      label: $t('dyform.item.label'), //'标签',
      prop: 'label',
      default: $t('dyform.item.upload.img_name'), //'上传图片',
      rules: labelRules(),
      span: 24
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
          label: $t('dyform.item.upload.upload_url'), //'上传地址',
          prop: 'action',
          type: 'textarea',
          span: 24,
          show: false
        },
        {
          label: $t('dyform.item.upload.file_url_path'), //'epl地址',
          prop: 'responseFileUrl',
          type: 'textarea',
          placeholder: $t('dyform.item.upload.file_url_path_placeholder'), //'上传成功后解析文件url的epl地址',
          show: false,
          span: 24
        },
        {
          label: $t('dyform.item.upload.style'), //'样式',
          prop: 'listType',
          type: 'radioButton',
          default: 'text',
          show: false,
          dicData: [
            { label: $t('dyform.item.upload.btn'), value: 'text' },
            { label: $t('dyform.item.upload.card'), value: 'picture-card' }
          ],
          span: 24
        },
        {
          label: $t('dyform.item.upload.limit_size'), //'文件大小',
          prop: 'limitSize',
          type: 'number',
          default: 10,
          min: 0,
          max: 50,
          suffix: 'Mb',
          placeholder: $t('dyform.item.upload.limit_size'), //"文件大小(Mb)",
          span: 24
        },
        {
          label: $t('dyform.item.upload.accept'),
          prop: 'accept',
          type: 'select',
          multiple: true,
          collapseTags: true,
          dicData: [
            {
              label: 'xls',
              value: '.xls'
            },
            {
              label: 'xlsx',
              value: '.xlsx'
            },
            {
              label: 'doc',
              value: '.doc'
            },
            {
              label: 'pdf',
              value: '.pdf'
            },
            {
              label: 'png',
              value: '.png'
            },
            {
              label: 'jpg',
              value: '.jpg'
            },
            {
              label: 'jpeg',
              value: '.jpeg'
            },
            {
              label: 'gif',
              value: '.gif'
            },
            {
              label: 'svg',
              value: '.svg'
            }
          ]
        },
        {
          label: $t('dyform.item.default_value'), //'默认值',
          prop: 'defaultValue',
          show: false,
          default: [],
          span: 24
        },
        {
          label: $t('dyform.item.upload.multiple'), //'多选',
          prop: 'multiple',
          type: 'switch',
          default: false,
          span: 24,
          show: false
        },
        {
          label: $t('dyform.item.upload.limit'), //'最大上传数量',
          prop: 'limit',
          type: 'number',
          default: 1,
          show: '$.options.multiple',
          placeholder: $t('dyform.item.upload.limit'), //'最大上传数量',
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
          span: 24,
          show: false
        },
        {
          label: $t('dyform.item.upload.upload_hidden'), //'上传后隐藏',
          prop: 'uploadHidden',
          type: 'switch',
          default: false,
          span: 24,
          show: false
        },
        {
          label: $t('dyform.item.upload.header'), //'携带头信息',
          prop: 'headers',
          type: 'kv',
          default: [],
          span: 24,
          show: false
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
