<template>
  <el-form
    ref="dynamicValidateForm"
    class="dy-form"
    :model="model"
    :label-suffix="config.labelSuffix"
    :size="config.size || 'mini'"
    :key="formKey"
    :label-position="config.labelPosition || 'top'"
    :label-width="(config.labelWidth || 80) + 'px'"
  >
    <template v-for="(column, idx) in columns">
      <el-form-item
        :prop="column.prop"
        :label="formLabel(column.label)"
        :rules="column.rules"
        :title="column.tip"
        :label-width="
          column.labelWidth != null ? column.labelWidth + 'px' : null
        "
        :key="'formitem' + idx"
        v-if="
          column.show == undefined ||
          column.show == true ||
          columnVisible(column.show)
        "
      >
        <template slot="label" v-if="column.labelScript">
          {{ getScriptValue(column.labelScript, column.label) }}
        </template>

        <!-- 输入类型判断 -->
        <el-input
          v-if="!column.type || column.type == 'input'"
          v-model="model[column.prop]"
          :type="column.inputType || 'text'"
          :clearable="column.clearable"
          :maxlength="column.maxLength"
          :minlength="column.minLength"
          :min="column.min"
          :max="column.max"
          :placeholder="formLabel(column.placeholder)"
          :disabled="modelDisabled(column.prop)"
        />
        <el-input
          type="textarea"
          v-else-if="column.type == 'textarea'"
          v-model="model[column.prop]"
          :placeholder="formLabel(column.placeholder)"
        />

        <div v-else-if="column.type == 'number'" class="hd-form-number">
          <el-input-number
            style="width: 100%"
            v-model="model[column.prop]"
            :controls="column.controls"
            :controls-position="column.controlsPosition || 'right'"
            :min="column.min"
            :max="column.max"
            :precision="column.precision"
            :step="column.step"
          />
          <span v-show="column.suffix" class="dy-form-suffix">
            {{ column.suffix }}
          </span>
        </div>

        <template v-else-if="column.type == 'numbers'">
          <div v-for="(item, index) in model[column.prop]" :key="index">
            <el-row :span="24">
              <el-col :span="22">
                <!--   -->
                <el-input-number
                  v-model="model[column.prop][index]"
                  controls-position="right"
                  :min="column.min || undefined"
                  :max="column.max || undefined"
                  :precision="column.precision"
                  :step="column.step"
                />
              </el-col>
              <el-col :span="2" style="padding-left: 5px">
                <el-button
                  type="text"
                  icon="el-icon-close"
                  @click="removeData(model, column.prop, index)"
                ></el-button>
              </el-col>
            </el-row>
          </div>
          <el-button
            type="text"
            icon="el-icon-plus"
            @click="addData(model, column.prop, column.type)"
          ></el-button>
        </template>
        <el-radio-group
          v-else-if="column.type == 'radio'"
          v-model="model[column.prop]"
        >
          <el-radio
            :label="rv.value"
            v-for="(rv, index) in column.dicData"
            :key="'radio' + index"
            >{{ formLabel(rv.label) }}</el-radio
          >
        </el-radio-group>
        <el-radio-group
          v-else-if="column.type == 'radioButton'"
          v-model="model[column.prop]"
        >
          <el-radio-button
            :label="rv.value"
            v-for="(rv, index) in column.dicData"
            :key="'radioB' + index"
            >{{ formLabel(rv.label) }}</el-radio-button
          >
        </el-radio-group>
        <el-switch
          v-else-if="column.type == 'switch'"
          v-model="model[column.prop]"
        ></el-switch>
        <template v-else-if="['date', 'daterange'].includes(column.type)">
          <el-date-picker
            v-show="datePickerFormat !== 'HH:mm:ss'"
            v-model="model[column.prop]"
            align="right"
            :type="datePickerType"
            clearable
            :placeholder="formLabel(column.placeholder)"
            :start-placeholder="formLabel(column.startPlaceholder)"
            :end-placeholder="formLabel(column.endPlaceholder)"
            :format="datePickerFormat || column.format"
            :value-format="datePickerFormat || column.format"
            :pickerOptions="getPickerOptions"
          >
          </el-date-picker>
          <el-time-picker
            v-show="datePickerFormat === 'HH:mm:ss'"
            v-model="model[column.prop]"
            clearable
            :placeholder="formLabel(column.placeholder)"
            :start-placeholder="formLabel(column.startPlaceholder)"
            :end-placeholder="formLabel(column.endPlaceholder)"
            :format="datePickerFormat || column.format"
            :value-format="datePickerFormat || column.format"
            :pickerOptions="getPickerOptions"
          />
        </template>

        <el-checkbox-group
          v-else-if="column.type == 'checkbox'"
          v-model="model[column.prop]"
        >
          <el-checkbox
            :label="rv.value"
            v-for="rv in column.dicData"
            :key="rv.value"
            >{{ formLabel(rv.label) }}
          </el-checkbox>
        </el-checkbox-group>
        <el-select
          :clearable="
            column.clearable == null || column.clearable == undefined
              ? true
              : column.clearable
          "
          v-else-if="column.type == 'select'"
          v-model="model[column.prop]"
          :placeholder="formLabel(column.placeholder)"
          :multiple="column.multiple"
          :collapse-tags="column.collapseTags"
          style="width: 100%"
        >
          <el-option
            v-for="rv in column.dicData"
            :label="formLabel(rv.label)"
            :key="rv.value"
            :value="rv.value"
          >
          </el-option>
        </el-select>
        <el-row
          :gutter="20"
          v-else-if="column.type === 'slider' || column.type === 'spanGroup'"
        >
          <el-col :span="20">
            <el-slider
              v-if="column.type === 'slider'"
              v-model="model[column.prop]"
              :show-input="column.showInput"
              :min="column.min || 0"
              :max="column.max"
              :stops="column.stops"
              :show-stops="column.showStops"
              :range="column.range"
            >
            </el-slider>
            <el-radio-group v-model="model[column.prop]" v-else>
              <el-radio-button :label="6">25%</el-radio-button>
              <el-radio-button :label="12">50%</el-radio-button>
              <el-radio-button :label="18">75%</el-radio-button>
              <el-radio-button :label="24">100%</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="2">
            <i
              class="el-icon-sort"
              style="cursor: pointer"
              @click="handleChangeSpanType(column)"
            ></i>
          </el-col>
        </el-row>
        <el-row v-else-if="column.type == 'doubleNumber'">
          <el-col :span="12">
            <el-input-number
              v-model="model[column.prop][0]"
              controls-position="right"
              :min="column.min || undefined"
              :max="column.max || undefined"
              style="width: 100%"
            >
            </el-input-number>
          </el-col>
          <el-col :span="12">
            <el-input-number
              v-model="model[column.prop][1]"
              controls-position="right"
              :min="column.min || undefined"
              :max="column.max || undefined"
              style="width: 100%"
            >
            </el-input-number>
          </el-col>
        </el-row>
        <template v-else-if="column.type == 'colors'">
          <div v-for="(item, index) in model[column.prop]" :key="index">
            <el-row :span="24">
              <el-col :span="22">
                <!--   -->
                <el-color-picker
                  show-alpha
                  v-model="model[column.prop][index]"
                  :placeholder="formLabel(column.placeholder)"
                />
              </el-col>
              <el-col :span="2" style="padding-left: 5px">
                <el-button
                  type="text"
                  icon="el-icon-close"
                  @click="removeData(model, column.prop, index)"
                ></el-button>
              </el-col>
            </el-row>
          </div>
          <el-button
            type="text"
            icon="el-icon-plus"
            @click="addData(model, column.prop, column.type)"
          ></el-button>
        </template>
        <el-color-picker
          show-alpha
          v-else-if="column.type == 'color'"
          v-model="model[column.prop]"
          :placeholder="formLabel(column.placeholder)"
        ></el-color-picker>

        <KvList
          v-else-if="column.type == 'kv'"
          v-model="model[column.prop]"
          :keyNumber="column.keyNumber"
        />
        <template v-else-if="column.type == 'rules'">
          <Rules
            v-model="model[column.prop]"
            :model.sync="model"
            :showFormatValidate="column.showFormatValidate"
          />
        </template>
        <template v-else-if="column.type == 'image'">
          <ImageUpload v-model="model[column.prop]" />
        </template>
        <template v-else-if="column.type == 'button'">
          <el-button
            :type="column.buttonType || 'text'"
            @click="btnClick(column.event)"
          >
            {{ formLabel(column.label) }}
          </el-button>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
import { dynamicFun, getUUID, getLabel } from '../utils/index.js';

// key-value数组配置
import KvList from './kv-list.vue';
import Rules from './rules.vue';
import ImageUpload from './image.vue';
import { pickerOptions } from '../utils/index.js';

export default {
  name: 'dy-form',
  components: {
    KvList,
    Rules,
    ImageUpload
  },
  data() {
    return {
      formKey: getUUID(),
      sliderShow: false
    };
  },
  props: {
    // 当前组件整个配置 record
    record: {
      type: Object,
      required: true
    },
    // 当前表单绑定的model
    model: {
      type: Object,
      required: true
    },
    // 表单配置
    config: {
      type: Object,
      required: true
    },
    // 字段列表
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    formConfig: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.$dyform_bus.$on('i18nRefresh', () => {
      this.formKey = getUUID();
    });
  },
  computed: {
    datePickerFormat() {
      const { record } = this;
      return record.options.format;
    },
    datePickerType() {
      const { options, type } = this.record;
      if (type === 'daterange') {
        return options.format == 'yyyy-MM-dd'
          ? 'daterange'
          : options.format == 'HH:mm:ss'
          ? 'time'
          : 'datetimerange';
      }
      return options.format == 'yyyy-MM-dd'
        ? 'date'
        : options.format == 'HH:mm:ss'
        ? 'time'
        : 'datetime';
    },
    getPickerOptions() {
      const { options, type } = this.record;

      return pickerOptions(options, this.$dyform_config.moment)[
        this.datePickerType.replace('range', '')
      ];
    }
  },
  methods: {
    modelDisabled(prop) {
      if (prop !== 'model') return false;
      const { record } = this;
      return record.isSaved;
    },
    btnClick(eventName) {
      this.$dyform_bus.$emit(eventName);
    },
    // 返回函数值
    getScriptValue(script, currentValue) {
      //script , model ,currentValue , key="$"
      return dynamicFun(script, this.record);
    },
    columnVisible(script) {
      if (script == false) return false;
      if (typeof script == 'string') {
        return dynamicFun(script, this.record);
      }
      return true;
    },
    // 表单标签
    formLabel(v) {
      return getLabel(v);
    },
    addData(recordProp, columnProp, type) {
      let defaultVal = '#ffffff';
      if (type == 'numbers') {
        type = 0;
      }

      if (
        recordProp[columnProp] == undefined ||
        recordProp[columnProp] == null ||
        !(recordProp[columnProp] instanceof Array)
      ) {
        this.$set(recordProp, columnProp, [defaultVal]);
      } else {
        recordProp[columnProp].push(defaultVal);
      }
    },
    removeData(model, prop, index) {
      const nlist = model[prop].filter((value, i) => i !== index);
      this.$set(model, prop, nlist);
    },
    handleChangeSpanType(column) {
      if (column.type === 'slider') {
        column.type = 'spanGroup';
      } else {
        column.type = 'slider';
      }
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.dynamicValidateForm &&
          this.$refs.dynamicValidateForm.validate((valid) => {
            if (!valid) {
              reject(valid);
            }

            resolve(valid);
          });
      });
    }
  }
};
</script>
<style>
.dy-form .el-radio {
  margin-right: 10px;
}

.dy-form .el-radio .el-radio__label {
  padding-left: 5px;
}

.dy-form .hd-form-divider {
  font-size: 13px;
}

.dy-form .hd-form-number {
  display: flex;
  align-items: center;
}

.dy-form .dy-form-suffix {
  width: 40px;
  text-align: right;
}

.dy-form .hd-form-divider .el-divider__text {
  font-size: 13px;
}

.el-form--label-top .el-form-item__label {
  padding: 0;
}

.el-form-item--mini .el-form-item__error {
  font-size: 12px !important;
}

.dy-form .el-date-editor.el-input {
  width: 100%;
}

/* .dy-form .el-tag.el-tag--info .el-tag__close {
  top: 5px;
} */

.dy-form .el-select .el-tag__close.el-icon-close::before {
  transform: translate(0, 0);
}
</style>
