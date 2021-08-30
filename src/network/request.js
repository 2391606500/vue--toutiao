import axios from 'axios'
// eslint-disable-next-line space-before-function-paren
export function request(config) {
    const instance = axios.create({
        baseURL: 'https://www.escook.cn'
    })
    instance.interceptors.request.use(config => {
        // console.log(config);
        return config
    }, err => {
        console.log(err)
        return err
    })
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        // console.log(err);
        return err
    })
    return instance(config)
}