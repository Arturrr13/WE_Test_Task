import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '../../store/user'


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach( async (to) => {
    const store = useUserStore()
    console.log(store.loginStatus)
    if(!store.loginStatus && to.fullPath !== '/login') router.push('/login')
})

export default router