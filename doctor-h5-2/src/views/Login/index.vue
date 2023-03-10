<script setup lang="ts">
import { mobileRules, passwordRules, codeRules } from "@/utils/rules";
import { onUnmounted, ref } from "vue";
import { showSuccessToast, showToast } from "vant";
import { useRoute, useRouter } from "vue-router";
import { loginAPI, loginByCodeAPI, sendCodeAPI } from "@/services/user";
import { useUserStore } from "@/stores"


const mobile = ref('13230000001')
const password = ref('abc12345')

const isPass = ref(true);
const changePass = () => {
  isPass.value = !isPass.value
}
const code = ref('')
const second = ref(0)
let timerId: number
const onSendCode = async() => {
  const res = await sendCodeAPI(mobile.value)
  code.value = res.data.code
  second.value = 60
  timerId = setInterval(() => {
    second.value--
    if(second.value === 0) clearInterval
  }, 1000)
}

onUnmounted(() => {
  clearInterval(timerId)
})
const isShow = ref(true)
const agree = ref('false')

const router = useRouter()
const route = useRoute()
console.log(route.query);


const store = useUserStore()
const onSubmit = async() => {
  if (!agree.value) {
    showToast('请勾选同意登录协议')
    return
  }
    const res = isPass.value
      ? await loginAPI(mobile.value, password.value)
      : await loginByCodeAPI(mobile.value, code.value)
    store.saveUser(res.data)
    showSuccessToast('登录成功')

    const returnUrl = route.query.returnUrl
    if (returnUrl) {
      router.push(returnUrl as string)
    } else {
      router.push('/')
    }
    router.push('/')
  }
</script>

<template>
  <div class="login-page">
    <cp-nav-bar right-text="注册"></cp-nav-bar>
    <div class="login-head">
      <h3>{{isPass ? '密码登录' : '短信验证码'}}</h3>
      <a href="javascript:;" @click="changePass">
        <span>{{isPass ? '短信验证码' : '密码登录'}}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- form 表单 -->
    <van-form autocomplete="off" @submit="onSubmit">
      <van-field 
        placeholder="请输入手机号" 
        type="tel"
        :rules="mobileRules"
        v-model="mobile"
       />
      <van-field
        v-if="isPass" 
        placeholder="请输入密码" 
        :type="isShow ? 'text' : 'password'"
        :rules="passwordRules"
        v-model="password"
      >
        <template #button>
          <cp-icon @click="isShow = !isShow" :name="isShow ? 'login-eye-off' : 'login-eye-on'" />
        </template>
      </van-field>
      <van-field
        v-if="!isPass" 
        v-model="code"
        :rules="codeRules"
        placeholder="请输入验证码" 
      >
        <template #button>
          <span v-show="second === 0" @click="onSendCode" class="send-code">发送验证码</span>
          <span v-show="second > 0">{{ second }}秒后获取</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary"  native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>

    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22,194,163,0.5);
    }
  }
  .send-code {
    --cp-primary: #16c2a3;
    color: var(--cp-primary)
  }
}
</style>