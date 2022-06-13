<template>
  <div class="dashboard-container">
    <div class="app-container">

      <!--组织架构的内容-->
      <el-card class="tree-card">
        <!-- 头部 -->
        <tree-tools :tree-node="company" :is-root="true" />

        <!-- 树形结构 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 作用域插槽 slot-scope："obj" -->
          <!-- 传入内容 插槽内容 有几个结点，就循环几次 data:每个节点的数据对象-->
          <tree-tools slot-scope="{data}" :tree-node="data" />

        </el-tree>
      </el-card>

    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'

export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: { name: '玛卡巴卡科技股份有限公司', manager: '负责人' },
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }]
    }
  }
}
</script>

<style scoped>
  .tree-card {
    padding: 30px  140px;
    font-size:14px;
  }
</style>
