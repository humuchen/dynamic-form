<template>
  <el-checkbox-group
    v-if="!preview"
    :disabled="recordDisabled"
    v-model="models[record.model]"
    :placeholder="getLabel(record.options.placeholder)"
    @change="handleChange($event)"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <template v-for="(checkitem, index) in checkList">
      <el-checkbox
        :label="itemValue ? checkitem[itemValue] : checkitem"
        :key="index"
        :disabled="itemDisabled(checkitem)"
        v-if="itemVisible(checkitem)"
      >
        {{ itemLabel ? checkitem[itemLabel] : checkitem }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
  <span v-else>
    {{ models[record.model + '_label'] }}
  </span>
</template>
<script>
import mixin from '../select/datasource-mixin.js';
export default {
  mixins: [mixin],
  data() {
    return {
      itemProp: {
        value: '',
        label: ''
      }
    };
  },
  computed: {
    checkList() {
      if (
        [1, 2].includes(this.record.options.dynamic) &&
        this.record.options.remoteFunc
      ) {
        return !this.isDragPanel ? this.checkValues : [];
        // return this.checkValues.length
        //   ? this.checkValues
        //   : this.record.options.options.filter((o) => o.label && !o.disabled);
      } else if (
        this.record.options.dynamic === 2 &&
        this.record.options.dictType
      ) {
        return this.checkValues;
      } else {
        return this.record.options.options.filter(
          (o) => o.label && !o.disabled
        );
      }
    },
    recordModel() {
      return this.record.model;
    },
    itemValue() {
      if (!this.record.options.dynamic) return 'value';
      return this.itemProp.value;
    },
    itemLabel() {
      if (!this.record.options.dynamic) return 'label';
      return this.itemProp.label;
    }
  },
  watch: {
    recordModel(val) {
      if (val) {
        this.updateArrayDefaultValue();
      }
    }
  },
  created() {
    this.updateArrayDefaultValue();

    // 判断如果是远程方法的话 远程请求数据
    this.initDynamicValue();

    // 判断是否有联动关联需要处理
    if (this.linkageData) {
      this.linkageDataHandle(false);
    }

    // 判断如果已经有了值 但没有label 则尝试回填label
    const value = this.models[this.record.model];
    const label = this.models[this.record.model + '_label'];
    if (value && value.length > 0 && !label) {
      this.handleChange(value);
    }
  },
  mounted() {}
};
</script>
