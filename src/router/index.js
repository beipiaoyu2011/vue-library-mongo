import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/login'], resolve),
      linkActiveClass: 'active'
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/pages/register'], resolve),
      linkActiveClass: 'active'
    },
    
  ]
})
