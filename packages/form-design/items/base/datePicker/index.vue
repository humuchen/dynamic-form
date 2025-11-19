<template>
  <span v-if="!preview">
    <el-date-picker
      v-show="record.options.format !== 'HH:mm:ss'"
      :style="`width:${record.width}`"
      v-model="models[record.model]"
      align="right"
      :type="record.options.format === 'yyyy-MM-dd' ? 'date' : 'datetime'"
      :disabled="recordDisabled"
      :editable="record.options.editable"
      :clearable="record.options.clearable"
      :placeholder="getLabel(record.options.placeholder)"
      :format="record.options.format"
      :value-format="record.options.format"
      :pickerOptions="getPickerOptions"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    </el-date-picker>

    <el-time-picker
      v-show="record.options.format === 'HH:mm:ss'"
      :style="`width:${record.width}`"
      v-model="models[record.model]"
      :disabled="recordDisabled"
      :editable="record.options.editable"
      :clearable="record.options.clearable"
      :placeholder="getLabel(record.options.placeholder)"
      :format="record.options.format"
      :value-format="record.options.format"
      :pickerOptions="getPickerOptions"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </span>

  <span v-else>
    {{ models[record.model] }}
  </span>
</template>
<script>
import mixin from '../../mixin.js';
export default {
  mixins: [mixin],
  created() {
    this.updateSimpleDefaultValue();
  }
};
</script>
<style>
.el-picker-panel__footer .el-button--text {
  display: none;
}
</style>
