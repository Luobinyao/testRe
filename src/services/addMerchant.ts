import { http } from '@/utils/http'
import type { AddMerchantParams } from '@/types/addMerchant'

/**
 * 商户-添加
 * @param data 
 */
export const AddMerchantAPI = (data: AddMerchantParams) => {
    return http({
        method: 'POST',
        url: 'store/addStore',
        data,
    })
}
/**
 * 商户-添加照片
 * @param data 
 */
export const AddMerchantFhotoAPI = (data: AddMerchantParams) => {
    return http({
        method: 'POST',
        url: 'store/addStore',
        data,
    })
}