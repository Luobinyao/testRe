/** 添加商户-商户信息类型 */
export type AddMerchantParams = {
    /** 商户名称 */
    storeName: string
    /** 商户联系人 */
    linkMan: string
    /** 商户电话 */
    phone: string
    /** 商户状态 */
    status: string
    /** 商户地址 */
    address: string
    /** 商户图片地址 */
    image: string
    /** 商户一级分类 */
    firstProfession: string
    /** 商户二级分类 */
    secondProfession: string
    /** 维度 */
    pageX: string
    /** 经度 */
    pageY: string
}
