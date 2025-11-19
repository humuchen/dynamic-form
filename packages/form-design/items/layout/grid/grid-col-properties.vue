<template>
  <!-- <el-row
      class="layout-grid-col-pro"
      v-for="(val, index) in value"
      :key="index"
    >
      <el-col :span="18">
        <el-input-number
          style="width: 100%"
          :max="24"
          v-model="val.span"
          :placeholder="t('dyform.item.name')"
        />
      </el-col>
      <el-col :span="6">
        <div
          @click="handleDelete(index)"
          class="delete"
          :title="t('dyform.item.delete')"
        >
          <i class="el-icon-delete" />
        </div>
      </el-col>
    </el-row>
    <el-row v-if="!disabled" :span="24">
      <el-button type="primary" @click="handleAddCol">
        {{ t('dyform.item.add') }}
      </el-button>
    </el-row> -->
  <el-row class="layout-grid-row">
    <el-col
      v-for="(item, index) in icons"
      :key="index"
      :span="3"
      :class="['layout-grid-col', active === item.value && 'active']"
    >
      <img :src="item.label" @click="handleAddCol(item.value)" />
    </el-col>
  </el-row>
</template>
<script>
import LocalMixin from '../../../../locale/mixin.js';
import { gridIcons } from '../../../../utils/icons.js';

export default {
  mixins: [LocalMixin],
  props: {
    value: {
      type: Array
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icons() {
      return Object.keys(gridIcons).map((key) => {
        return {
          label: gridIcons[key],
          value: key
        };
      });
    },
    active() {
      const { value } = this;
      let _active = '';
      if (value.length === 3) {
        _active = 'column2';
      } else if (value.length === 4) {
        _active = 'column3';
      } else {
        value.filter((val) => val.span === 12).length === 2 &&
          (_active = 'column1');
        value[0].span === 6 && (_active = 'column4');
        value[0].span === 18 && (_active = 'column5');
      }
      return _active;
    },
    itemData() {
      return {
        column1: [
          { span: 12, list: [] },
          { span: 12, list: [] }
        ],
        column2: [
          { span: 8, list: [] },
          { span: 8, list: [] },
          { span: 8, list: [] }
        ],
        column3: [
          { span: 6, list: [] },
          { span: 6, list: [] },
          { span: 6, list: [] },
          { span: 6, list: [] }
        ],
        column4: [
          { span: 6, list: [] },
          { span: 18, list: [] }
        ],
        column5: [
          { span: 18, list: [] },
          { span: 6, list: [] }
        ]
      };
    }
  },
  methods: {
    handleAddCol(v) {
      // const addData = this.value.concat([
      //   {
      //     span: 12,
      //     list: []
      //   }
      // ]);
      const { itemData } = this;
      this.value = [];
      this.$emit('input', itemData[v]);
    },
    handleDelete(deleteIndex) {
      // 删除
      this.$emit(
        'input',
        this.value.filter((val, index) => index !== deleteIndex)
      );
    }
  }
};
</script>
<style>
.layout-grid-col-pro .delete {
  margin-left: 10px;
  background: #ffe9e9;
  color: #f22;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.layout-grid-row {
  display: flex;
  align-items: center;
}

.layout-grid-row .layout-grid-col {
  padding: 9px 0 0 9px;
  cursor: pointer;
  margin-right: 10px;
}

.layout-grid-row .active {
  border: 1px solid #2d99fd;
}
</style>
