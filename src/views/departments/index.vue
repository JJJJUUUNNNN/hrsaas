<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 头部结构-->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <!-- 左 -->
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <!-- 右 -->
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单 element -->
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!-- 树形结构 -->
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <el-row
            slot-scope="{data}"
            type="flex"
            justify="space-between"
            align="middle"
            style="height: 40px; width:100%"
          >
            <!-- 左 -->
            <el-col>
              <span>{{ data.name }}</span>
            </el-col>
            <!-- 右 -->
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两个内容 -->
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!-- 下拉菜单 element -->
                  <el-dropdown>
                    <span>
                      操作
                      <i class="el-icon-arrow-down" />
                    </span>
                    <!-- 下拉菜单  具名插槽-->
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>

          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      departs: [
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
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
