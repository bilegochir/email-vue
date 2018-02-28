import Vue from 'vue'
import Router from 'vue-router'
import EmailApp from '@/components/EmailApp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EmailApp',
      component: EmailApp
    }
  ]
})
