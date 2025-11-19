<template>
  <el-container class="form-design">
    <el-header class="header" height="50px">
      <HeaderPanel
        :clear="clear"
        :preview="preview"
        :imp="imp"
        :exp="exp"
        :formTemplate="formTemplate"
        :undo="undo"
        :is-undo="undoStack && undoStack.length > 1"
        :is-redo="redoStack && redoStack.length > 0"
        @importData="importData"
        @undo="handleUndo"
        @redo="handleRedo"
        @save="handleSave"
        @preview="handlePreview"
      >
        <template slot="controlButton">
          <slot name="controlButton" :isPreview="isPreview"></slot>
        </template>
        <template slot="controlAfterButton">
          <slot name="controlAfterButton" :isPreview="isPreview"></slot>
        </template>
        <template slot="formName">
          <slot name="formName" :isPreview="isPreview"></slot>
        </template>
        <template slot="logo">
          <slot name="logo" :isPreview="isPreview"></slot>
        </template>
      </HeaderPanel>
    </el-header>
    <el-main class="form-main">
      <el-container class="dy-main-container">
        <el-aside :width="showLeft ? '0px' : '148px'" class="item-panel">
          <slot name="drag"></slot>
          <DragPanel
            :basic-item="basicItem"
            :decorate-item="decorateItem"
            :layout-item="layoutItem"
            :application-item="applicationItem"
          />
        </el-aside>
        <el-main class="center-panel form-main">
          <ContainerPanel
            v-if="!isPreview"
            :formTemplate="formTemplate"
            :selectItem="selectItem"
            :arrow="arrow"
            @handleSelectItem="handleSelectItem"
          />

          <FormBuild
            v-else
            :formTemplate="formTemplate"
            :config="ngConfig"
            :customComponents="components"
          />
        </el-main>
        <el-aside
          v-show="formTemplate && formTemplate.list.length"
          :width="arrow || isPreview ? '0px' : '400px'"
          class="properties-panel"
        >
          <i class="el-icon-close" @click="arrow = !arrow" />

          <PropertiesPanel
            ref="propPanelRef"
            :selectItem="selectItem"
            :formConfig="formTemplate.config"
          >
            <template slot="custom-properties">
              <slot name="custom-properties" :selectItem="selectItem"></slot>
            </template>
            <template slot="form-extend-properties">
              <slot name="form-extend-properties" :data="formTemplate"></slot>
            </template>
            <template slot="extend-tab">
              <slot name="extend-tab" :data="formTemplate"></slot>
            </template>
          </PropertiesPanel>
        </el-aside>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import HeaderPanel from './panel-header/index.vue';
import DragPanel from './panel-drag/index.vue';
import ContainerPanel from './panel-container/index.vue';
import PropertiesPanel from './panel-properties/index.vue';
import { use } from '../locale/index';
import { getUUID } from '../utils/index';
import cloneDeep from 'lodash/cloneDeep';
import LocalMixin from '../locale/mixin.js';
import FormBuild from './build.vue';
import { Message } from 'element-ui';
import { t } from '../locale/index';

function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
class Command {
  constructor(execute, undo) {
    this.execute = execute;
    this.undo = undo;
  }
}
class UndoCommand extends Command {
  constructor(context) {
    super(
      () => {
        if (context.undoStack.length > 1) {
          let laststate = context.undoStack[context.undoStack.length - 2];
          context.formTemplate = cloneDeep(laststate);
          let redostate = context.undoStack.pop();
          context.redoStack.push(redostate);
        } else {
          //       noUndo: '暂无可撤回内容',
          // noRedo: '无法重做'
          // alert("撤回栈已空，无法撤回");
          context.$message.error('撤回栈已空，无法撤回');
        }
        setTimeout(() => {
          context.ischange = false;
        }, 400);
      },
      () => {
        if (context.redoStack.length > 0) {
          context.formTemplate = context.redoStack.pop();
        } else {
          //alert("无法重做");
          context.$message.error('无法重做');
        }
      }
    );
  }
}

class RedoCommand extends Command {
  constructor(context) {
    super(
      () => {
        if (context.redoStack.length > 0) {
          context.formTemplate = context.redoStack.pop();
        } else {
          //alert("无法重做");
          context.$message.error('无法重做');
        }
      },
      () => {
        // 这里可以实现撤销 redo 的逻辑，但我们暂时不需要
      }
    );
  }
}

export default {
  mixins: [LocalMixin],
  name: 'dy-form-design',
  components: {
    HeaderPanel,
    DragPanel,
    ContainerPanel,
    PropertiesPanel,
    FormBuild
  },
  data() {
    return {
      selectItem: {},
      arrow: true,
      i18nkey: getUUID(),
      formTemplate: this.template || {
        list: [],
        config: {
          labelPosition: 'left',
          labelWidth: 100,
          size: 'mini',
          outputHidden: true, //  是否输出隐藏字段的值 默认打开,所有字段都输出
          hideRequiredMark: false,
          syncLabelRequired: false,
          labelSuffix: '', // 标签后缀
          customStyle: '',
          isSaved: false
        },
        cascade: []
      },
      undoStack: [],
      redoStack: [],
      ischange: false,
      isPreview: false,
      maxUndoStackSize: 15,
      maxRedoStackSize: 5
    };
  },
  props: {
    template: {
      type: Object,
      default: () => {
        return {
          list: [],
          cascade: [],
          config: {
            labelPosition: 'top',
            labelWidth: 80,
            size: 'mini',
            outputHidden: true, //  是否输出隐藏字段的值 默认打开,所有字段都输出
            hideRequiredMark: false,
            syncLabelRequired: false,
            labelSuffix: '', // 标签后缀
            customStyle: '',
            isSaved: false
          }
        };
      }
    },
    customComponents: {
      type: Array,
      default: () => []
    },
    // 是否开启undo redo
    undo: {
      type: Boolean,
      default: false
    },
    // 按钮显示隐藏
    clear: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: true
    },
    imp: {
      type: Boolean,
      default: false
    },
    exp: {
      type: Boolean,
      default: false
    },
    // 外部属性配置
    config: {
      type: Object
    },
    //基础组件是否要展示或待选组件列表集合
    basicItem: {
      type: [Array, Boolean],
      default: true
    },
    //装饰组件是否要展示或待选组件列表集合
    decorateItem: {
      type: [Array, Boolean],
      default: true
    },
    //布局组件是否要展示或待选组件列表集合
    layoutItem: {
      type: [Array, Boolean],
      default: true
    },
    //应用组件是否要展示或待选组件列表集合
    applicationItem: {
      type: [Array, Boolean],
      default: true
    },
    title: {
      type: String,
      default: '未命名'
    }
  },
  computed: {
    cascadeControlList() {
      return this.formTemplate.list.filter((item) =>
        ['select', 'multipleSelect', 'radio', 'checkbox'].includes(item.type)
      );
    },
    templateConfig() {
      if (this.formTemplate) return this.formTemplate.config;
      return {};
    },
    // 配置中的http配置
    httpConfig() {
      //判断是否注入了全局config
      // 优先判断内部
      if (this.config && this.config.httpConfig) {
        return this.config.httpConfig;
      } else if (this.$dyform_httpConfig) {
        return this.$dyform_httpConfig;
      }
      return null;
    },
    ngConfig() {
      const ngofrm_config = this.$dyform_config || {};
      // 优先判断内部
      if (this.config) {
        return {
          ...this.config,
          ...ngofrm_config,
          list: () => this.cascadeControlList
        };
      }
      return { ...ngofrm_config, list: () => this.cascadeControlList };
    },
    // 自定义组件
    components() {
      if (this.$dyform_components && this.$dyform_components.length > 0) {
        return this.$dyform_components;
      } else if (this.customComponents && this.customComponents.length > 0) {
        return this.customComponents;
      }

      return undefined;
    },
    isSelect() {
      return (
        this.selectItem &&
        ['select', 'multipleSelect', 'radio', 'checkbox'].includes(
          this.selectItem.type
        )
      );
    },
    showLeft() {
      return this.isPreview;
    }
  },
  watch: {
    httpConfig: {
      handler(newVal) {
        window.nghttpConfig = newVal;
      },
      deep: true,
      immediate: false
    },
    formTemplate: {
      handler: debounce(function (oldVal, newVal) {
        this.$emit('update:template', newVal);

        if (this.undo) {
          if (!this.ischange) {
            this.undoStack.push(cloneDeep(oldVal));
            if (this.undoStack.length > this.maxUndoStackSize) {
              this.undoStack.shift();
            }
            if (!this.first) this.first = true;
          } else {
            // 刷新面板 看看能不能找到 selectItem.key 的组件 进行重置
            this.refreshselectItem();
          }
        }
      }, 300),
      deep: true,
      immediate: true
    },
    'selectItem.label': {
      handler(newVal, oldVal) {
        if (!this.isSelect) return;
        const { options } = this.selectItem.options;
        if (options[0].label !== newVal) {
          this.$set(this.selectItem.options.options, 0, {
            label: newVal,
            value: `${newVal}标识`,
            disabled: true
          });
        }
      }
    },
    'selectItem.model': {
      handler(newVal, oldVal) {
        if (!this.isSelect) return;
        const { options } = this.selectItem.options;
        if (options[1].label !== newVal) {
          this.$set(this.selectItem.options.options, 1, {
            label: newVal,
            value: `${newVal}_id`,
            disabled: true
          });
        }
      }
    }
  },
  provide() {
    return {
      customC: this.components,
      configC: () => this.templateConfig,
      httpConfigC: this.httpConfig,
      ngConfig: this.ngConfig
    };
  },
  created() {
    if (this.formTemplate == null) {
      this.formTemplate = {
        list: [],
        config: {
          labelPosition: 'left',
          labelWidth: 100,
          size: 'mini',
          outputHidden: true, //  是否输出隐藏字段的值 默认打开,所有字段都输出
          hideRequiredMark: false,
          syncLabelRequired: false,
          customStyle: ''
        }
      };
    }

    if (this.httpConfig) {
      window.nghttpConfig = this.httpConfig;
    }
  },
  methods: {
    refreshselectItem() {
      if (!this.selectItem || !this.selectItem.key) return;

      const key_ = this.selectItem.key;

      const this_ = this;
      let selectItem_tmp = null;
      const fs_ = (v) => {
        if (v instanceof Array) {
          v.forEach((vc) => fs_(vc));
        } else if (v.key == key_) {
          selectItem_tmp = v;
          return;
        } else {
          // 遍历迭代
          const keys_ = Object.keys(v);
          for (const k in keys_) {
            const vk = v[k];

            if (vk instanceof Array) {
              vk.forEach((k_) => fs_(k_));
            }
          }
        }
      };

      fs_(this.formTemplate.list);

      if (selectItem_tmp) {
        this.selectItem = selectItem_tmp;
      } else {
        this.selectItem = null;
      }
    },
    //撤销重做
    handleUndo() {
      this.ischange = true;
      const undoCommand = new UndoCommand(this);
      undoCommand.execute();
    },
    handleRedo() {
      const redoCommand = new RedoCommand(this);
      redoCommand.execute();
    },
    setOptions(item) {
      const { options, label, model } = item;
      if (options.some((o) => o.label === label || o.label === model)) {
        return;
      }
      this.$set(this.selectItem.options, 'options', [
        { label, value: `${label}标识`, disabled: true },
        { label: model, value: `${model}_id`, disabled: true },
        ...options
      ]);
    },
    handleSelectItem(record) {
      this.$refs.propPanelRef.$refs.itemPropRef
        .noEmitSave()
        .then((res) => {
          this.arrow = false;
          this.selectItem = record || {};
          if (!this.isSelect) return;

          const { options, label, model } = record;
          this.setOptions({ options: options.options, label, model });
        })
        .catch((err) => {
          if (!err) {
            Message.warning(t('dyform.item.validate_msg'));
            this.arrow = false;
            return;
          }
        });
    },

    useLocale(val) {
      use(val);
      this.i18nkey = getUUID();

      this.$dyform_bus.$emit('i18nRefresh');
    },
    // 返回编辑好的模板
    getModel() {
      return new Promise((resolve, reject) => {
        this.$refs.propPanelRef.$refs.itemPropRef
          .noEmitSave()
          .then((res) => {
            this.selectItem = {};

            resolve(cloneDeep(this.formTemplate));
          })
          .catch((err) => {
            if (!err) {
              this.arrow = false;
              Message.warning(t('dyform.item.validate_msg'));
              reject(false);
            }
          });
      });
    },
    // 初始化模板
    initModel(formTemplate) {
      //init的时候初始化恢复和重做
      const modelData = cloneDeep(formTemplate);

      this.importData(modelData);

      this.undoStack = [];
      this.redoStack = [];
    },
    // 从模板处导入json表单模板
    importData(formTemplate = {}) {
      this.formTemplate.cascade = formTemplate.cascade || [];
      this.formTemplate.list = formTemplate.list;
      for (let k in formTemplate.config) {
        this.template.config[k] = formTemplate.config[k];
      }
    },
    setTemplateConfig(vals) {
      this.$set(this.formTemplate, 'cascade', vals);
    },
    handleSave() {
      this.$refs.propPanelRef.$refs.itemPropRef
        .noEmitSave()
        .then((res) => {
          this.selectItem = {};
          this.arrow = true;
          this.$emit('save', this.formTemplate);
        })
        .catch((err) => {
          if (!err) {
            this.arrow = false;
            Message.warning(t('dyform.item.validate_msg'));
            this.$emit('save', undefined);
          }
        });
    },
    handlePreview(val) {
      this.isPreview = val;
    },
    handleBack() {
      this.$emit('back');
    }
  }
};
</script>
<style>
.form-design {
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  text-align: left;
}

.form-design .header {
  /* box-shadow: 1px 0px 6px 3px rgba(48, 65, 86, 0.35); */
  background: #15437d;
  color: #fff;
  padding-left: 0px;
  z-index: 100;
}

.form-design .form-main {
  padding: 0px;
  height: 100%;
  min-height: 500px;
}

.form-design .form-main .dy-main-container {
  height: 100%;
  min-height: 500px;
  background: #f2f4f9;
}

.form-design .item-panel {
  height: 100%;
  overflow-y: hidden;
  background: white;
}

.form-design .center-panel {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.form-design .center-panel .form-build-panel {
  height: 100%;
}

.form-design .properties-panel {
  height: 100%;
  /* box-shadow: -3px 0 6px rgb(48 65 86 / 35%); */
  background: #fff;
  overflow: hidden;
}

.el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
.properties-panel {
  position: relative;
}
.properties-panel .el-icon-close {
  position: absolute;
  right: 15px;
  font-size: 16px;
  top: 10px;
  cursor: pointer;
  z-index: 10;
}

.form-design .form-build-panel {
  width: calc(100% - 300px);
  padding: 0 30px;
  margin: 0 auto;
  background: #fff;
}
.form-design .form-build-panel .row {
  height: auto;
}
.header-left .icon {
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}
.header-left .header-label {
  padding-left: 12px;
  max-width: 230px;
  line-height: 1;
}

.ellipsis {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
