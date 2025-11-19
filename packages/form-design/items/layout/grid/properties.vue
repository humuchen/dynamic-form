<template>
  <el-form
    class="layout-grid-properties"
    size="mini"
    label-width="80px"
    label-position="top"
  >
    <el-form-item
      :label="t('dyform.item.grid.config')"
      v-if="selectItem && selectItem.columns && selectItem.columns.length > 0"
    >
      <ColProperties v-model="selectItem.columns" />
    </el-form-item>
  </el-form>
</template>
<script>
import ColProperties from './grid-col-properties.vue';
import LocalMixin from '../../../../locale/mixin.js';
export default {
  mixins: [LocalMixin],
  components: {
    ColProperties
  },
  props: {
    selectItem: {
      type: Object
    }
  },
  methods: {}
};
</script>
<style>
/* .layout-grid-properties {
  padding: 20px;
} */
</style>
