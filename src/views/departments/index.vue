<template>
  <div class="dashboard-container">

    <div class="app-container">
      <!--组织架构的内容-->
      <el-card class="tree-card">
        <!-- 头部 -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />

        <!-- 树形结构 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 作用域插槽 slot-scope："obj" -->
          <!-- 传入内容 插槽内容 有几个结点，就循环几次 data:每个节点的数据对象-->
          <tree-tools
            slot-scope="{data}"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          />

        </el-tree>
      </el-card>
    </div>

    <!-- 放置新增弹出层组件 -->
    <add-dept
      ref="addDept"
      :show-dialog.sync="showDialog"
      :tree-node="node"
      @addDepts="getDepartments"
    />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      showDialog: false,
      company: { }, // 头部的数据结构
      defaultProps: {
        label: 'name', // 表示 从这个属性显示内容
        node: null // 记录当前点击的node结点
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
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      // this.departs = result.depts // 需要将其转化为树形结构
      // 这里定义一个空串，因为，他是根 所有的子节点的数据都是“”
      this.departs = tranListToTreeData(result.depts, '')
      console.log(result)
    },
    // node是指我们当前点击的部门
    addDepts(node) {
      this.showDialog = true // 显示弹出层
      this.node = node
    },
    // 点击编辑触发的父组件的方法
    editDepts(node) {
      this.showDialog = true
      this.node = node // 存储传递过来的node数据
      // 我们需要在这个位置调用子组件的方法
      // 我们并不是直接在父组件中调用接口，而是父组件中调用子组件的方法，方法中调用接口
      // 父组件 调用子组件的方法
      this.$refs.addDept.getDepartDetail(node.id)
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
