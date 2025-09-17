import type { IParams } from "@/interface";
import type { AxiosRequestConfig } from "axios";

export const api = {
    assets: {
        // 获取验证码
        getListAllAssets: (params?: IParams): AxiosRequestConfig => ({ params, method: 'GET', url: '/v1/api/assets' }),
    },
}