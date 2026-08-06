import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/projects/:slug',
            name: 'project',
            component: () => import('@/pages/ProjectPage.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            redirect: '/',
        },
    ],
    scrollBehavior(to, _from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 80,
            }
        }
        return { top: 0, behavior: 'smooth' }
    },
})

export default router
