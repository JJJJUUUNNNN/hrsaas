<script>
export default {
  name: 'MenuItem',
  functional: true, // 函数式组件，只用于接收props
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },

  // render函数 可以返回一个结构体 用于渲染组件
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
