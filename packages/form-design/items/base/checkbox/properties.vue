<template>
  <div>
    <DatasourceConfig :selectItem="selectItem">
      <template slot="defaultValue" slot-scope="{ dataSource }">
        <el-form-item v-if="selectItem" :label="t('dyform.item.default_value')">
          <!-- 判断当前是否多选 -->
          <el-checkbox-group
            :options="dataSource"
            v-model="selectItem.options.defaultValue"
          >
            <template v-for="(item, index) in dataSource || []">
              <el-checkbox
                v-if="!item.disabled && item.label"
                :label="item.value"
                :key="item.value + index"
              >
                {{ item.label }}
              </el-checkbox>
            </template>
          </el-checkbox-group>
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
          <Linkage v-model="selectItem.options.linkData" />
        </template>
      </el-form>
    </el-collapse-item> -->
  </div>
</template>
<script>
import DatasourceConfig from '../select/datasource-config.vue';
// import Linkage from '../select/linkage.vue';
import LocalMixin from '../../../../locale/mixin.js';
export default {
  mixins: [LocalMixin],
  components: {
    DatasourceConfig
    // Linkage
  },
  props: {
    selectItem: {
      type: Object
    }
  }
};
</script>
