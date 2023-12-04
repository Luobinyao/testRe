<template>
    <view class="searchbar-view">
        <uni-search-bar @confirm="" :focus="true" @blur="" @focus="" @input="" @cancel="" @clear="" clearButton="auto"
            cancelButton="none">
        </uni-search-bar>
        <button class="search-btn">搜索</button>
    </view>
    <view class="pickViewContainer">
        <picker class='pick-view' @change="" :value="index" :range="array">
            <view class="uni-input">{{ array[index] }}</view>
        </picker>
        <picker class='pick-view' @change="" :value="index" :range="array">
            <view class="uni-input">{{ array[index] }}</view>
        </picker>
        <picker class='pick-view' @change="" :value="index" :range="array">
            <view class="uni-input">{{ array[index] }}</view>
        </picker>
    </view>
    <view class="listView">
        <view v-for="( item, index ) in  merchantIfno " :key="index" class="item">
            <view class="imageContainer">
                <image :src="item.image" alt="item image" class="image" />
            </view>
            <view class="textContainer">
                <text class="name-text">{{ item.storeName }}</text>
                <text class="small-text">一级分类:{{ item.firstProfession }}</text>
                <text class="small-text">二级分类:{{ item.secondProfession }}</text>
                <text class="small-text">联系人姓名:{{ item.linkMan }}</text>
                <text class="small-text">联系人电话:{{ item.phone }}</text>
                <text class="small-text">商户状态:{{ item.status }}</text>
            </view>
        </view>
    </view>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { GetMerchantListAPI } from '@/services/merchantList'
import type { MerchantListParams } from '@/types/merchantList'

const array = ['中国', '美国', '巴西', '日本'];
const index = ref(0);

// 获取用户数据
const merchantIfno = ref<MerchantListParams[]>([])

const getMerchantData = async () => {
    console.log("进来了")
    const res = await GetMerchantListAPI("1", "5")
    merchantIfno.value = res.result
    console.log(merchantIfno.value)
}

onLoad(async () => {
    getMerchantData()
})


</script>
  
<style scoped>
.pickViewContainer {
    display: flex;
    justify-content: space-evenly;
}

.pick-view {
    width: 33%;
    height: 71rpx;
    justify-content: center;
    align-items: center;
    display: flex;
}

.searchbar-view {
    width: 600rpx;
}

.search-btn {
    position: absolute;
    top: 19rpx;
    left: 600rpx;
    width: 148rpx;
    height: 66rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25rpx;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    line-height: 29rpx;
    background-color: #fff;
}

.listView {
    background-color: #f5f5f5;
    padding-left: 31rpx;
    padding-right: 31rpx;
    padding-top: 23rpx;
    padding-bottom: 10rpx;
}

.item {
    display: flex;
    align-items: center;
    padding: 16rpx;
    background-color: #fff;
    border-radius: 8rpx;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
    margin-bottom: 16rpx;
}

.imageContainer {
    width: 180rpx;
    height: 180rpx;
    border-radius: 8rpx;
    overflow: hidden;
    margin-right: 16rpx;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.textContainer {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
}

.small-text {
    width: 300rpx;
    height: 31rpx;
    font-size: 23rpx;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    line-height: 27rpx;
}

.name-text {
    width: 300rpx;
    height: 35rpx;
    font-size: 27rpx;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    line-height: 32rpx;
}

.text {
    margin-bottom: 8rpx;
    font-size: 30rpx;
    color: #333;
}

.selectViewContainer {
    display: flex;
}

.selectContainer {
    width: 33.3%;
}
</style>