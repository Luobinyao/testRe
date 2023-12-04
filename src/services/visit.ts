import type { MerchantListParams } from '@/types/merchantList'
import type { AddVisitParams } from '@/types/visit'
import { http } from '@/utils/http'

/**
 * 首页-获取拜访状态
 * @param handleUserld 用户ID 
 */
export const GetVisitStateAPI = (handleUserld = '') => {
    return http<MerchantListParams>({
        method: 'GET',
        url: 'visit/querySelf',
        data: {
            handleUserld
        },
    })
}

export const AddVisitAPI = (data: AddVisitParams) => {
    return http({
        method: 'POST',
        url: 'visit/savevisit',
        data,
    })
}

