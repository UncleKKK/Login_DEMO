import axios from 'axios'
import qs from 'qs'
import { get_storage_for_token } from '@/utils/storage'
axios.defaults.baseURL = 'http://192.168.0.1:8000/api'

export const reqeust_manger_post = (path, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(path, params,{
            headers: {
                'content-type': 'application/json'
            }})
            .then(res => {
                res = res.data
                if(0 === res.code){
                    resolve(res.data)
                }else{
                    reject(res.msg)
                }
            })
            .catch(err => reject(err))
    })
}

export const reqeust_manger_post_with_token = (path, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(path, params,{
            headers: {
                'content-type': 'application/json',
                'x-token':get_storage_for_token()
            }})
            .then(res => {
                res = res.data
                if(0 === res.code){
                    resolve(res.data)
                }else{
                    reject(res.msg)
                }
            })
            .catch(err => reject(err))
    })
}

export const request_manger_get = (path, params) =>{
    return new  Promise((resolve ,reject) =>{
        let _path = params.id ? `${path}/${params.id}` : path
        axios.get(_path,{
            headers: {
                'content-type': 'application/json',
                'x-token':get_storage_for_token()
            }})
            .then(res =>{
                res = res.data
                if (0 === res.code){
                    resolve(res.data)
                }else{
                    reject(res.msg)
                }
            })
            .catch(error => reject(error))
    })
}
