import axios from 'axios'
const useAxios = axios.create({
    baseURL: 'http://localhost:8089',
    headers: {
        'Content-Type': 'application/json',
    },
});

useAxios.interceptors.request.use((res)=>{
    // if (localStorage.getItem('token')) {
    //     res.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    // }
    return res;
}, (error) => {
    console.log(error)
    return Promise.reject(error);
})

// 响应拦截器
useAxios.interceptors.response.use((res) => {
    return res;
}, (error) => {
    return Promise.reject(error);
})

export default useAxios;