import axios from 'axios'

const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): undefined

const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

client.interceptors.request.use(config =>{
    config.headers = config.headers??{}
    config.headers['Content-Type'] = 'application/json'
    config.headers['timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (token?.tokens?.access){
        config.headers['Authorization'] = `Bearer ${token?.tokens?.access}`
    }
    return config
})

export const getStories = async () => {
    return client.get('/content/story/')
}

export const getPosts = async () => {
    return client.get("/content/post/")
}

export const updateLike = (postId, status) => {
    return client.put('/content/post/like/', {postId, status})
}

export const updateSave = (postId, status) => {
    return client.put('/content/post/save/', {postId, status})
}

export const getSuggestedAccounts = async () => {
    return client.get('/content/suggested-accounts/')
}

export const getPreviouslyChat = async () => {
    return client.get('/content/previously-chat/')
}

export const fetchMessages = async (room) => {
    return client.get('/content/fetch-messages/', { params: { room } })
}