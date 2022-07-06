import PageTools from './PageTools'
// 注册全局的导入excel组件
import UploadExcel from './UploadExcel'
// 上传组件
import ImageUpload from './ImageUpload'
// 全屏组件
import ScreenFull from './ScreenFull'
// 颜色选择组件
import ThemePicker from './ThemePicker'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('ThemePicker', ThemePicker)
  }
}
