import { createRouter, createWebHistory } from 'vue-router'
import { get_storage_for_token } from '@/utils/storage'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if(!get_storage_for_token() && to.path !== '/login'){
    next('/login')
  }else{
    next()
  }
})
export default router
