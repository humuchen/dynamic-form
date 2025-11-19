<!--
select radio checkbox cascader的数据配置。
cascader没有数据字典
-->
<template>
  <el-form size="mini" label-position="top">
    <el-form-item :label="t('dyform.item.select_config')"
      ><!-- 数据来源 -->
      <el-select
        v-model="selectItem.options.dynamic"
        :placeholder="t('dyform.properties.select')"
        style="width: 100%"
        @change="dynamicChange"
      >
        <el-option
          :label="t('dyform.item.datasource_static')"
          :value="0"
        ></el-option>
        <el-option :label="t('dyform.item.datasource')" :value="1"></el-option>
        <el-option :label="t('dyform.item.dataset')" :value="2"></el-option>
      </el-select>
    </el-form-item>

    <template v-if="selectItem.options.dynamic === 1">
      <el-form-item :label="t('dyform.item.datasource')">
        <el-select
          v-model="selectItem.options.dataSourceType"
          :placeholder="t('dyform.properties.select')"
          style="width: 100%"
          filterable
          @change="dataSourceChange"
        >
          <el-option
            v-for="item in dataSourceTypes"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('dyform.item.connection')">
        <el-select
          v-model="selectItem.options.dbKey"
          :placeholder="t('dyform.properties.select')"
          style="width: 100%"
          filterable
          @change="dbChange"
        >
          <el-option
            v-for="item in checkValues"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('dyform.item.datatable')">
        <el-select
          v-model="selectItem.options.tableName"
          :placeholder="t('dyform.properties.select')"
          style="width: 100%"
          filterable
          @change="tableChange"
        >
          <el-option
            v-for="item in tables"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
    </template>

    <template v-if="selectItem.options.dynamic === 2">
      <el-form-item :label="t('dyform.item.dataset')">
        <el-input
          class="search-keyword"
          :placeholder="t('dyform.item.keyword')"
          v-model="filterText"
        ></el-input>
        <el-tree
          ref="tree"
          node-key="modelId"
          :props="{
            children: 'children',
            label: 'nodeName'
          }"
          :data="checkValues"
          :filter-node-method="filterNode"
          :current-node-key="selectItem.options.modelId"
          highlight-current
          @node-click="handleNodeClick"
        />
      </el-form-item>
      <el-form-item :label="t('dyform.item.datafield')">
        <el-select
          v-model="selectItem.options.columnName"
          :placeholder="t('dyform.properties.select')"
          style="width: 100%"
          @change="fieldChange"
        >
          <el-option
            v-for="item in fields"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
    </template>

    <el-form-item v-if="[0, 1].includes(selectItem.options.dynamic)">
      <el-checkbox v-model="selectItem.options.labelInValue">
        {{ t('dyform.item.label_in_value') }}
      </el-checkbox>
    </el-form-item>

    <el-form-item
      label-width="0px"
      v-if="[0, 1].includes(selectItem.options.dynamic)"
    >
      <!-- 本地赋值 -->
      <KvListChildren
        v-if="selectItem.type == 'cascader'"
        v-model="selectItem.options.options"
      />
      <KvList
        v-else
        v-model="selectItem.options.options"
        :showOperation="selectItem.options.dynamic === 0"
        :selectItem="selectItem"
        :fields="fields"
        @labelChange="labelChange"
      />
    </el-form-item>

    <slot name="defaultValue" v-bind="{ dataSource: defaultDataSource }">
    </slot>
  </el-form>
</template>
<script>
import KvList from '../../../../dy-form/kv-list.vue';
import KvListChildren from '../../../../dy-form/kv-list-children.vue';
import DataSource from '../../../../dy-form/data-source.vue';
import DataSet from '../../../../dy-form/data-set.vue';
import LocalMixin from '../../../../locale/mixin.js';
import request from '../../../../utils/request.js';
import { t } from '../../../../locale/index.js';

export default {
  mixins: [LocalMixin],
  components: {
    KvList,
    KvListChildren,
    DataSource,
    DataSet
  },
  props: {
    selectItem: {
      type: Object
    }
  },
  data() {
    return {
      checkValues: [],
      fields: [],
      tables: [],
      filterText: '',
      dataSource: [],
      dynamic1Data: {
        columnValue: '',
        designModelStoreEngine: {
          conditions: [],
          dbKey: '$.options.dbKey',
          dbType: '$.options.dataSourceType',
          schemaPk: '$.options.schemaPk',
          frontJson: [
            {
              left: {
                aliasName: 'T1',
                tableFullName: '$.options.tableFullName',
                tableName: '$.options.tableName',
                tableNameCh: '$.options.tableNameCh',
                virtualTable: '$.options.tableName'
              }
            }
          ],
          frontWhere: '[]',
          storeType: 'VIEW'
        },
        modelColumn: {
          physicalName: '$.options.options[2].label',
          columnName: '$.options.options[2].label',
          chineseName: '$.options.columnNameCh',
          isCalculate: 0,
          isAggregate: 0,
          businessType: 'TEXT',
          originType: '$.options.dataType',
          toDataType: 'TEXT',
          remark: '$.options.columnNameCh',
          originBusinessType: 'TEXT'
        }
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    hasDict() {
      return (
        this.ngConfig &&
        this.ngConfig.dict &&
        this.ngConfig.dict.length > 0 &&
        this.selectItem &&
        this.selectItem.type != 'cascader'
      );
    },
    dataSourceTypes() {
      return this.ngConfig.dataSource || [];
    },
    defaultDataSource() {
      return [1, 2].includes(this.selectItem.options.dynamic)
        ? this.dataSource
        : this.selectItem.options.options;
    }
  },
  inject: {
    ngConfig: {
      from: 'ngConfig',
      default: () => ({})
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.nodeName.indexOf(value) !== -1;
    },
    queryDictSearch(queryString, cb) {
      const dicts =
        this.ngConfig && this.ngConfig.dict && this.ngConfig.dict.length > 0
          ? this.ngConfig.dict
          : null;
      if (!dicts || dicts.length == 0) {
        cb([]);
      }

      const ls = {};
      const types = [];
      dicts.forEach((t) => {
        const type = t.type;
        if (!ls[type]) {
          ls[type] = type;
          types.push(t);
        }
      });

      // 关键字过滤
      const fs = types.filter((t) => t.type.indexOf(queryString) >= 0);

      cb(fs);
    },
    fetchRemoteData(requsetData, callback) {
      request(requsetData)
        .then((res) => {
          callback(res.data);
        })
        .catch((err) => {
          callback([]);
        });
    },
    setOptions() {
      const { label, model } = this.selectItem;

      this.$set(this.selectItem.options, 'options', [
        { label, value: `${label}标识`, disabled: true },
        { label: model, value: `${model}_id`, disabled: true },
        { label: '', value: '' }
      ]);
    },
    dynamicChange(val) {
      this.checkValues = [];
      this.dataSource = [];
      this.$set(this.selectItem.options, 'defaultValue', '');
      if (val === 0) {
        this.$set(this.selectItem.options, 'dbKey', '');
        this.$set(this.selectItem.options, 'tableName', '');
        this.$set(this.selectItem.options, 'dataSourceType', '');
        this.$set(this.selectItem.options, 'modelId', '');
        this.$set(this.selectItem.options, 'columnName', '');
        this.$set(this.selectItem.options, 'schemaPk', '');
        this.$set(this.selectItem.options, 'tableFullName', '');
        this.$set(this.selectItem.options, 'tableNameCh', '');
        this.$set(this.selectItem.options, 'columnNameCh', '');
        this.$set(this.selectItem.options, 'dataType', '');
        this.fields = [];
        this.tables = [];
      }
      if (val === 1) {
        this.$set(this.selectItem.options, 'modelId', '');
        this.$set(this.selectItem.options, 'columnName', '');
      }
      if (val === 2) {
        this.$set(this.selectItem.options, 'schemaPk', '');
        this.$set(this.selectItem.options, 'dbKey', '');
        this.$set(this.selectItem.options, 'tableName', '');
        this.$set(this.selectItem.options, 'dataSourceType', '');
        this.$set(this.selectItem.options, 'tableFullName', '');
        this.$set(this.selectItem.options, 'tableNameCh', '');
        this.$set(this.selectItem.options, 'columnNameCh', '');
        this.$set(this.selectItem.options, 'dataType', '');

        this.$set(
          this.selectItem.options,
          'remoteFunc',
          '/api/dc_easybi/query/keyList'
        );
        this.$set(
          this.selectItem.options,
          'dynamicPostData',
          '{"conditions":[],"keyColumnName":"$.options.columnName","modelId":"$.options.modelId","valueColumnName":"$.options.columnName"}'
        );
        this.$set(
          this.selectItem.options,
          'remoteValue',
          '$.options.columnName'
        );
        this.$set(
          this.selectItem.options,
          'remoteLabel',
          '$.options.columnName'
        );

        this.tables = [];

        this.getModelTree();
      }
      this.setOptions();
    },
    fieldChange(val) {
      this.$set(this.selectItem.options, 'defaultValue', '');
      this.getDataByTableField(val);
    },
    getModelTree() {
      this.fetchRemoteData(
        {
          url: '/api/dc_easybi/dataSet/getModelTree',
          method: 'get',
          params: {
            isMine: 0,
            workSpace: this.ngConfig.workSpace
          }
        },
        (res) => {
          this.checkValues = res.resultContent[0].children || [];
        }
      );
    },
    getDataBase(val) {
      this.fetchRemoteData(
        {
          url: `/api/dc_easybi/open-api/v1/${this.ngConfig.workSpace}/database`,
          method: 'get',
          params: {
            dataSourceType: val,
            pageSize: 1000,
            pageNum: 1
          }
        },
        (res) => {
          this.checkValues = res.content.map((c) => {
            return {
              label: `${c.connectionName}_${c.dbName}`,
              value: c.dbKey,
              schemaPk: c.schemaPk
            };
          });
        }
      );
    },
    getListTable(val) {
      this.fetchRemoteData(
        {
          url: `/api/dc_easybi/database/listTable`,
          method: 'post',
          params: {
            dbKey: val,
            schemaPk: this.selectItem.options.schemaPk
          }
        },
        (res) => {
          this.tables = res.resultContent.map((c) => {
            return {
              label: c.tableName,
              value: c.tableName,
              ...c
            };
          });
        }
      );
    },
    getListColumn(val) {
      this.fetchRemoteData(
        {
          url: `/api/dc_easybi/database/listColumn`,
          method: 'post',
          params: {
            dbKey: this.selectItem.options.dbKey,
            tableName: val
          }
        },
        (res) => {
          this.fields = res.resultContent.map((c) => {
            return {
              label: c.columnName,
              value: c.columnName,
              ...c
            };
          });
        }
      );
    },
    getDataSetColumn(modelId) {
      this.fetchRemoteData(
        {
          url: '/api/dc_easybi/dataSet/detail',
          method: 'get',
          params: {
            modelId
          }
        },
        (res) => {
          this.fields = res.resultContent.modelColumns
            .filter((t) => t.columnType === 'DIMENSION')
            .map((a) => {
              return {
                label: a.chineseName,
                value: a.columnName
              };
            });
        }
      );
    },
    setSelectItemData(data) {
      this.selectItem.options.modelId = data.modelId;
      this.$set(this.selectItem.options, 'columnName', '');
      this.$set(this.selectItem.options, 'defaultValue', '');
      this.dataSource = [];
      this.getDataSetColumn(data.modelId);
    },
    handleNodeClick(data) {
      if (this.ngConfig.cascade.checkModelId(this.selectItem.options.modelId)) {
        this.$dyform_config.MessageBox.confirm(
          t('dyform.item.select.confirm_msg'),
          t('dyform.item.select.confirm_tip'),
          {
            confirmButtonText: t('dyform.confirm'),
            cancelButtonText: t('dyform.cancel'),
            type: 'warning'
          }
        )
          .then(() => {
            this.ngConfig.cascade.clearDataByModelId(
              this.selectItem.options.modelId
            );
            this.setSelectItemData(data);
          })
          .catch(() => {
            this.$refs.tree.setCurrentKey(
              this.selectItem.options.modelId || null
            );
          });
      } else {
        this.setSelectItemData(data);
      }
    },
    dataSourceChange(val) {
      this.$set(this.selectItem.options, 'dbKey', '');
      this.$set(this.selectItem.options, 'schemaPk', '');
      this.$set(this.selectItem.options, 'tableName', '');
      this.$set(this.selectItem.options, 'tableFullName', '');
      this.$set(this.selectItem.options, 'tableNameCh', '');
      this.$set(this.selectItem.options, 'columnNameCh', '');
      this.$set(this.selectItem.options, 'dataType', '');
      this.fields = [];
      this.tables = [];
      this.setOptions();
      this.getDataBase(val);
    },
    dbChange(val) {
      this.$set(this.selectItem.options, 'tableName', '');
      this.$set(this.selectItem.options, 'tableFullName', '');
      this.$set(this.selectItem.options, 'tableNameCh', '');
      this.$set(this.selectItem.options, 'columnNameCh', '');
      this.$set(this.selectItem.options, 'dataType', '');
      this.fields = [];
      this.tables = [];
      this.setOptions();

      if (!this.selectItem.options.schemaPk) {
        const obj = this.checkValues.find((t) => t.value == val);
        this.$set(this.selectItem.options, 'schemaPk', obj.schemaPk);
      }
      this.getListTable(val);
    },
    tableChange(val) {
      this.fields = [];
      const table = this.tables.find((t) => t.value == val);
      if (table) {
        this.$set(
          this.selectItem.options,
          'tableFullName',
          table.tableFullName
        );
        this.$set(this.selectItem.options, 'tableNameCh', table.tableCh);
      }

      this.$set(this.selectItem.options, 'columnNameCh', '');
      this.$set(this.selectItem.options, 'dataType', '');

      this.setOptions();
      this.getListColumn(val);
    },
    getDataSetInfo() {
      this.getModelTree();
      this.getDataSetColumn(this.selectItem.options.modelId);
      this.getDataByTableField(this.selectItem.options.columnName);
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.selectItem.options.modelId);
      });
    },
    getDataSourceInfo() {
      this.getDataBase(this.selectItem.options.dataSourceType);
      this.getListTable(this.selectItem.options.dbKey);
      this.getListColumn(this.selectItem.options.tableName);
      //this.getDataByTableField()
    },
    getDataByTableField(val) {
      this.fetchRemoteData(
        {
          url: `/api/dc_easybi/query/keyList`,
          method: 'post',
          data: {
            conditions: [],
            keyColumnName: val,
            modelId: this.selectItem.options.modelId,
            valueColumnName: val
          }
        },
        (res) => {
          const datas = res.resultContent.map((c) => {
            return {
              label: c[val],
              value: c[val]
            };
          });
          this.dataSource = datas;
        }
      );
    },
    getDataSetColumnList(value) {
      const { selectItem } = this;
      this.fetchRemoteData(
        {
          url: `/api/dc_easybi/dataSet/dataSetColumnList`,
          method: 'post',
          data: {
            columnValue: '',
            designModelStoreEngine: {
              conditions: [],
              dbKey: selectItem.options.dbKey,
              dbType: selectItem.options.dataSourceType,
              schemaPk: selectItem.options.schemaPk,
              frontJson: [
                {
                  left: {
                    aliasName: 'T1',
                    tableFullName: selectItem.options.tableFullName,
                    tableName: selectItem.options.tableName,
                    tableNameCh: selectItem.options.tableNameCh,
                    virtualTable: selectItem.options.tableName
                  }
                }
              ],
              frontWhere: '[]',
              storeType: 'VIEW'
            },
            modelColumn: {
              physicalName: value,
              columnName: value,
              chineseName: selectItem.options.columnNameCh,
              isCalculate: 0,
              isAggregate: 0,
              businessType: 'TEXT',
              originType: selectItem.options.dataType,
              toDataType: 'TEXT',
              remark: selectItem.options.columnNameCh,
              originBusinessType: 'TEXT'
            }
          }
        },
        (res) => {
          const datas = res.resultContent.map((c) => {
            return {
              label: c,
              value: c
            };
          });
          this.dataSource = datas;
        }
      );
    },
    labelChange(value) {
      this.$set(this.selectItem.options, 'defaultValue', '');
      const field = this.fields.find((f) => f.value === value);
      if (field) {
        this.$set(this.selectItem.options, 'columnNameCh', field.comment);
        this.$set(this.selectItem.options, 'dataType', field.dataType);
      }

      this.$set(
        this.selectItem.options,
        'remoteFunc',
        '/api/dc_easybi/dataSet/dataSetColumnList'
      );

      this.$set(
        this.selectItem.options,
        'dynamicPostData',
        JSON.stringify(this.dynamic1Data)
      );
      this.$set(this.selectItem.options, 'remoteValue', '');
      this.$set(this.selectItem.options, 'remoteLabel', '');
      this.getDataSetColumnList(value);
    }
  },
  mounted() {
    this.selectItem.options.dynamic === 1 && this.getDataSourceInfo();
    this.selectItem.options.dynamic === 2 && this.getDataSetInfo();
  }
};
</script>

<style>
.el-tree {
  max-height: 180px;
  overflow: auto;
}

.search-keyword {
  margin-bottom: 10px;
}
</style>
