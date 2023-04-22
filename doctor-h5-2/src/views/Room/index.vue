<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'

import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { Message } from '@/types/room'
import { getOrderDetailAPI } from '@/services/consult'
import { MsgType, OrderType } from '@/enums'
import type { ConsultOrderItem, Image } from '@/types/consult'
const store = useUserStore()
const route = useRoute()

const list = ref<Message[]>([])

let socket: Socket
onMounted(() => {
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.userInfo?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })

  socket.on('connect', () => {
    console.log('  -----> 欢迎光临 ')
  })

  socket.on('chatMsgList', ({ data }) => {
    console.log('data  ----->  ', data)
    list.value = data[0].items
  })

  socket.on('statusChange', loadOrderDetail)

  socket.on('receiveChatMsg', async (data) => {
    list.value.push(data)
    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
  })
})

const orderDetail = ref<ConsultOrderItem>()

const loadOrderDetail = async () => {
  const res = await getOrderDetailAPI(route.query.orderId as string)
  console.log('res  ----->  ', res)
  orderDetail.value = res.data
}



const onSendText = (text: string) => {
  console.log(text);
  socket.emit('sendChatMsg', {
    from: store.userInfo!.id,
    to: orderDetail.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: {
      content: text
    }
  })
}
onMounted(loadOrderDetail)
const onSendImage = (img: Image) => {
  console.log(img)
  socket.emit('sendChatMsg', {
    from: store.userInfo!.id,
    to: orderDetail.value?.docInfo?.id,
    //  消息类型改为图片
    msgType: MsgType.MsgImage,
    msg: {
      //  picture为上传图片的字段
      picture: img
    }
  })
}


onUnmounted(() => {
  socket.close()
})
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="问诊室" />
    <room-status :countDown="orderDetail?.countdown" :status="orderDetail?.status" />
    <room-message :list="list" />
    <room-action 
      :disabled="orderDetail?.status !== OrderType.ConsultChat"
      @send-text="onSendText" 
      @send-image="onSendImage"
    />
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>