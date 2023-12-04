import type { UserItem, LoginParams } from '@/types/home'
import { http } from '@/utils/http'

/**
 * 首页-获取用户信息
 * @param phone 
 */
export const LoginUserInfoAPI = (data: LoginParams) => {
  return http<UserItem>({
    method: 'POST',
    url: 'user/login',
    data,
  })
}
