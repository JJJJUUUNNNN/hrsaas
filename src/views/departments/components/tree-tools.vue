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
          <el-dropdown>
            <span>
              操作
              <i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
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
  }
}
</script>

<style>

</style>
