<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px; width:100%">
    <!-- 左 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <!-- 下拉菜单 -->
        <el-col>
          <!-- dropdown下拉菜单的监听事件：command -->
          <el-dropdown @command="operateDepts">
            <span>
              操作
              <i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    // 定义一个传入的属性
    treeNode: {
      required: true, // 要求对方使用组件使必填treeNode
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    operateDepts(type) {
      if (type === 'add') {
        // 添加子部门
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑部门
        this.$emit('editDepts', this.treeNode)
      } else {
        // 删除操作
        this.$confirm('确定要删除该部门吗？').then(() => {
          // 如果点击确认就会进入then
          return delDepartments(this.treeNode.id)// 返回promise对象
        }).then(() => {
          // 删除成功后。。。
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>

<style>

</style>
