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
      {
        path:'/cart',
        name:'cart',
        component:()=>import ('@/views/Cart/CartView.vue')
      },
      {
        path:'/wishlist',
        name:'wishlist',
        component:()=>import ('@/views/Wishlist/WishlistView.vue')
      },
      {
        path:'/payment',
        name:'payment',
        component:()=>import ('@/views/Payment/PaymentView.vue')
      },
      {
        path:'/account',
        name:'account',
        component:()=>import ('@/views/Account/AccountView.vue')
      },
      {
        path:'/manage',
        name:'manage',
        component:()=>import ('@/views/Manage/ManageView.vue')
      },
    ]
  },
  {
    path: "*",
    name: "error",
    component: () => import('../ErrorView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
