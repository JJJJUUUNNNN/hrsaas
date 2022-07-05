const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.userInfo.username,
  // 建立用户名称的映射
  userId: state => state.user.userInfo.userId,
  staffphoto: state => state.user.userInfo.staffPhoto,
  // 建立用户的公司id映射
  companyId: state => state.user.userInfo.companyId,
  // 导出当前的路由
  routes: state => state.permission.routes
}
export default getters
