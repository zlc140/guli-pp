<template>
  <div class="login-box">
    <div class="login-form">
      <div class="logo-box">
        <p class="font-logo">普丽普莱</p>
        <p class="logo-desc">普丽普莱后台管理账号登录</p>
      </div>
      <div class="account-error">
        <span v-show="accountErrorMsg!==''">{{accountErrorMsg}}</span>
      </div>
      <div class="form">
        <div class="inp-wrap">
          <svg-icon icon-class="login-user" class="icon"></svg-icon>
          <span class="line"></span>
          <input type="text" placeholder="请输入账号" @focus="clearError" v-model="loginForm.username">
        </div>
        <div class="error-user">
          <span v-show="userErrorMsg!==''">请输入账号</span>
        </div>
        <div class="inp-wrap">
          <svg-icon icon-class="login-pwd" class="icon"></svg-icon>
          <span class="line"></span>
          <input type="text" placeholder="请输入密码" @focus="clearError" v-model="loginForm.password">
        </div>
        <div class="error-pwd">
          <span v-show="pwdErrorMsg!==''">请输入密码</span>
        </div>
        <div class="btn-wrap">
          <input type="button" value="登录" class="btn-login" @click="login">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadData } from '@/api/common'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      userErrorMsg: '',
      pwdErrorMsg: '',
      accountErrorMsg: ''
    }
  },
  methods: {
    clearError() {
      this.userErrorMsg = ''
      this.pwdErrorMsg = ''
      this.accountErrorMsg = ''
    },
    login() {
      if (!this.loginForm.username) {
        this.userErrorMsg = '账号不能为空'
        return false
      }
      if (!this.loginForm.password) {
        this.pwdErrorMsg = '密码不能为空'
        return false
      }
      console.log(this.loginForm)
      loadData('/admin/login', this.loginForm).then(
        data => {
          if (data.status === '200') {
            this.$store
              .dispatch('LoginIn', {
                token: data.data,
                name: this.loginForm.username
              })
              .then(() => {
                console.log(this.$store.getters.token)
                if (this.$route.query.backUrl === undefined) {
                  this.$router.push('/')
                } else {
                  window.location.href = this.$route.query.backUrl
                }
              })
          } else {
            this.accountErrorMsg = data.message
          }
        },
        data => {
          if (data.status === '402') {
            this.accountErrorMsg = '账号或者密码不正确'
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
$error-color: #ed6347;

.login-box {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(./images/login-bg.png) no-repeat center center;
  .login-form {
    width: 475px;
    height: 458px;
    box-sizing: border-box;
    padding: 77px 42px 50px 42px;
    background: #ffffff;
    .font-logo {
      font-size: 48px;
      color: #0076ff;
      text-align: center;
      font-style: oblique;
      font-weight: 600;
    }
    .logo-desc {
      font-size: 14px;
      color: #0076ff;
      text-align: center;
    }
    .account-error {
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: $error-color;
    }
    .form {
      .inp-wrap {
        border: 1px solid #ebebeb;
        border-radius: 3px;
        padding-left: 22px;
        height: 50px;
        display: flex;
        align-items: center;
        input {
          outline: none;
          height: 100%;
          border: 0;
          padding-left: 15px;
        }
        .line {
          width: 1px;
          background: #ebebeb;
          height: 25px;
        }
        .icon {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
      }
      .error-user,
      .error-pwd {
        height: 30px;
        line-height: 30px;
        color: $error-color;
      }
      .btn-login {
        width: 100%;
        height: 50px;
        background: #0076ff;
        border-radius: 3px;
        border: 0;
        margin-top: 20px;
        font-size: 20px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
