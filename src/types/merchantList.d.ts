/** 添加商户-商户信息类型 */
export type MerchantListParams = {
    objectId: string,
    storeName: string,
    firstProfession: string,
    secondProfession: string,
    linkMan: string,
    phone: string,
    address: string,
    image: string,
    pageX: string,
    pageY: string,
    handleUserName: string,
    status: string
    visit: string
    visitTime: string
}

/** 更新商户-商户信息类型 */
export type UpdataMerchantParams = {
    storeId: string,
    status: string,
}