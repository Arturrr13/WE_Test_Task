import axios from 'axios'

//const URL = 'http://localhost:5000' // for dev mode
//const URL = 'https://fullstackapp-test.onrender.com' // for dev renderer.com or just remove baseURL

export const api = axios.create({
    withCredentials: true,
    //baseURL: 'http://localhost:5000'
})