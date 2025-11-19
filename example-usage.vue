<template>
  <div id="app">
    <h1>Dynamic Form 使用示例</h1>

    <!-- Tabs 切换设计器和构建器 -->
    <el-tabs v-model="activeTab">
      <el-tab-pane label="表单设计器" name="design">
        <dy-form-design
          ref="formDesign"
          :config="designConfig"
          @submit="handleDesignSubmit"
        />
        <div style="margin-top: 20px">
          <el-button type="primary" @click="getDesignData"
            >获取设计数据</el-button
          >
          <el-button @click="resetDesign">重置设计</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="表单构建器" name="build">
        <dy-form-build
          :form-json="formJson"
          :config="buildConfig"
          @submit="handleBuildSubmit"
        />
        <div style="margin-top: 20px">
          <el-button type="primary" @click="submitBuildForm"
            >提交表单</el-button
          >
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 如果是通过npm install安装的，可以直接引入
// import { DyFormDesign, DyFormBuild } from 'lingxi-dynamic-form'
// import 'lingxi-dynamic-form/lib/lingxi-dynamic-form.css'

export default {
  name: 'App',
  components: {
    // 如果是全局引入，可以不用在这里注册组件
    // DyFormDesign,
    // DyFormBuild
  },
  data() {
    return {
      activeTab: 'design',
      formJson: {},
      designConfig: {
        // 设计器配置
        hideModel: false, // 是否隐藏字段标识列
        hideJson: false // 是否隐藏JSON查看
      },
      buildConfig: {
        // 构建器配置
        labelWidth: '100px'
        // 可以传入全局配置
      }
    }
  },
  mounted() {
    // 可以设置默认的表单数据
    // this.formJson = { /* 从后端获取的表单配置 */ }
  },
  methods: {
    // 设计器提交事件
    handleDesignSubmit(data) {
      console.log('设计器提交数据:', data)
      this.$message.success('设计器提交成功')
    },

    // 获取设计数据
    getDesignData() {
      const data = this.$refs.formDesign.getJson()
      console.log('设计数据:', data)

      // 将设计数据传递给构建器
      this.formJson = data
      this.activeTab = 'build'

      this.$message.success('获取设计数据成功')
    },

    // 重置设计
    resetDesign() {
      this.$refs.formDesign.reset()
      this.$message.info('已重置设计器')
    },

    // 构建器提交事件
    handleBuildSubmit(data) {
      console.log('构建器提交数据:', data)
      this.$message.success('表单提交成功')
    },

    // 提交构建表单
    submitBuildForm() {
      this.$refs.formBuild.submitForm()
    }
  }
}
</script>

<style>
/* 如果是通过npm install安装的，可以引入CSS */
/* @import '~lingxi-dynamic-form/lib/lingxi-dynamic-form.css'; */

#app {
  padding: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
