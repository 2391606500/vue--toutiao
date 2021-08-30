/* eslint-disable space-before-function-paren */
import { request } from '@/network/request.js'
export function articlesAPI(_page, _limit) {
    return request({
        url: '/articles',
        params: {
            _page,
            _limit
        }
    })
}