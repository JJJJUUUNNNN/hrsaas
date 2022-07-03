<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :class="{disabled:fileComputed}"
      :http-request="upload"
    >
      <i class="el-icon=plus" />
    </el-upload>
    <!-- 进度条 -->
    <el-progress
      v-if="showPercent"
      style="width:180px"
      :percentage="percent"
    />
    <!-- 弹出层 -->
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
// 实例化COS 这种方法不安全！
const cos = new COS({
  SecretId: 'AKIDWs2xd3EAqGRN3TfcJlxvd6JGyQcYFhtm',
  SecretKey: 'jDRP7anlTw96nFSP7bpoX2HG0UihQt76'
})
export default {
  data() {
    return {
      fileList: [],
      showDialog: false, // 控制图片的显示或隐藏
      imgUrl: '', // 存储点击的图片地址
      currentFileUid: '', // 用一个变量，记住当前上传的图片id
      percent: 0,
      showPercent: false // 默认不显示进度条
    }
  },
  computed: {
    //   设定一个计算属性，判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
    //   这里应该弹出个层，层里是点击的图片地址
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除文件
    handleRemove(file) {
      // file是点击删除的文件
      // 将原来的文件给排除掉了，剩下的就是最新的数组了
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 添加文件 修改文件时触发
    // 因为fileList参数是当前传进来的最新参数，我们只需要将其转化成数组即可，需要转化成一个新的数组
    // [] => [...fileList][] => fileList.map()
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    // 上传之前检查
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      //   !types.some(item => item === file.type)
      if (!types.includes(file.type)) {
        //   如果不存在
        this.$message.error('上传的图片只能是JPG,GIF,BMP,PNG格式！')
        return false
      }
      //   检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      //   已经确定当前上传的就是当前的这个file了
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    // 进行上传操作
    // 自定义上传动作 有个参数 有个file对象，是我们需要上传到腾讯云服务器的内容
    upload(params) {
    //   console.log(params.file)
      if (params.file) {
        // 执行上传操作
        cos.putObject({
          Bucket: 'shenmemingzi-1312755393', // 存储桶
          Region: 'ap-guangzhou', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型 直接默认标准模式即可
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            //   此时说明文件上传成功 要获取成功的返回地址
            // fileList才能显示到上传组件上 此时我们要将fileList中的数据的url地址变成，现在上传成功的地址
            // 目前虽然是一张图片 但要注意我们的fileList是一个数组
            // 需要知道当前上传成功的是哪一张图片
            this.fileList = this.fileList.map(item => {
              // 去找谁的uid等于刚刚记录下来的id
              if (item.uid === this.currentFileUid) {
                // 将成功的地址赋值给原来的url属性
                return { url: 'http://' + data.Location, upload: true }
                // upload为true表示该图已经上传完毕
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false // 隐藏进度条
              this.percent = 0 // 进度归0
            }, 2000)
          }
        })
      }
    }
  }
}
</script>

<style>
    .disabled .el-upload--pictrue-card{
        display: none;
    }
</style>
