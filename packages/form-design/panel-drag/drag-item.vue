<template>
  <div class="drag-item">
    <draggable
      tag="ul"
      :value="list"
      v-bind="{
        group: { name: 'form-draggable', pull: 'clone', put: false },
        sort: false,
        animation: 180,
        ghostClass: 'moving'
      }"
      @start="handleStart($event, list)"
      @end="handleEnd($event, list)"
    >
      <li
        class="form-edit-widget-label"
        v-for="(val, index) in list"
        :key="index"
      >
        <div
          class="handle-widget-label"
          draggable="true"
          :title="getLabel(val.label)"
        >
          <div class="label-item">
            <img
              v-if="weightIcon(val)"
              draggable="false"
              class="item-img"
              :src="weightIcon(val)"
              :alt="getLabel(val.label)"
            />
          </div>
          <div class="handle-label">{{ getLabel(val.label) }}</div>
        </div>
      </li>
    </draggable>
  </div>
</template>
<script>
import { getItemIcon } from '../../utils/icons.js';
import draggable from 'vuedraggable';
import LocalMixin from '../../locale/mixin.js';
export default {
  name: 'dragItem',
  mixins: [LocalMixin],
  data() {
    return {
      formKey: '11'
    };
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    draggable
  },

  methods: {
    handleEnd(e, list) {
      //console.log('dragend')
      this.$emit('dragend', list, e.oldIndex);
    },
    handleStart(e, list) {
      //console.log('handleStart')
    },
    //组件图标
    weightIcon(item) {
      // 先判断全局是否有配置 或者是自定义组件
      if (item.icon) return item.icon;
      //return item.icon
      return getItemIcon(item.type);
    }
  }
};
</script>
<style>
.drag-item {
  padding: 8px 0;
  width: 100%;
  max-height: 800px;
  /* overflow: auto; */
}

.drag-item .widget-cate {
  padding: 8px 12px;
  font-size: 13px;
}

.drag-item ul {
  position: relative;
  overflow: hidden;
  padding: 0 5px 5px;
  margin: 0;
}

.drag-item ul .form-edit-widget-label {
  font-size: 12px;
  display: block;
  width: calc(100% - 34px);
  line-height: 26px;
  position: relative;
  margin: 5px 12px 10px 12px;
  border: 1px solid #e9ecf4;
  text-align: center;
  cursor: pointer;
}

.drag-item ul .form-edit-widget-label,
.drag-item ul .form-edit-widget-label .label-item {
  -webkit-transition: 0.15s ease-in-out;
  transition: 0.15s ease-in-out;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  /* will-change: transform; */
}

.drag-item ul .form-edit-widget-label:hover {
  color: #409eff;
  border: 1px dashed #409eff;
}

.drag-item ul .form-edit-widget-label .handle-widget-label {
  display: flex;
  align-items: center;
}

.drag-item ul .form-edit-widget-label .label-item {
  cursor: pointer;
  height: 35px;
  position: relative;
}

.drag-item ul .form-edit-widget-label .label-item:hover {
  z-index: 1;
}

.drag-item ul .form-edit-widget-label:hover,
.drag-item ul .form-edit-widget-label .label-item:hover {
  -webkit-transform: scale(1.075);
  transform: scale(1.075);
}

.drag-item ul .form-edit-widget-label .item-img {
  height: 100%;
  -o-object-fit: none;
  object-fit: scale-down;
  width: 100%;
}

.drag-item ul .form-edit-widget-label .handle-label {
  font-size: 12px;
  font-weight: 400;
  line-height: 10px;
  height: 15px;
  line-height: 1.5;
  text-align: center;
  color: #494f5d;
}

.drag-item ul a {
  display: block;
  cursor: move;
  background: #f4f6fc;
  border: 1px solid #f4f6fc;
}

.drag-item ul a .icon {
  margin-right: 6px;
  margin-left: 8px;
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
}

.drag-item ul a span {
  display: inline-block;
  vertical-align: middle;
}
</style>
