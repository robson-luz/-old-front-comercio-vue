import axios from 'axios';
import { authHeader } from '@/helpers/auth-header.js';

const apiRequest = axios.create({
    baseURL: 'http://localhost:64054',
    json: true,
    // timeout: 10000,
    params: {} 
});

export default {
    interceptors() {
        return apiRequest.interceptors ;
    },
    async post(url, data) {
        return apiRequest({
            method : 'post',
            url,
            data,
            headers: { 'Authorization': authHeader() }
        }).then(req => {
            return req.data
        })
    },
    async get(url) {
        return apiRequest({
            method : 'get',
            url,
            headers: { 'Authorization': authHeader() }
        }).then(req => {
            return req
        })
    },
    async upload(url, data) {
        if (!(data instanceof FormData)) {
            console.error("Data deve ser uma instância de FormData.");
        }

        return apiRequest({
            method : 'post',
            url,
            data,
            headers: { 
                'Authorization': authHeader()
            }
        }).then(req => {
            return req.data
        })
    }
}