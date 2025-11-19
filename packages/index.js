// 导入组件
// 导入组件，组件必须声明 name
import DyFormDesign from './form-design/index.vue';
import DyFormBuild from './form-design/build.vue';
import DyFormNode from './form-design/panel-container/node.vue';

import DyFormItem from './form-design/items/index.vue';
import DyFormItemNode from './form-design/items/node.vue';

import DyForm from './dy-form/index.vue';
import locale from './locale';

import * as utils from './utils/index.js';

import mixin from './form-design/items/mixin.js';
import LocalMixin from './locale/mixin.js';

import { addCustomConfig } from './constants.js';

DyForm.install = function (Vue) {
  Vue.component(DyForm.name, DyForm);
};

// 为组件提供 install 安装方法，供按需引入
DyFormDesign.install = function (Vue) {
  Vue.component(DyFormDesign.name, DyFormDesign);
};
// 为组件提供 install 安装方法，供按需引入
DyFormBuild.install = function (Vue) {
  Vue.component(DyFormBuild.name, DyFormBuild);
};

DyFormNode.install = function (Vue) {
  Vue.component(DyFormNode.name, DyFormNode);
};

DyFormItem.install = function (Vue) {
  Vue.component(DyFormItem.name, DyFormItem);
};

DyFormItemNode.install = function (Vue) {
  Vue.component(DyFormItemNode.name, DyFormItemNode);
};

// 默认导出组件
const components = [
  DyForm,
  DyFormDesign,
  DyFormBuild,
  DyFormItem,
  DyFormNode,
  DyFormItemNode /*,DyFormItemBase*/
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  // 判断是否注入了自定义组件
  // 后续自定义组件由安装时配置，不再组件中直接引用

  if (opts.components) {
    Vue.prototype.$dyform_components = opts.components;
  }

  //判断是否注入了全局config
  if (opts.httpConfig) {
    Vue.prototype.$dyform_httpConfig = opts.httpConfig;
  }

  // 判断是否注入了全局数据字典
  if (opts.dict) {
    Vue.prototype.$dyform_dict = opts.dict;
  }

  if (opts.uploadConfig) {
    Vue.prototype.$dyform_uploadConfig = opts.uploadConfig;
  }

  Vue.prototype.$dyform_config = opts;

  const bus = new Vue();

  Vue.prototype.$dyform_bus = bus;

  // 判断是否安装
  if (install.installed) return;

  // 遍历注册全局组件
  components.map((component) => Vue.component(component.name, component));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  addCustomConfig,
  utils,
  mixin,
  LocalMixin,
  locale,
  DyForm,
  DyFormDesign,
  DyFormBuild,
  DyFormItem,
  DyFormNode,
  DyFormItemNode
};

export default {
  version: '0.0.1',
  // locale: locale.use,
  // i18n: locale.i18n,
  install
};
