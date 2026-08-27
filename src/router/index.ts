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

// Auto-reload if a dynamic chunk fails to load due to a new deployment
router.onError((error, to) => {
    if (
        error.message?.includes('Failed to fetch dynamically imported module') ||
        error.message?.includes('Importing a module script failed') ||
        error.message?.includes('error loading dynamically imported module')
    ) {
        window.location.assign(to.fullPath)
    }
})

export default router

