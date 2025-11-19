<template>
  <div>
    <DatasourceConfig :selectItem="selectItem">
      <template slot="defaultValue" slot-scope="{ dataSource }">
        <el-form-item v-if="selectItem" :label="t('dyform.item.default_value')">
          <template slot="label">
            <span>{{ t('dyform.item.default_value') }}</span>
            <!--
          添加清空默认值
        -->
            <el-button
              :title="t('dyform.item.radio.clear_default_tip')"
              type="text"
              icon="el-icon-delete"
              style="color: red"
              @click="selectItem.options.defaultValue = ''"
            ></el-button>
          </template>
          <!-- 判断当前是否多选 -->
          <el-radio-group
            :options="dataSource"
            v-model="selectItem.options.defaultValue"
          >
            <template v-for="(item, index) in dataSource || []">
              <el-radio
                v-if="!item.disabled && item.label"
                :label="item.value"
                :key="index"
                @click.stop="selectRadio(item.value)"
              >
                {{ item.label }}
              </el-radio>
            </template>
          </el-radio-group>
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
  },
  methods: {
    selectRadio(v) {
      console.log('v', v);
    }
  }
};
</script>
