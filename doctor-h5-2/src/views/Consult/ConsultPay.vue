<script setup lang="ts">
import { getPatientDetail, getPreOrderAPI, createOrderAPI, getOrderPayUrl } from '@/services/consult';
import { useConsultStore } from '@/stores';
import type { OrderPreData } from '@/types/consult';
import type { Patient } from '@/types/user';
import { showToast } from 'vant';
import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';


const store = useConsultStore()
const agree = ref(false)
const isShow = ref(false)
const payMethod = ref<0 | 1>(1)
const loading = ref(false)
const orderId = ref('')

const onNext = async() => {
  if (!agree.value) return showToast('请同意支付协议')
  isShow.value = !isShow.value
  loading.value = true

  const res = await createOrderAPI(store.consult)
  store.clear()
  orderId.value = res.data.id
  
}

const patient = ref<Patient>({age: 0, name: '',genderValue:''} as Patient)
const preOrder = ref<OrderPreData>({actualPayment: 0, couponDeduction: 0, pointDeduction: 0} as OrderPreData)

const onLoadDetail = async () => {
  if(!store.consult.patientId) return showToast('请选择就诊人后再支付')
  const res = await getPatientDetail(store.consult.patientId)
  patient.value = res.data
}
 
const onLoadPreOrder = async () => {
  const res = await getPreOrderAPI({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  preOrder.value = res.data
}

const router = useRouter()
onMounted(() => {
  if (
    !store.isNotEmpty
  ) {
    showToast('就诊信息不完整，请重新填写')
    router.push('/')
    return
  }
  onLoadDetail()
  onLoadPreOrder()
})

onBeforeRouteLeave(() => {
  if (
    !store.isNotEmpty
  ) {
    return true
  }
  return false
})

const onPay = async () => {
  const res = await getOrderPayUrl({
    paymentMethod: payMethod.value,
    payCallback: 'http://localhost:80/room',
    orderId: orderId.value
  })
  window.location.href = res.data.payUrl
}
</script>

<template>
  <div class="consult-pay-page">
    <!-- 导航栏 -->
    <cp-nav-bar title="支付" />
    <!-- 费用信息 -->
    <div class="pay-info">
      <p class="tit">图文问诊{{preOrder?.payment}}</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>

    <!-- 折扣 -->
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${preOrder.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${preOrder.pointDeduction}`" />
      <van-cell title="实付款" :value="`-¥${preOrder.actualPayment}`" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>

    <!-- 患者信息 -->
    <van-cell-group>
      <van-cell title="患者信息" :value="`${patient.name} | ${patient.genderValue} | ${patient.age}岁`"></van-cell>
      <van-cell title="病情描述" label="头痛，头晕，恶心"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>

    <!-- 底部支付按钮 -->
    <van-submit-bar
      @click="onNext"
      :loading="loading"
      button-type="primary"
      :price="preOrder?.actualPayment * 100"
      button-text="立即支付"
      text-align="left"
    />
    
    <!-- 支付选项卡片 -->
    <van-action-sheet 
      title="选择支付方式" 
      v-model:show="isShow" 
      :closeable="false"
      :close-on-popstate="false"
    >
      <div class="pay-type">
        <p class="amount">￥20元</p>
        <van-cell-group>
          <van-cell title="微信支付" @click="payMethod = 0">
            <template #icon><cp-icon name="consult-wechat" /></template>
            <template #extra><van-checkbox :checked="payMethod === 0"/></template>
          </van-cell>
          <van-cell title="支付宝支付" @click="payMethod = 1">
            <template #icon><cp-icon name="consult-alipay" /></template>
            <template #extra><van-checkbox :checked="payMethod === 1"/></template>
          </van-cell>
        </van-cell-group>
        <div class="btn">
          <van-button type="primary" round block @click="onPay">立即支付</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 0 0 50px;
}

.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--cp-tag);
      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}

.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}

.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--cp-primary);
  }
}

::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}
  
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>

