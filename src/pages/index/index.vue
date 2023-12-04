<script setup lang="ts">
import type { UserItem } from '@/types/home'
import { GetVisitStateAPI } from '@/services/visit'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const addMerchantBtnClick = () => {
  uni.navigateTo({
    url: '/pages/addMerchant/addMerchant'
  })
}

const myMerchantBtnClick = () => {
  uni.setStorageSync('param', userIfno.value.objectId);
  uni.setStorageSync('show', false);
  uni.navigateTo({
    url: '/pages/myMerchant/myMerchant'
  })
}

const addVisitBtnClick = async () => {
  const res = await GetVisitStateAPI(userIfno.value.objectId)
  console.log(res.result);
  if (res.result == null) {
    uni.setStorageSync('param', userIfno.value.objectId);
    uni.setStorageSync('show', true);
    uni.navigateTo({
      url: '/pages/myMerchant/myMerchant'
    })
  }
  else {

  }
}

// 获取用户数据
const userIfno = ref<UserItem>({} as UserItem)

onLoad(async () => {
  const query = uni.getStorageSync('param');
  console.log(query)
  userIfno.value = query
  console.log(userIfno.value);
})

</script>

<template>
  <view class="container">
    <image class="image" src="@/static/images/indexTop.png" mode="widthFix"></image>
    <view class="overlay">
      <text class="text">中泰盛世康养经营管理</text>
    </view>
    <view class="redView"></view>
    <view class="greenView">
      <text class="hello-text">你好，王双双！</text>
      <view class="name-view">
        <text class="name-text">{{ userIfno.userName }}</text>
        <text class="department-text">{{ userIfno.deptName }}</text>
      </view>
      <image class="user-image" src="@/static/images/userImage.png" mode="scaleToFill" />
    </view>
    <view class="addMerchant-view">
      <button class="addMerchant-btn" hover-class="none" @click="addMerchantBtnClick"></button>
      <button class="sumbit-btn" @click="myMerchantBtnClick">我的商户</button>
    </view>
    <view class="addVisit-view">
      <button class="addVisit-btn" @click='addVisitBtnClick' hover-class="none"></button>
      <button class="sumbit-btn">拜访记录</button>
    </view>
  </view>
</template>

<style scoped>
.container {
  position: relative;
}

.image {
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 123rpx;
  left: 39rpx;
  width: 100%;
  height: 100%;
  display: flex;
}

.text {
  font-size: 32rpx;
  color: white;
  font-weight: bold;
  font-family: 'Microsoft YaHei';
}

.greenView {
  position: absolute;
  top: 238rpx;
  left: 39rpx;
  width: calc(100% - 78rpx);
  height: 333rpx;
  background: #FFFFFF;
  border-radius: 4rpx 4rpx 4rpx 4rpx;
  opacity: 1;
}

.addMerchant-view {
  position: absolute;
  top: 610rpx;
  left: 39rpx;
  width: calc(100% - 78rpx);
  height: 315rpx;
  background: #FFFFFF;
  border-radius: 4rpx 4rpx 4rpx 4rpx;
  opacity: 1;
}

.sumbit-btn {
  position: absolute;
  top: 235rpx;
  left: 23rpx;
  right: 23rpx;
  bottom: 38rpx;
  width: 592rpx;
  height: 65rpx;
  background: #2496FF;
  border-radius: 8rpx 8rpx 8rpx 8rpx;
  opacity: 1;
  font-size: 27rpx;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 32rpx;
  justify-content: center;
  align-items: center;
  display: flex;
}

.addMerchant-btn {
  position: absolute;
  background-image: url(@/static/images/addMerchant.png);
  top: 23rpx;
  left: 23rpx;
  right: 23rpx;
  width: 592rpx;
  height: 185rpx;
}

.addVisit-btn {
  position: absolute;
  mask-mode: widthFix;
  background-image: url(@/static/images/addVisit.png);
  top: 23rpx;
  left: 23rpx;
  right: 23rpx;
  width: 592rpx;
  height: 185rpx;
}

.addVisit-view {
  position: absolute;
  top: 964rpx;
  left: 39rpx;
  width: calc(100% - 78rpx);
  height: 315rpx;
  background: #FFFFFF;
  border-radius: 4rpx 4rpx 4rpx 4rpx;
  opacity: 1;
}

.redView {
  position: absolute;
  top: 481rpx;
  left: 0;
  width: 100%;
  height: calc(100vh - 481rpx);
  background: #F6F6F6;
}

.hello-text {
  position: relative;
  top: 15rpx;
  padding-left: 23rpx;
  width: 113rpx;
  height: 38rpx;
  font-size: 19rpx;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 38rpx;
}

.name-view {
  position: absolute;
  top: 90rpx;
  left: 23rpx;
  width: calc(100% - 46rpx);
  height: 204rpx;
  background: #EDF7FF;
  border-radius: 4rpx 4rpx 4rpx 4rpx;
  opacity: 1;
}

.name-text {
  position: absolute;
  top: 16rpx;
  left: 166rpx;
  width: 140rpx;
  height: 38rpx;
  font-size: 31rpx;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  line-height: 38rpx;
}

.department-text {
  position: absolute;
  top: 62rpx;
  left: 166rpx;
  width: 100rpx;
  height: 38rpx;
  font-size: 25rpx;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #666666;
  line-height: 38rpx;
}

.user-image {
  position: absolute;
  top: 62rpx;
  left: 46rpx;
  width: 120rpx;
  height: 120rpx;
}
</style>
