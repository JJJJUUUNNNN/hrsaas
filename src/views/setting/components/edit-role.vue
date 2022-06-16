<template>
  <el-dialog
    title="编辑弹层"
    :visible="showDialog"
    @close="btnCancel"
  >
    <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roleForm.description" />
      </el-form-item>
    </el-form>

    <!-- 底部 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { updateRole } from '@/api/setting'
export default {
  data() {
    return {
      showDialog: false,
      roleForm: {},
      rules: {
        name: [{ required: true, message: '角色名字不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async btnOK() {
      try {
        await this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          // 新增角色
        }
        this.$parent.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.showDialog = false
    }
  }
}
</script>

<style>

</style>
