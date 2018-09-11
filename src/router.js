import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Galleries from './views/Galleries.vue'
import GalleryDetail from './views/GalleryDetail.vue'
import Minerals from './views/Minerals.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
        path: '/galleries',
        name: 'galleries',
        component: Galleries
    },
    {
        path: '/gallery/:id/:title',
        name: 'gallery',
        component: GalleryDetail,
        props: true
    },
    {
        path: '/minerals',
        name: 'minerals',
        component: Minerals
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
