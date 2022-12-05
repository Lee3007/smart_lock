import axios from 'axios'

export function getAxiosClient(){
    return axios.create({
        baseURL: 'http://143.198.136.139:8000/v1'
    })
}