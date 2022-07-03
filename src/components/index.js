import PageTools from './PageTools'
// 注册全局的导入excel组件
import UploadExcel from './UploadExcel'
// 上传组件
import ImageUpload from './ImageUpload'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
  }
}
