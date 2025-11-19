<template>
  <div class="item-properties">
    <div class="item-properties-content">
      <!-- 判断是否有自定义的属性配置组件 -->
      <p class="no-data-text" v-show="!selectItemKey">
        <!--   请先从面板中选择组件 -->
        {{ t('dyform.properties.no_feature') }}
      </p>
      <!-- 先是属性中配置的columns -->
      <dy-form
        v-if="
          formColumns && formColumns.column && formColumns.column.length > 0
        "
        ref="dyFormRef"
        :formConfig="formConfig"
        :config="formColumns.config"
        :record="selectItem"
        :model="selectItem"
        :columns="formColumns.column"
      />

      <!--
      分割线
    循环group 处理在group中但要显示在外部的表单
    -->
      <template v-for="(form, formIndex) in groupColumns">
        <dy-form
          v-if="
            form.alone != undefined &&
            form.alone == false &&
            form.column &&
            form.column.length > 0
          "
          :key="formIndex + selectItemKey"
          :config="form.config"
          :record="selectItem"
          :model="selectItem[form.prop]"
          :columns="form.column"
          :formConfig="formConfig"
        />
      </template>

      <slot name="custom-properties"></slot>

      <!--
    循环group 处理在group中但显示在折叠面板中的表单
    -->
      <el-collapse
        :key="'2' + selectItemKey"
        v-model="activeNames"
        class="dy-form-properties-collapse"
      >
        <template
          v-if="groupColumnsCollapse && groupColumnsCollapse.length > 0"
        >
          <el-collapse-item
            v-for="(form, formIndex) in groupColumnsCollapse"
            :key="'form' + formIndex"
            :title="formTitle(form.label)"
            :name="formIndex + ''"
          >
            <dy-form
              ref="dyFormRef"
              :config="form.config"
              :record="selectItem"
              :model="selectItem[form.prop]"
              :columns="form.column"
              :formConfig="formConfig"
            />
          </el-collapse-item>
        </template>
        <!-- 最后判断有没有自定义属性配置 -->
        <component
          ref="itemProperties"
          v-if="propertiesComponent"
          :key="formKey"
          :selectItem="selectItem"
          :is="propertiesComponent"
          :formConfig="formConfig"
        >
        </component>
      </el-collapse>
    </div>
    <!-- <div class="item-properties-footer">
      <el-button size="mini" type="primary" @click="saveHandler"
        >保存</el-button
      >
    </div> -->
  </div>
</template>
<script>
import NgForm from '../../dy-form/index.vue';

// 获取个性化属性配置
import itemIndex from '../items/index.js';

import { dynamicFun, getLabel } from '../../utils/index.js';
import cloneDeep from 'lodash/cloneDeep';
import { getAllConfig, getCustomConfig } from '../../constants';
import LocalMixin from '../../locale/mixin.js';

export default {
  mixins: [LocalMixin],
  components: {
    NgForm
  },
  data() {
    return {
      activeNames: [],
      groupColumns: [],
      // 独立与group分组，直接配置的属性
      formColumns: {},
      formKey: '11'
    };
  },
  props: {
    selectItem: {},
    formConfig: {}
  },
  inject: {
    // 自定义组件
    customComponents: {
      from: 'customC',
      default: () => []
    }
  },
  computed: {
    selectItemKey() {
      if (this.selectItem && this.selectItem.key) {
        return this.selectItem.key;
      }
      return '';
    },
    // 是否显示事件
    showEvent() {
      if (!this.selectItem) return false;
      if (this.selectItem.event_ != undefined && !this.selectItem.event_)
        return false;

      return true;
    },
    // 是否显示监听
    showListen() {
      if (!this.selectItem) return false;
      if (this.selectItem.listen_ != undefined && !this.selectItem.listen_)
        return false;

      return true;
    },
    isCustomComponent() {
      if (!this.selectItem || !this.selectItem.type) return false;

      // 判断自定义组件
      if (this.customComponents && this.customComponents.length > 0) {
        const cs = this.customComponents.filter(
          (t) => t.type == this.selectItem.type
        );
        return cs && cs.length > 0;
      }
      return false;
    },
    propertiesComponent() {
      if (!this.selectItem || !this.selectItem.type) return null;

      // 判断自定义组件
      if (this.customComponents && this.customComponents.length > 0) {
        const cs = this.customComponents.filter(
          (t) => t.type == this.selectItem.type
        );
        if (cs && cs.length > 0) {
          return cs[0].properties;
        }
      }
      const selectItemType = this.selectItem.type;
      // 将数组映射成json
      if (itemIndex && itemIndex.length > 0) {
        for (let i = 0; i < itemIndex.length; i++) {
          const itemList = itemIndex[i];

          if (itemList.list && itemList.list.length > 0) {
            const fs = itemList.list.filter((t) => t.type == selectItemType);
            if (fs && fs.length > 0) {
              return fs[0].properties;
            }
          }
        }
      }

      return null;
    },
    // 分组字段 需要在collapse上显示的列表
    groupColumnsCollapse() {
      return this.groupColumns.filter((form) => {
        return (
          (form.alone == undefined || form.alone == true) &&
          form.column &&
          form.column.length > 0
        );
      });
    },
    // 动态标签值
    dynamicLabel() {
      return this.selectItem ? this.selectItem.dynamicLabel : undefined;
    }
  },
  watch: {
    selectItemKey() {
      this.init();
    },
    dynamicLabel(val) {
      // 动态标签打开时 将标签的类型切换为textarea
      const editType = val ? 'textarea' : 'input';

      // 从column中找到label 刷新格式
      const fcolumns = this.formColumns.column;
      if (!fcolumns || fcolumns.length == 0) return;

      const fs = fcolumns.filter((t) => t.prop == 'label');
      if (fs && fs.length > 0) {
        fs[0].type = editType;
      }
    }
  },
  mounted() {
    this.$dyform_bus.$on('i18nRefresh', () => {
      this.formKey = new Date().getTime();
    });
  },
  methods: {
    init() {
      if (this.selectItem) {
        this.$nextTick(() => {
          if (this.$refs.properties && this.$refs.properties.init) {
            this.$refs.properties.init();
          }
        });

        this.groupColumns = this.initFormOptions();
        this.formColumns = this.initFormColumns();
        this.formGroupColumn = [];
      } else {
        this.groupColumns = [];
        this.formColumns = {};
        this.formGroupColumn = {};
      }
    },
    // 表单标签
    formTitle(v) {
      if (typeof v == 'function') {
        const label = v();
        return label;
      }
      return v;
    },
    initFormOptions() {
      const currentType = this.selectItem.type;
      const configs = getAllConfig(); //NgConstants.itemConfig
      if (configs && configs[currentType]) {
        const tformOptions = cloneDeep(configs[currentType].options);

        let config_ = tformOptions.config; //{ ...tformOptions.config }

        const groups = tformOptions.group;
        if (!groups || groups.length == 0) {
          return [];
        }
        const this_ = this;
        const groupColumns = [];
        groups.forEach((t) => {
          // 判断是否已经叠加到columns中
          t.config = config_;
          const prop = t.prop;
          // 判断当前整个组的prop是否有值
          if (!this_.selectItem[prop]) {
            this_.$set(this_.selectItem, prop, {});
          }

          // 如果找到新的column有默认值 当前配置中没有值 则回填
          const groupColumn = t.column;
          if (groupColumn) {
            groupColumn
              .filter((gf) => gf.default)
              .forEach((gc) => {
                // 判断column如果有默认值，但当前data没有值 则回填

                if (
                  !Object.prototype.hasOwnProperty.call(
                    this_.selectItem[prop],
                    gc.prop
                  )
                ) {
                  this_.$set(
                    this_.selectItem[prop],
                    gc.prop,
                    getLabel(gc.default)
                  );
                }
              });
          }

          groupColumns.push(t);
        });

        return groupColumns;
      }
      return [];
    },
    initFormColumns() {
      // 判断如果是自定义组件
      // 判断自定义组件
      //如果是自定义组件也要判断该自定义组件是否完全托管给ng-form来绘制属性配置
      if (this.isCustomComponent && this.selectItem) {
        // 如果没有数据 则可能是自定义组件过来的，补充
        // 标签，标签宽度，要素宽度，栅格数量，

        let label_ = this.selectItem.label;
        let labelWidth_ = this.selectItem.labelWidth;
        let width_ = this.selectItem.width;
        let span_ = this.selectItem.span;

        if (!label_) {
          label_ = this.selectItem.type;
          this.$set(this.selectItem, 'label', label_);
        }
        if (labelWidth_ == null || labelWidth_ == undefined) {
          labelWidth_ = -1;
          this.$set(this.selectItem, 'labelWidth', labelWidth_);
        }
        if (!width_) {
          width_ = '100%';
          this.$set(this.selectItem, 'width', width_);
        }
        if (!span_) {
          span_ = 24;
          this.$set(this.selectItem, 'span', span_);
        }

        //补充动态标签开关
        let dynamicLabel_ = this.selectItem.dynamicLabel;
        if (dynamicLabel_ == undefined || dynamicLabel_ == null) {
          dynamicLabel_ = false;
          this.$set(this.selectItem, 'dynamicLabel', dynamicLabel_);
        }

        let defaultCustemOptions = {
          config: {
            size: 'mini',
            labelWidth: 80
          },
          column: [
            // {
            //   label: this.$t('dyform.item.dynamicLabel'), //'标签',
            //   prop: 'dynamicLabel',
            //   type: 'switch',
            //   default: dynamicLabel_,
            //   span: 24
            // },
            {
              label: this.$t('dyform.item.label'), //'标签',
              prop: 'label',
              default: label_,
              span: 24
            },
            {
              label: this.$t('dyform.item.label_width'), //'标签宽度',
              prop: 'labelWidth',
              type: 'number',
              min: -1,
              max: 1000,
              default: labelWidth_,
              span: 24
            },
            {
              label: this.$t('dyform.item.width'), //'要素宽度',
              prop: 'width',
              default: width_,
              span: 24
            },
            {
              label: this.$t('dyform.item.span'), // '所占栅格',
              type: 'spanGroup',
              prop: 'span',
              min: 1,
              max: 24,
              default: span_,
              span: 24
            }
          ]
        };

        // 判断该自定义组件是否托管
        const customItems = getCustomConfig();

        if (
          customItems &&
          customItems[this.selectItem.type] &&
          customItems[this.selectItem.type].options &&
          customItems[this.selectItem.type].options.columns
        ) {
          // 合并数据
          const customItemsColumn =
            customItems[this.selectItem.type].options.columns;

          customItemsColumn.forEach((t) => {
            const cprop = t.prop;
            const fcolumns = defaultCustemOptions.column.filter(
              (n) => n.prop == cprop
            );
            if (!fcolumns || fcolumns.length == 0) {
              defaultCustemOptions.column.push(t);
            }
          });
        }
        return defaultCustemOptions;
      }
      //判断是否有单独的columns 不依赖分组信息
      const currentType = this.selectItem.type;
      const configs = getAllConfig(); //NgConstants.itemConfig
      if (configs && configs[currentType]) {
        const tformOptions = cloneDeep(configs[currentType].options);

        let config_ = tformOptions.config; //{ ...tformOptions.config }

        let columns = tformOptions.columns;
        const this_ = this;
        if (columns) {
          columns
            .filter((gf) => gf.default)
            .forEach((gc) => {
              // 判断column如果有默认值，但当前data没有值 则回填
              if (
                !Object.prototype.hasOwnProperty.call(this_.selectItem, gc.prop)
              ) {
                this_.$set(this_.selectItem, gc.prop, getLabel(gc.default));
              }
            });

          // 判断是否有自动标签的开关 没有则回填
          //补充动态标签开关
          // let dynamicLabel_ = this.selectItem.dynamicLabel;
          // if (dynamicLabel_ == undefined || dynamicLabel_ == null) {
          //   dynamicLabel_ = false;
          //   this.$set(this.selectItem, 'dynamicLabel', dynamicLabel_);
          // }

          // 判断columns里是否已经有了动态标签开关 ，没有的化加上
          // const ffs = columns.filter((t) => t.prop == 'dynamicLabel');
          // if (!ffs || ffs.length == 0) {
          //   columns.unshift({
          //     label: this.$t('dyform.item.dynamicLabel'), //'标签',
          //     prop: 'dynamicLabel',
          //     type: 'switch',
          //     default: dynamicLabel_,
          //     span: 24
          //   });
          // }
        }

        return { config: config_, column: columns };
      }

      return null;
    },

    /** 计算当前form是否需要显示 */
    showCollapse(form) {
      // 如果下面没有任何字段 则不显示
      if (!form.column || form.column.length == 0) return false;
      if (form.show == undefined || form.show == true) return true;
      if (typeof form.show == 'string') {
        return dynamicFun(form.show, this.selectItem);
      }
      return true;
    },
    saveHandler() {
      this.$refs.dyFormRef &&
        this.$refs.dyFormRef.validate().then((res) => {
          if (!res) return;
          this.$emit('save', this.selectItem);
        });
    },
    noEmitSave() {
      return new Promise((resolve, reject) => {
        if (!this.$refs.dyFormRef) resolve(undefined);
        this.$refs.dyFormRef
          .validate()
          .then((res) => {
            resolve(this.selectItem);
          })
          .catch((err) => {
            reject(false);
          });
      });
    }
  }
};
</script>
<style>
.item-properties-content {
  height: calc(100vh - 100px);
  overflow-y: auto;
}
.item-properties-footer {
  line-height: 45px;
  padding-left: 20px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.12);
}
.item-properties .no-data-text {
  text-align: center;
  font-size: 13px;
}

.item-properties .common-form {
  padding: 10px;
}

.item-properties .dy-form-properties-collapse {
  padding: 0 15px;
}

.item-properties .linkage-item {
  border-bottom: 1px solid #ebeef5;
}

.item-properties .linkage-item .linkage-form {
  padding: 10px;
}

.item-properties .dy-form {
  padding: 0 15px;
}
</style>
