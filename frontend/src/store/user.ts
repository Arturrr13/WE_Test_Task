import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userData } from '../../types.ts'
import { api } from '../assets/js/axiosApi.ts'
import router from "../assets/js/router.ts" 

export const useUserStore = defineStore('user', () => {
    let userData = ref<userData>()
    let errorData = ref(false)
    let loginStatus = ref(false)

    const setUserData = (data: userData) => userData.value = data
    const removeUserData = () => userData.value = undefined
    
    const getUserData = (link: string, options?: { email: string, password: string }) => {
        api.post(link, options)
        .then((res) => {
            errorData.value = false
            loginStatus.value = true
            setUserData(res.data)
            router.push('/admin')
        })
        .catch((err) => errorData.value = err)
    }

    return { userData, errorData, loginStatus, getUserData, removeUserData }
})