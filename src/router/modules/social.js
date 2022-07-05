import Layout from '@/layout'

export default {
  path: '/social',
  component: Layout,
  name: 'social',

  children: [{
    path: '',
    component: () => import('@/views/social'),

    meta: {
      title: '社保管理',
      icon: 'table'
    }
  }]
}
