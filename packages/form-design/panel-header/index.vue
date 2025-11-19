<template>
  <div class="panel-header-index">
    <div class="header-sub">
      <div class="header-left">
        <slot name="logo"></slot>
      </div>
      <div class="header-right">
        <div class="right-left">
          <template v-if="undo">
            <el-button
              v-if="clear"
              type="text"
              size="medium"
              icon="el-icon-back"
              @click="handleUndo"
              :disabled="!isUndo"
              >{{ t('dyform.header.undo') }}</el-button
            >
            <el-button
              v-if="clear"
              type="text"
              size="medium"
              icon="el-icon-right"
              @click="handleRedo"
              :disabled="!isRedo"
              style="padding-right: 20px"
              >{{ t('dyform.header.redo') }}</el-button
            >
          </template>
          <slot name="formName"></slot>
        </div>
        <div class="right-right">
          <span class="buttons">
            <slot name="controlButton"></slot>
            <el-button
              v-if="clear"
              type="text"
              size="mini"
              icon="el-icon-delete"
              @click="handleClear"
            >
              {{ t('dyform.header.clear') }}
            </el-button>
            <el-button
              v-if="preview && !previewVisible"
              size="mini"
              @click="handlePreview(true)"
            >
              {{ t('dyform.header.preview') }}
            </el-button>
            <el-button
              v-if="previewVisible"
              size="mini"
              @click="handlePreview(false)"
            >
              {{ t('dyform.header.edit') }}
            </el-button>
            <el-button
              v-if="save"
              type="primary"
              size="mini"
              @click="handleSave"
            >
              {{ t('dyform.header.save') }}
            </el-button>
            <el-button
              v-if="imp"
              type="text"
              size="medium"
              icon="el-icon-download"
              @click="handleImport"
              >{{ t('dyform.header.imp') }}</el-button
            >
            <el-button
              v-if="exp"
              type="text"
              size="medium"
              icon="el-icon-upload2"
              @click="handleExport"
              >{{ t('dyform.header.exp') }}</el-button
            >
            <slot name="controlAfterButton"></slot>
          </span>
        </div>
      </div>
    </div>

    <Preview v-if="previewVisible" ref="preview" />
    <Code v-if="codeVisible" ref="code" @imp="importData" />
  </div>
</template>
<script>
import Preview from './preview.vue';
import Code from './code.vue';
import LocalMixin from '../../locale/mixin.js';
export default {
  mixins: [LocalMixin],
  components: {
    Code,
    Preview
  },
  data() {
    return {
      previewVisible: false,
      codeVisible: false
    };
  },
  props: {
    formTemplate: {
      type: Object
    },
    // 是否开启undo redo
    undo: {
      type: Boolean,
      default: false
    },
    isRedo: {
      type: Boolean,
      default: false
    },
    isUndo: {
      type: Boolean,
      default: false
    },
    // 按钮显示隐藏
    clear: {
      type: Boolean,
      default: true
    },
    preview: {
      type: Boolean,
      default: true
    },
    reder: {
      type: Boolean,
      default: true
    },
    imp: {
      type: Boolean,
      default: true
    },
    exp: {
      type: Boolean,
      default: true
    },
    save: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClear() {
      this.$confirm(
        this.t('dyform.header.clear_prompt'),
        this.t('dyform.header.prompt'),
        {
          confirmButtonText: this.t('dyform.confirm'),
          cancelButtonText: this.t('dyform.cancel'),
          type: 'warning'
        }
      ).then(() => {
        this.$set(this.formTemplate, 'list', []);
      });
    },
    handleUndo() {
      this.$emit('undo');
    },
    handleRedo() {
      this.$emit('redo');
    },
    handlePreview(val) {
      if (!this.formTemplate.list.length) {
        this.$message.warning(this.t('dyform.header.empty_prompt'));
        return;
      }
      this.previewVisible = val;

      // this.$nextTick(() => {
      //   this.$refs.preview.init(this.formTemplate);
      // });

      this.$emit('preview', this.previewVisible);
    },
    handleImport() {
      this.codeVisible = true;
      this.$nextTick(() => {
        this.$refs.code.init(this.formTemplate, true);
      });
    },
    // 外部导入
    importData(codes) {
      this.$emit('importData', codes);
    },
    handleExport() {
      this.codeVisible = true;
      this.$nextTick(() => {
        this.$refs.code.init(this.formTemplate);
      });
    },
    handleSave() {
      this.$emit('save');
    }
  }
};
</script>
<style scoped></style>
<style>
.panel-header-index {
  height: 100%;
}

.panel-header-index .header-sub {
  display: flex;
  align-items: center;
  height: inherit;
  padding: 0 0 0 15px;
}

.panel-header-index .header-sub .header-left {
  width: 260px;
}

.panel-header-index .header-sub .header-right {
  display: flex;
  justify-content: space-between;
  flex: 2;
  flex-basis: auto;
}

/* .panel-header-index .header-sub .header-right .right-left {
}

.panel-header-index .header-sub .header-right .right-right {
} */

.panel-header-index .logo,
.panel-header-index .title {
  float: left;
  padding-left: 10px;
}

.panel-header-index .title {
  line-height: 40px;
  height: 40px;
  padding-left: 20px;
}

.panel-header-index .buttons {
  float: right;
}

.panel-header-index .buttons .el-button--mini {
  border-radius: 2px;
  font-weight: 400;
  color: #fff;
}
.panel-header-index .buttons .el-button:focus,
.panel-header-index .buttons .el-button:hover {
  background: transparent;
}

.el-button--primary {
  background: #267ef1;
  border-color: #267ef1;
}

.panel-header-index .buttons .el-button--primary:focus,
.panel-header-index .buttons .el-button--primary:hover {
  background: #52a3ff;
  border-color: #52a3ff;
}

.panel-header-index .buttons .el-button--default {
  background: rgba(38, 126, 241, 0);
  border-color: #859ebd;
}
</style>
