<template>
  <el-radio-group
    v-if="!preview"
    v-model="models[record.model]"
    :disabled="recordDisabled"
    :placeholder="getLabel(record.options.placeholder)"
    @change="handleChange($event)"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <template v-for="(radioitem, index) in checkList">
      <el-radio
        :label="itemValue ? radioitem[itemValue] : radioitem"
        :key="index"
        :disabled="itemDisabled(radioitem)"
        v-if="itemVisible(radioitem)"
      >
        {{ itemLabel ? radioitem[itemLabel] : radioitem }}
      </el-radio>
    </template>
  </el-radio-group>
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
    itemValue() {
      if (!this.record.options.dynamic) return 'value';
      return this.itemProp.value;
    },
    itemLabel() {
      if (!this.record.options.dynamic) return 'label';
      return this.itemProp.label;
    }
  },
  created() {
    this.updateSimpleDefaultValue();
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
  }
};
</script>
