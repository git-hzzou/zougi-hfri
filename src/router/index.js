import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('views/home'),
    },
    {
        path: '/item',
        component: () => import('views/item')
    },
    {
        path: '/score',
        component: () => import('views/score')
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})
export default router