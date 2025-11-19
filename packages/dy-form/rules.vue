<!--
  修改多选、下拉、单选等控件options的组件，添加移除校验规制的组件
-->

<template>
  <div class="dy-form-rules">
    <template v-if="value && value.length > 0">
      <el-checkbox
        v-model="value[0].required"
        :label="t('dyform.rules.required')"
      />
      <div class="required-message">
        <el-input
          v-show="value[0].required"
          v-model="value[0].message"
          :placeholder="t('dyform.rules.required_message')"
        />
        <span class="el-form-item__error error-msg" v-show="!value[0].message">
          {{ t('dyform.rules.required_message') }}
        </span>
      </div>
    </template>
    <el-row :gutter="8" class="option-box" v-show="showFormatValidate">
      <el-col :span="24">
        <label class="option-label">
          {{ t('dyform.rules.format_validate') }}
        </label>
        <el-select
          clearable
          style="width: 100%"
          :value="model.options.formatValidate"
          @change="handleSelectChange"
        >
          <el-option
            v-for="rv in dicData"
            :label="formLabel(rv.label)"
            :key="rv.value"
            :value="rv.value"
          />
        </el-select>
      </el-col>

      <el-col :span="24" class="m-t-10" v-if="showCommonRule">
        <label class="option-label">
          {{ t('dyform.rules.common_validate') }}
        </label>
        <el-select
          style="width: 100%"
          :value="value[1] ? value[1].pattern : undefined"
          @change="handlePattenChange"
        >
          <el-option
            v-for="rv in commonPatten"
            :label="rv.name"
            :key="rv.pattern"
            :value="rv.pattern"
          />
        </el-select>
      </el-col>

      <span
        class="m-t-10 option-box-dynamic"
        v-show="value.length > 1 && showCustomeRule"
      >
        <template v-for="(val, index) in value">
          <div class="option-change-box" :key="index" v-if="index !== 0">
            <el-col :span="11">
              <el-input
                v-model="val.pattern"
                :placeholder="t('dyform.rules.regular_placeholder')"
              />
            </el-col>
            <el-col :span="11">
              <el-input
                v-model="val.message"
                :placeholder="t('dyform.rules.message_tip')"
              />
            </el-col>
            <el-col :span="2">
              <div @click="handleDelete(index)" class="option-delete-box">
                <i class="el-icon-delete" />
              </div>
            </el-col>
          </div>
        </template>
      </span>

      <el-col v-if="showCustomeRule" class="m-t-10" :span="24">
        <el-button type="text" @click="handleAddRules">
          {{ t('dyform.rules.add_rule') }}
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { t, $t, currentLang } from '../locale/index.js';
import { getLabel } from '../utils/index.js';
export default {
  name: 'dy-form-rules',
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    },
    // key必须为数字
    keyNumber: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: () => {}
    },
    showFormatValidate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      error: '',
      dicData: [
        {
          label: $t('dyform.rules.invalid_validate'),
          value: 'INVALID'
        },
        {
          label: $t('dyform.rules.common_validate'),
          value: 'COMMON'
        },
        {
          label: $t('dyform.rules.regex_validate'),
          value: 'REGEX'
        }
      ],
      commonPatten: [
        {
          name: '整数(含正整数,负整数,0)',
          pattern: '^(\\-|\\+)?\\d+$',
          message: '请输入整数(含正整数,负整数,0)'
        },
        {
          name: '正整数',
          pattern: '^\\d+$',
          message: '请输入正整数'
        },
        {
          name: '自然数(正整数和0)',
          pattern: '^((\\d+)|(0+))$',
          message: '请输入自然数(正整数和0)'
        },
        {
          name: '非正整数(负整数和0)',
          pattern: '^((-\\d+)|(0+))$',
          message: '请输入非正整数(负整数和0)'
        },
        {
          name: '浮点数',
          pattern: '^\\d+(\\.\\d+)?$',
          message: '请输入浮点数'
        },
        {
          name: '非负数(含正整数，正浮点数，0)',
          pattern: '^(-?\\d+)(\\.\\d+)?$',
          message: '请输入非负数(含正整数，正浮点数，0)'
        },
        {
          name: '非正数(含负整数，负浮点数，0)',
          pattern: '^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$',
          message: '请输入浮点数'
        },
        {
          name: '仅小写字母',
          pattern: '^[a-z]+$',
          message: '请输入小写字母'
        },
        {
          name: '仅大写字母',
          pattern: '^[A-Z]+$',
          message: '请输入大写字母'
        },
        {
          name: '仅英文字母',
          pattern: '^[A-Za-z]+$',
          message: '请输入英文字母'
        },
        {
          name: '仅英文字母和数字',
          pattern: '^[A-Za-z0-9]+$',
          message: '请输入英文字母和数字'
        },
        {
          name: '仅英文字母,数字,下划线',
          pattern: '^[A-Za-z0-9_]+$',
          message: '请输入英文字母,数字,下划线'
        },
        {
          name: '仅中文字符',
          pattern: '^[\u4E00-\u9FA5]+$',
          message: '请输入中文字符'
        },
        {
          name: '仅中英文字符,数字',
          pattern: '^[\u4E00-\u9FA5A-Za-z0-9]+$',
          message: '请输入中英文字符,数字'
        },
        {
          name: '仅中英文字符,数字,下划线',
          pattern: '^[\u4E00-\u9FA5A-Za-z0-9_]+$',
          message: '请输入中英文字符,数字'
        },
        {
          name: '国内手机号',
          pattern: '^1\\d{10}$',
          message: '请输入正确的手机号'
        },
        {
          name: '身份证',
          pattern:
            '^[1-9]\\d{5}(18|19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}[\\dXx]$',
          message: '请输入正确的身份证号'
        },
        {
          name: '邮箱',
          pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
          message: '请输入正确的邮箱地址'
        },
        {
          name: '域名',
          pattern: `^([A-Za-z0-9]([A-Za-z0-9\-\_]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,62}\.?$`,
          message: '请输入正确的域名'
        },
        {
          name: 'IP地址',
          pattern:
            '^((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))$',
          message: '请输入正确的IP地址'
        },
        {
          name: 'URI',
          pattern:
            '^(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$',
          message: '请输入正确的URI地址'
        }
      ]
    };
  },
  computed: {
    showCustomeRule() {
      const { formatValidate } = this.model.options;
      return formatValidate === 'REGEX';
    },
    showCommonRule() {
      const { formatValidate } = this.model.options;
      return formatValidate === 'COMMON';
    }
  },
  methods: {
    t,
    handleAddRules({ pattern = '', message = '' }) {
      const addData = this.value.concat([
        {
          vtype: 1,
          pattern,
          message
        }
      ]);

      this.$emit('input', addData);
    },
    handleDelete(deleteIndex) {
      // 删除
      this.$emit(
        'input',
        this.value.filter((val, index) => index !== deleteIndex)
      );
    },
    formLabel(v) {
      return getLabel(v);
    },
    triggerChange() {
      this.$emit('update:model', this.model);
    },
    handleSelectChange(v) {
      this.model.options.formatValidate = v;
      this.$emit('input', this.value.slice(0, 1));
      this.triggerChange();
    },
    handlePattenChange(v) {
      const { commonPatten, handleAddRules, value } = this;
      const { pattern, message } = commonPatten.find(
        (val) => val.pattern === v
      );

      if (value.length === 1) {
        handleAddRules({ pattern, message });
        return;
      }
      value.splice(1, 1, { vtype: 1, pattern, message });

      this.$emit('input', this.value);
    }
  }
};
</script>
<style>
.dy-form-rules .required-message {
  position: relative;
}
.dy-form-rules .option-box {
  padding-top: 10px;
}

.dy-form-rules .option-box .option-box-dynamic {
  background: #f7f8fc;
  padding: 10px 10px 0;
  border-radius: 2px;
}

.dy-form-rules .option-change-box {
  height: 38px;
}

.dy-form-rules .option-change-box .option-delete-box {
  margin-top: 3px;
  background: #ffe9e9;
  color: #f22;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s;
}

.dy-form-rules .option-change-box .option-delete-box:hover {
  background: #f22;
  color: #fff;
}

.error-msg {
  font-size: 12px !important;
}

.m-t-10 {
  margin-top: 10px;
}
</style>
