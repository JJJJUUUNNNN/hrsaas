<template>
  <div class="dashboard-container">
    <div class="app-container">

      <!--组织架构的内容-->
      <el-card class="tree-card">
        <!-- 头部 -->
        <el-row type="flex" justify="space-between" align="middle" style="height:40px;">
          <!-- 左 -->
          <el-col>
            <span>玛卡巴卡科技股份有限公司</span>
          </el-col>
          <!-- 右 -->
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <!-- 下拉菜单 -->
              <el-col>
                <el-dropdown>
                  <span>
                    操作
                    <i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!-- 树形结构 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 作用域插槽 slot-scope："obj" -->
          <!-- 传入内容 插槽内容 有几个结点，就循环几次 data:每个节点的数据对象-->
          <el-row slot-scope="{data}" type="flex" justify="space-between" align="middle" style="height:40px; width:100%">
            <!-- 左 -->
            <el-col>
              <span>{{ data.name }}</span>
            </el-col>
            <!-- 右 -->
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-col>{{ data.manager }}</el-col>
                <!-- 下拉菜单 -->
                <el-col>
                  <el-dropdown>
                    <span>
                      操作
                      <i class="el-icon-arrow-down" />
                    </span>
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
