import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import ('@/IndexView.vue'),
    children:[
      {
        path:'/home',
        name:'home',
        component:()=>import ('@/views/Home/HomeView.vue')
      },
      {
        path:'/shop/:page',
        name:'shop',
        component:()=>import ('@/views/Shop/ShopView.vue')
      },
      {
        path:'/product/:key',
        name:'product',
        component:()=>import ('@/views/Product/ProductView.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
