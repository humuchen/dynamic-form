<template>
  <div>
    <DatasourceConfig :selectItem="selectItem">
      <template slot="defaultValue" slot-scope="{ dataSource }">
        <el-form-item v-if="selectItem" :label="t('dyform.item.default_value')">
          <!-- 判断当前是否多选 -->
          <el-select
            :multiple="selectItem.options.multiple"
            v-model="selectItem.options.defaultValue"
            :clearable="true"
            style="width: 100%"
          >
            <template v-for="(item, index) in dataSource">
              <el-option
                v-if="item.label && !item.disabled"
                :key="item.value + index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </template>
          </el-select>
        </el-form-item>
      </template>
    </DatasourceConfig>

    <!-- <el-collapse-item
      name="linkage"
      :title="t('dyform.item.linkage_title')"
      class="linkage-item"
    >
      <el-form size="mini" label-width="80px" class="linkage-form">
        <el-form-item :label="t('dyform.item.linkage')">
          <el-switch
            v-model="selectItem.options.linkage"
            :active-text="t('dyform.item.yes')"
            :inactive-text="t('dyform.item.no')"
          >
          </el-switch>
        </el-form-item>
        <template v-if="selectItem.options.linkage">
          联动关联中如果事本地数据则只有脚本关联,如果是远程数据则包含远程搜索
          <Linkage v-model="selectItem.options.linkData" />
        </template>
      </el-form>
    </el-collapse-item> -->
  </div>
</template>
<script>
import DatasourceConfig from './datasource-config.vue';
import Linkage from './linkage.vue';
import LocalMixin from '../../../../locale/mixin.js';
export default {
  mixins: [LocalMixin],
  components: {
    DatasourceConfig,
    Linkage
  },
  data() {
    return {};
  },
  props: {
    selectItem: {
      type: Object
    }
  },
  computed: {
    multiple() {
      if (this.selectItem && this.selectItem.options)
        return this.selectItem.options.multiple;
      return undefined;
    }
  },
  watch: {
    multiple(val) {
      if (val == undefined) return;
      if (val) {
        this.$set(this.selectItem.options, 'defaultValue', []);
      } else {
        this.$set(this.selectItem.options, 'defaultValue', '');
      }
    }
  }
};
</script>
