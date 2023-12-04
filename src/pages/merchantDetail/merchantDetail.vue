<script setup lang="ts">
import { ref } from 'vue';
import { GetUpdataMerchantAPI } from '@/services/merchantList'
import type { AddVisitParams } from '@/types/visit'
import { AddVisitAPI } from '@/services/visit'
import { onLoad } from '@dcloudio/uni-app'
import type { UpdataMerchantParams } from '@/types/merchantList'

const array = ['无意向', '意向中', '已上线'];
const index = ref(0);
const photoTaken = ref(false);
const photoUrl = ref('');
const idValue = ref('');
const nameValue = ref('');
const userValue = ref('');
const numberValue = ref('');
const stateValue = ref('');
const ifDetail = ref(true);
const btnText = ref('');
const param = ref<UpdataMerchantParams>;

function bindPickerChange(e: any) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    index.value = e.detail.value;
}

function change(e: any) {
    console.log("e:", e);
}

function takePhoto() {
    uni.chooseImage({
        count: 1, // 仅选择一张照片
        success: (res: any) => {
            // 获取照片的临时路径
            const tempFilePath = res.tempFilePaths[0];
            uni.getFileSystemManager().readFile({
                filePath: tempFilePath,
                encoding: 'base64',
                success: (res: any) => {
                    // 将 Base64 数据作为图片的源
                    photoUrl.value = 'data:image/png;base64,' + res.data;
                    photoTaken.value = true; // 将标记设置为已拍照
                    uni.uploadFile({
                        url: 'http://192.168.18.21:8080/smallprogram/file/upload', // 替换为实际的上传地址
                        filePath: tempFilePath,
                        name: 'file',
                        success: (res) => {
                            uni.showToast({
                                title: '上传成功',
                                icon: 'success'
                            })
                        },
                        fail: (err) => {
                            uni.showToast({
                                title: '上传失败',
                                icon: 'none'
                            })
                        }
                    })
                    console.log(photoUrl.value);
                }
            });
        }
    });
}

const upData = async () => {
    if (ifDetail.value) {
        if (index.value = 0) {
            stateValue.value = '无意向'
        }
        else if (index.value = 1) {
            stateValue.value = '意向中'
        }
        else {
            stateValue.value = '已上线'
        }
        const res = await GetUpdataMerchantAPI(idValue.value, stateValue.value)
        console.log(res.result)
    }
    //新增拜访
    else {
        const data: AddVisitParams = {
            storeId: idValue.value,
            storeName: nameValue.value,
            visitState: '拜访中',
            image: '1111',
            description: '1111'
        };
        const res = await AddVisitAPI(data)
        console.log(res.msg)
        uni.navigateBack({ delta: 1 })
    }
}


onLoad(async () => {
    const query = uni.getStorageSync('selectedCell');
    console.log(query)
    nameValue.value = query.storeName;
    userValue.value = query.linkMan;
    numberValue.value = query.phone;
    idValue.value = query.objectId;
    if (query.status == '无意向') {
        index.value = 0
    }
    else if (query.status == '意向中') {
        index.value = 1
    }
    else {
        index.value = 2
    }
    ifDetail.value = uni.getStorageSync('ifDetail');
    console.log(ifDetail.value);
    if (ifDetail.value) {
        uni.setNavigationBarTitle({
            title: '商户详情' // 使用响应式变量作为标题
        })
        btnText.value = '更新商户'
    }
    else {
        uni.setNavigationBarTitle({
            title: '添加拜访' // 使用响应式变量作为标题
        })
        btnText.value = '新增拜访'
    }
})

</script>

<template>
    <view class="container">
        <view class="bg-view">
            <text class="class-test">一级分类</text>
            <picker class='pick-view' @change="bindPickerChange" :value="index" :range="array">
                <view class="uni-input">{{ array[index] }}</view>
            </picker>
            <text class="classTwo-test">二级分类</text>
            <picker class='pickTwo-view' @change="bindPickerChange" :value="index" :range="array">
                <view class="uni-input">{{ array[index] }}</view>
            </picker>
            <view class="info-view">
                <view class="text-group">
                    <text class="info-title">商户名称：</text>
                    <text class="info-title">联系人：</text>
                    <text class="info-title">联系电话：</text>
                    <text class="info-title">商户意向：</text>
                    <text class="info-title">商户地址：</text>
                    <text class="info-title">商户图片：</text>
                </view>
                <view class="value-group">
                    <text class="info-value">{{ nameValue }}</text>
                    <text class="info-value">{{ userValue }}</text>
                    <text class="info-value">{{ numberValue }}</text>
                    <picker class='info-value' @change="bindPickerChange" :value="index" :range="array">
                        <view class="uni-input">{{ array[index] }}</view>
                    </picker>
                    <button class="info-value"></button>
                </view>
                <image class="fhoto-btn" v-if="!photoTaken" @click="takePhoto" mode="scaleToFill"></image>
                <image class="fhoto-btn" v-else :src="photoUrl" mode="scaleToFill"></image>
            </view>
            <button class="submit-btn" @click="upData">{{ btnText }}</button>
        </view>
    </view>
</template>
  
<style scoped lang="scss">
.submit-btn {
    position: absolute;
    bottom: 75rpx;
    left: 31rpx;
    width: 688rpx;
    height: 77rpx;
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

.fhoto-btn {
    position: absolute;
    top: 465rpx;
    left: 156rpx;
    background-image: url(@/static/images/addImageBtn.png);
    height: 226rpx;
    width: 226rpx;
}

.value-group {
    position: absolute;
    top: 23rpx;
    left: 156rpx;
    width: 495rpx;
    height: 419rpx;
    display: flex;
    flex-direction: column;
}

.info-value {
    flex: 1;
    height: 65rpx;
    margin-bottom: 23rpx;
    width: 494rpx;
    align-items: center;
    display: flex;
    border: 1rpx solid #CCCCCC;
}

.text-group {
    position: absolute;
    top: 39rpx;
    left: 23rpx;
    width: 125rpx;
    display: flex;
    flex-direction: column;
    height: 476rpx;
}

.info-title {
    flex: 1;
    height: 33rpx;
    margin-bottom: 56rpx;
    width: 125rpx;
    font-size: 25rpx;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    line-height: 29rpx;
}

.container {
    position: relative;
}

.bg-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vh;
    height: 100vh;
    background: #F6F6F6;
}

.class-test {
    position: absolute;
    top: 39rpx;
    left: 39rpx;
    width: 131rpx;
    height: 63rpx;
    background: #2496FF;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    opacity: 1;
    font-size: 25rpx;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 29rpx;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.classTwo-test {
    position: absolute;
    top: 39rpx;
    left: 396rpx;
    width: 131rpx;
    height: 63rpx;
    background: #2496FF;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    opacity: 1;
    font-size: 25rpx;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 29rpx;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pick-view {
    position: absolute;
    background-color: #FFFFFF;
    top: 39rpx;
    left: 177rpx;
    width: 176rpx;
    height: 63rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1rpx solid #CCCCCC;
}

.pickTwo-view {
    border: 1rpx solid #CCCCCC;
    background-color: #FFFFFF;
    position: absolute;
    top: 39rpx;
    left: 535rpx;
    width: 176rpx;
    height: 63rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info-view {
    position: relative;
    top: 140rpx;
    left: 39rpx;
    width: 673rpx;
    height: 729rpx;
    background: #FFFFFF;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    opacity: 1;
}
</style>