<!--
  修改多选、下拉、单选等控件options的组件，添加移除校验规制的组件
-->
<template>
  <div class="dy-form-kvlist">
    <el-row :gutter="8">
      <el-col :span="showOperation ? 9 : 12" v-show="showKey">
        选项标识(key)
      </el-col>
      <el-col :span="showOperation ? 9 : 12"> 选项值(value) </el-col>
    </el-row>
    <el-row :gutter="8">
      <div class="option-change-box" v-for="(val, index) in value" :key="index">
        <el-col :span="showOperation ? 18 : 24" class="option-box">
          <template v-if="showKey">
            <el-select v-if="showSelect && !val.disabled" v-model="val.value">
              <el-option
                v-for="item in fields"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-else
              v-model="val.value"
              :placeholder="t('dyform.item.key')"
              :disabled="val.disabled"
            />
          </template>
          <template>
            <el-select
              v-if="showSelect && !val.disabled"
              v-model="val.label"
              @change="labelChange"
            >
              <el-option
                v-for="item in fields"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-else
              v-model="val.label"
              :placeholder="t('dyform.item.value')"
              :disabled="val.disabled"
            />
          </template>
        </el-col>
        <el-col
          :span="6"
          class="option-box"
          v-show="showOperation && !val.disabled"
        >
          <div
            @click="handleAdd"
            class="option-plus-box"
            :title="t('dyform.item.add')"
          >
            <i class="el-icon-plus" />
          </div>
          <div
            v-show="value.length > 3"
            @click="handleDelete(index)"
            class="option-delete-box"
            :title="t('dyform.item.delete')"
          >
            <i class="el-icon-delete" />
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import { t } from '../locale/index.js';
export default {
  name: 'dy-form-kv',
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    },
    showOperation: {
      type: Boolean,
      default: true
    },
    // key必须为数字
    keyNumber: {
      type: Boolean,
      default: false
    },
    selectItem: {
      type: Object
    },
    fields: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (!this.showKey) {
          newVal.forEach((item) => {
            if (item.label) {
              item.value = item.label;
            }
          });
        }
      },
      deep: true
    }
  },
  computed: {
    showKey() {
      return this.selectItem.options.labelInValue;
    },
    showSelect() {
      return this.selectItem.options.dynamic === 1;
    }
  },
  methods: {
    t,
    handleAdd() {
      // 添加
      const addData = this.value.concat([{ value: '', label: '' }]);
      this.$emit('input', addData);
    },
    handleDelete(deleteIndex) {
      // 删除
      this.$emit(
        'input',
        this.value.filter((val, index) => index !== deleteIndex)
      );
    },
    labelChange(value) {
      this.$emit('labelChange', value);
    }
  }
};
</script>
<style>
.dy-form-kvlist {
  padding: 10px 0 0 10px;
  background: #f7f8fc;
  border-radius: 2px;
}

.dy-form-kvlist .el-input__inner {
  padding: 0 5px;
}

.dy-form-kvlist .option-change-box {
  height: 38px;
  padding-bottom: 6px;
}

.dy-form-kvlist .option-change-box .option-box {
  display: flex;
  align-items: center;
}

.dy-form-kvlist .option-change-box .option-box .el-input:first-child,
.dy-form-kvlist .option-change-box .option-box .el-select:first-child {
  margin-right: 10px;
}
.dy-form-kvlist .option-change-box .option-box .el-select {
  width: 100%;
}

.dy-form-kvlist .option-change-box .option-plus-box,
.dy-form-kvlist .option-change-box .option-delete-box {
  margin-top: 3px;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.dy-form-kvlist .option-change-box .option-plus-box {
  background: #edf8ff;
  color: #2d99fb;
  margin-right: 10px;
}

.dy-form-kvlist .option-change-box .option-plus-box:hover {
  background: #2d99fb;
  color: #fff;
}

.dy-form-kvlist .option-change-box .option-delete-box {
  background: #ffe9e9;
  color: #f22;
}

.dy-form-kvlist .option-change-box .option-delete-box:hover {
  background: #f22;
  color: #fff;
}
</style>
