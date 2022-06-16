import request from '@/utils/request'

// 读取角色信息 params是查询参数，里面需要携带分页信息
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 读取公司信息
export function getComanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

// 删除角色
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
