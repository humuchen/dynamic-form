<template>
  <!-- 上传 -->
  <Upload
    :style="`width:${record.options.width}`"
    :disabled="recordDisabled"
    v-model="models[record.model]"
    :record="record"
    :accept="record.options.accept"
    :image="true"
    :preview="preview"
    :list-type="record.options.listType"
    :multiple="record.options.multiple"
    :action="record.options.action"
    :limit="record.options.limit"
    :limit-size="record.options.limitSize"
    :upload-auto-hidden="record.options.uploadHidden"
    :tip="tip"
  />
</template>
<script>
import Upload from '../upload.vue';

import mixin from '../../../mixin.js';
export default {
  mixins: [mixin],
  components: {
    Upload
  },
  computed: {
    uploadConfig() {
      return this.ngConfig.uploadConfig;
    },
    tip() {
      return this.record.options.accept.length
        ? `只能上传${this.record.options.accept}文件，且不超过${this.record.options.limitSize}MB`
        : `文件大小不超过${this.record.options.limitSize}MB`;
    }
  },
  watch: {
    uploadConfig(val) {
      this.initConfig();
    }
  },
  created() {
    this.initConfig();

    this.updateArrayDefaultValue();
  },
  methods: {
    initConfig() {
      const uploadConfig = this.uploadConfig;

      const action = this.record.options.action;
      if (!action && uploadConfig && uploadConfig.uploadUrl) {
        this.$set(this.record.options, 'action', uploadConfig.uploadUrl);
      }

      const filePath = this.record.options.responseFileUrl;
      const fileIdPath = this.record.options.responseFileId;

      if (!filePath && uploadConfig && uploadConfig.filePath) {
        this.$set(
          this.record.options,
          'responseFileUrl',
          uploadConfig.filePath
        );
      }
      if (!fileIdPath && uploadConfig && uploadConfig.fileIdPath) {
        this.$set(
          this.record.options,
          'responseFileId',
          uploadConfig.fileIdPath
        );
      }
    }
  }
};
</script>
