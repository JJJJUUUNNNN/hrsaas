import request from '@/utils/request'

// 获取组织架构数据
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除部门 接口
// 根据id获取部门 接口是根据restful的规则设计的
// 删除delete 新增post 修改put 获取get
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
