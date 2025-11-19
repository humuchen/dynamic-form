<template>
  <el-row
    class="dy-layout-row"
    :class="record.options.customClass"
    :style="{
      ...record.options.customStyle,
      '--grid-border': !isDragPanel ? 'none' : '1px dashed #cff0ff'
    }"
    :gutter="record.options.gutter"
  >
    <el-col
      class="dy-layout-col"
      v-for="(item, index) in record.columns"
      :key="index"
      :span="item.span || 0"
    >
      <el-row class="grid-row">
        <draggable
          v-if="isDragPanel"
          tag="div"
          class="draggable-box grid"
          v-bind="{
            group: 'form-draggable',
            ghostClass: 'moving',
            animation: 180,
            handle: '.drag-move'
          }"
          v-model="item.list"
          @add="dragEnd($event, item.list)"
        >
          <dy-form-node
            v-for="node in item.list"
            :key="node.key"
            class="drag-move"
            :selectItem="selectItem"
            :record="node"
            @handleSelectItem="handleSelectItem"
            @handleCopy="handleCopy(node, item.list)"
            @handleDetele="handleDetele(node, item.list)"
          />
        </draggable>
        <template v-else>
          <dy-form-node
            v-for="node in item.list"
            :is-drag="false"
            :key="node.key"
            :disabled="disabled"
            :prop-prepend="propPrepend"
            :preview="preview"
            :models.sync="models"
            :record="node"
          />
        </template>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
import draggable from 'vuedraggable';
import mixin from '../../mixin.js';
import { Message } from 'element-ui';
import { t } from '../../../../locale/index.js';
import { findListWithItem } from '../../../../utils/index.js';
export default {
  mixins: [mixin],
  components: {
    draggable
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    dragEnd(evt, columns) {
      // 拖拽结束,自动选择拖拽的控件项
      if (columns[evt.newIndex].type === 'grid') {
        Message.warning(t('dyform.item.grid.no_support'));
        const list = findListWithItem(this.selectItem, columns[evt.newIndex]);
        this.handleDetele(columns[evt.newIndex], list);
        return;
      }

      const clone = this.cloneDeepAndFormat(columns[evt.newIndex], evt);

      // 去掉icon
      delete clone.icon;
      this.$set(columns, evt.newIndex, clone);
      this.handleSelectItem(columns[evt.newIndex]);
    },
    handleCopy(item, list) {
      console.log('item copy', item, list);
      const nitem = this.cloneDeepAndFormat(item);
      const key = item.type + '_' + new Date().getTime();
      nitem.key = key;
      nitem.model = key;

      // 找到index 插入
      const oindex = list.findIndex((t) => t.key == item.key);

      if (oindex >= 0) {
        // insert
        list.splice(oindex + 1, 0, nitem);
      }
    },
    handleDetele(item, list) {
      const oindex = list.findIndex((t) => t.key == item.key);
      if (oindex >= 0) {
        list.splice(oindex, 1);
      }
    }
  }
};
</script>
<style>
.dy-layout-row {
  margin: 0px !important;
  border-radius: 4px;
  border: var(--grid-border);
}

.dy-layout-row .dy-layout-col {
  min-height: 70px;
}

.dy-layout-row .dy-layout-col .draggable-box {
  min-height: 65px;
  border-radius: 4px;
  border: 1px dashed #ccc;
  box-sizing: border-box;
  padding-left: 2px;
  padding-right: 2px;
}
.dy-layout-row .dy-layout-col .grid .drag-move:last-child {
  margin-bottom: 30px;
}
</style>
