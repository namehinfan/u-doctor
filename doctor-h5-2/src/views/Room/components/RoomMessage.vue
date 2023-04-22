<!-- 消息卡片 -->
<script setup lang="ts">
// import { IllnessTime, MsgType } from '@/enums';
import { MsgType } from '@/enums'
import { getIllnessTimeText, getConsultFlagText } from '@/constants'
import type { Image } from '@/types/consult'
import type { Message } from '@/types/room';
import { showImagePreview } from 'vant'
import EvaluateCard from './EvaluateCard.vue'
import { useUserStore } from '@/stores';
import docImg from '@/assets/avatar-doctor.svg'

import dayjs from 'dayjs'

defineProps<{ list: Message[] }>();
const store = useUserStore()
// 1. 预览图片
const onPreview = (pics?: Image[]) => {
  // 处理为空的逻辑
  if (!pics || !pics.length) return
  const urlList = pics.map((item) => item.url)
  showImagePreview(urlList)
}

const formatTime = (time: string) => {
  return dayjs(time).format('HH:mm')
}
</script>

<template>
  <div v-for="{ id, msgType, msg, from, createTime } in list" :key="id">
    <!-- 病情描述 -->
    <div class="msg msg-illness" v-if="msgType === MsgType.CardPat">
      <div class="patient van-hairline--bottom" v-if="msg.consultRecord">
        <p>
          {{ msg.consultRecord?.patientInfo.name }}
          {{ msg.consultRecord?.patientInfo.genderValue }}
          {{ msg.consultRecord?.patientInfo.age }}岁
        </p>
        <p>
          {{ getIllnessTimeText(msg.consultRecord!.illnessTime) }} |
          {{ getConsultFlagText(msg.consultRecord!.consultFlag) }}
        </p>
      </div>
      <van-row>
        <van-col span="6">病情描述</van-col>
        <van-col span="18">{{ msg.consultRecord?.illnessDesc }}</van-col>
        <van-col span="6">图片</van-col>
        <van-col span="18" @click="onPreview(msg.consultRecord?.pictures)">
          点击查看
        </van-col>
      </van-row>
    </div>

    <!-- 温馨提示-通知 -->
    <div class="msg msg-tip"  v-if="msgType === MsgType.NotifyTip">
      <div class="content">
        <span class="green">温馨提示：</span>
        <span>{{ msg.content }}</span>
      </div>
    </div>

    <!-- 通知 -->
    <div class="msg msg-tip" v-if="msgType === MsgType.Notify">
      <div class="content">
        <span>{{ msg.content }}</span>
      </div>
    </div>

    <!-- 发消息-文字 -->
    <div class="msg msg-to" v-if="msgType === MsgType.MsgText && from === store.userInfo?.id">
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{ msg.content }}</div>
      </div>
      <van-image 
        :src="store.userInfo?.avatar" 
      />
    </div>

    <!-- 发消息-图片 -->
    <div class="msg msg-to" v-if="msgType === MsgType.MsgImage && from === store.userInfo?.id">
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <van-image
          fit="contain"
          :src="msg.picture?.url"
        />
      </div>
      <van-image src="https://dss0.bdstatic.com/-0U0bXSm1A5BphGlnYG/tam-ogel/3dc528d31e8db3fc5150b8c80a5a02ab_128_128.jpg" />
    </div>

    <!-- 收消息-文字 -->
    <div class="msg msg-from" v-if="msgType === MsgType.MsgText && from !== store.userInfo?.id">
      <van-image :src="docImg" />
      <div class="content">
        <div class="time">{{ formatTime(createTime) }}</div>
        <div class="pao">{{  msg.content }}</div>
      </div>
    </div>

    <!-- 收消息-图片 -->
    <div class="msg msg-from" v-if="msgType === MsgType.MsgImage && from !== store.userInfo?.id">
      <van-image :src="docImg" />
      <div class="content">
        <div class="time">{{formatTime(createTime)}}</div>
        <van-image
          fit="contain"
          :src="msg.picture?.url"
        />
      </div>
    </div>

    <!-- 处方消息 -->
    <div class="msg msg-recipe" v-if="false">
      <div class="content">
        <div class="head van-hairline--bottom">
          <div class="head-tit">
            <h3>电子处方</h3>
            <p>原始处方 <van-icon name="arrow"></van-icon></p>
          </div>
          <p>李富贵 男 31岁 血管性头痛</p>
          <p>开方时间：2022-01-15 14:21:42</p>
        </div>
        <div class="body">
          <div class="body-item" v-for="i in 2" :key="i">
            <div class="drug">
              <p>优赛明 维生素E乳</p>
              <p>口服，每次1袋，每天3次，用药3天</p>
            </div>
            <div class="num">x1</div>
          </div>
        </div>
        <div class="foot"><span>购买药品</span></div>
      </div>
    </div>

    <!-- 订单取消 -->
    <div class="msg msg-tip msg-tip-cancel" v-if="false">
      <div class="content">
        <span>订单取消</span>
      </div>
    </div>

    <!-- 评价医生 -->
    <div class="msg msg-comment" v-if="false">
      <evaluate-card />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/room.scss';
</style>