<template>
  <div>
    <el-form-item :label="t('dyform.item.select_config')"
      ><!-- 数据来源 -->
      <el-select
        v-model="selectItem.options.dynamic"
        :placeholder="t('dyform.properties.select')"
        style="width: 100%"
      >
      </el-select>
    </el-form-item>
    <el-form-item></el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    selectItem: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped></style>
