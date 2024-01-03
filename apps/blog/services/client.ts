import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'

const url = process.env.NEXT_PUBLIC_STRAPI_API || ''
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN_API || ''

const conf: AxiosRequestConfig = {
    baseURL: url,
}

export const client: AxiosInstance = axios.create(conf)

export const requestInterceptor = client.interceptors.request.use(
    (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
        // if(config.baseURL?.includes(url)){
        config.headers['Authorization'] = 'Bearer ' + token
        config.withCredentials = true
        // }
        return config
    },
    (err: AxiosError): Promise<AxiosError> => {
        return Promise.reject(err)
    }
)
