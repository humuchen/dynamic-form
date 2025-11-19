<template>
  <el-tabs type="card" v-model="active" class="design-properties">
    <el-tab-pane
      :label="t('dyform.properties.feature_property')"
      name="item"
      class="tab-pane"
    >
      <ItemProperties
        ref="itemPropRef"
        :selectItem="selectItem"
        :formConfig="formConfig"
        @save="saveHandler"
      >
        <template slot="custom-properties">
          <slot name="custom-properties" :selectItem="selectItem"></slot>
        </template>
      </ItemProperties>
    </el-tab-pane>

    <slot name="extend-tab" class="tab-pane">
      <!-- 扩展插槽,扩展对应要素属性 -->
    </slot>
  </el-tabs>
</template>
<script>
import FormProperties from './form-properties.vue';
import ItemProperties from './item-properties.vue';
import LocalMixin from '../../locale/mixin.js';

export default {
  mixins: [LocalMixin],
  components: {
    FormProperties,
    ItemProperties
  },
  props: {
    selectItem: {},
    formConfig: {}
  },
  data() {
    return {
      active: 'item'
    };
  },
  inject: ['configC'],
  computed: {
    config() {
      if (this.configC) {
        return this.configC() || {};
      }
      return {};
    },
    selectItemKey() {
      if (this.selectItem && this.selectItem.key) {
        return this.selectItem.key;
      }
      return null;
    }
  },
  watch: {
    selectItemKey(val) {
      if (val) {
        this.active = 'item';
      }
    }
  },
  methods: {
    saveHandler(item) {
      this.$emit('save', item);
    }
  }
};
</script>
<style>
.design-properties div,
.design-properties label,
.design-properties span {
  font-size: 13px;
}

/* .design-properties .tab-pane {
  padding: 0px 15px 0px 0px;
} */
.design-properties .el-tabs__item {
  font-weight: 600;
}

.design-properties .el-tabs__item,
.design-properties .el-tabs__item.is-active {
  color: #1b1e23;
}
.design-properties .el-collapse,
.design-properties .el-tabs__header,
.design-properties .el-tabs__nav {
  border: none !important;
}

.design-properties .el-select .el-tag__close.el-icon-close {
  top: 1px;
  right: -5px;
  position: relative;
}
</style>
