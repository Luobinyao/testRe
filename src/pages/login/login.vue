<script setup lang="ts">
import { LoginUserInfoAPI } from '@/services/home'
import type { UserItem, LoginParams } from '@/types/home'
import { ref } from 'vue'
import { useMemberStore } from '@/stores/modules/member'
import { onLoad } from '@dcloudio/uni-app'

const userIfno = ref<UserItem>({} as UserItem)

const login = async () => {
    const data: LoginParams = {
        loginId: '123456',
        password: '000000'
    };
    console.log(data)
    const res = await LoginUserInfoAPI(data)
    userIfno.value = res.result
    console.log(res.result)
    const memberStore = useMemberStore()
    memberStore.setProfile(userIfno.value)
}


const loginBtnClick = async () => {
    await login()
    uni.setStorageSync('param', userIfno.value);
    uni.switchTab({
        url: '/pages/index/index'
    })
}

</script>

<template>
    <view class="container">
        <text class="title-text">账号登录</text>
        <button class="button" @click="loginBtnClick">登录测试</button>
    </view>
</template>

<style scoped>
.button {
    position: absolute;
    top: 50rpx;
    left: 50rpx;
    width: 154rpx;
    height: 50rpx;
    background-color: red;
}

.container {
    position: relative;
    background: #F6F6F6;
    width: 100vh;
    height: 100vh;
}

.title-text {
    position: absolute;
    top: 346rpx;
    left: 77rpx;
    right: 519rpx;
    width: 154rpx;
    height: 50rpx;
    font-size: 38rpx;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    line-height: 45rpx;
}
</style>
