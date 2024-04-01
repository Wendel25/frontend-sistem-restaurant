import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

import { AuthTokenError } from './errors/AuthTokenError';
import { ErrorServer } from './errors/ErrorServer';

import { signOut } from '@/contexts/AuthContext';

export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            Authorization: `Bearer ${cookies['@token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response.status === 401) {
            if (typeof window !== undefined) {
                signOut();
            } else {
                return Promise.reject(new AuthTokenError());
            }
        } else if (error.response.status === 500) {
            return Promise.reject(new ErrorServer());
        }

        return Promise.reject(error)
    })

    return api;
}