import { http } from '@/utils/http'
import type { MerchantListParams, UpdataMerchantParams } from '@/types/merchantList'

/**
 * 获取商户列表
 * @param current 分页
 * @param size 条数
 */
export const GetMerchantListAPI = (current = '', size = '') => {
    return http<MerchantListParams[]>({
        method: 'GET',
        url: 'store/pageQueryStoreSm',
        data: {
            current,
            size,
        },
    })
}

/**
 * 根据用户id获取商户列表
 * @param current 分页
 * @param size 条数
 * @param handlerUserId 用户id
 */
export const GetMerchantListForUserIdAPI = (handlerUserId = '', current = '', size = '') => {
    return http<MerchantListParams[]>({
        method: 'GET',
        url: 'store/pageQueryStoreSm',
        data: {
            current,
            size,
            handlerUserId
        },
    })
}

/**
 * 根据商户id更新商户状态
 * @param storeId 商户ID
 * @param status 状态
 */
export const GetUpdataMerchantAPI = (storeId = '', status = '') => {
    return http<MerchantListParams>({
        method: 'GET',
        url: 'store/updateStatus',
        data: {
            storeId,
            status
        },
    })
}