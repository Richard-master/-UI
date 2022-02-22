import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login/Login'

//解决路由点击重复
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originPush.call(this,location).catch(err=>err)
}


Vue.use(VueRouter)

//配置路由，（这是基础，不多说了）
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    //子组件
    children:[
      {
        path:'/home',
        name:'home',
        //配置懒加载（在显示的时候再调用组件）
        component:()=>import('@/views/Home/Home')
      },
      {
        path:'/user',
        name:'user',
        component:()=>import('@/views/User/User')
      },
      {
        path:'/mall',
        name:'mall',
        component:()=>import('@/views/Mall/Mall')
      },
      {
        path:'/order',
        name:'order',
        component:()=>import('@/views/Order/Order')
      },
      {
        path:'/swiper',
        name:'swiper',
        component:()=>import('@/views/Other/Swiper'),
      },{
        path:'/feedback',
        name:'feedback',
        component:()=>import('@/views/Other/Feedback'),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
