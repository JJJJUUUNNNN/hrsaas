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
          <tree-tools slot-scope="{data}" :tree-node="data" @delDepts="getDepartments" />

        </el-tree>
      </el-card>

    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: { }, // 头部的数据结构
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      departs: []
    }
  },
  created() {
    this.getDepartments() // 调用自身方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人' }
      // this.departs = result.depts // 需要将其转化为树形结构
      // 这里定义一个空串，因为，他是根 所有的子节点的数据都是“”
      this.departs = tranListToTreeData(result.depts, '')
      console.log(result)
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
