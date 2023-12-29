import { AboutResponse } from '@/utils/types'
import axios from 'axios'

const url = process.env.NEXT_PUBLIC_STRAPI_API || ''
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN_API || ''

export const getAbout = async (): Promise<AboutResponse[]> => {
    const headers = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }
    const about = await axios.get(`${url}/api/abouts`, headers)
    return about.data.data
}
