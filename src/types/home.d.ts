import type { GoodsItem } from './global'

/** 登录-用户信息类型-获取数据类型 */
export type UserItem = {
  /** id */
  objectId: string
  /** 用户名称 */
  userName: string
  /** 部门名称 */
  deptName: string
  /** 部门id */
  deptId: string
  /** token */
  token: string
}

/** 登录-获取用户信息-请求数据类型 */
export type LoginParams = {
  /** 用户手机号 */
  loginId: string
  /** 用户密码 */
  password: string
}

/** 猜你喜欢-商品类型 */
export type GuessItem = GoodsItem
