<template>
  <el-header height="64px" style="text-align: right; font-size: 12px">
    <div class="logo">
      <router-link to="/" tag="a">
        <div class="logoTitle">
          <img src="../img/logo.png" alt="">
        </div>
      </router-link>
    </div>
    <div class="headerR">
      <ul>
        <li class="user-name"><router-link to="/" tag="a">{{name}}</router-link></li>
        <!--<li><a href="#"><svg-icon iconClass="mes"></svg-icon>消息</a></li>-->
        <li class="hover-hand"><span @click="logoutFn"><svg-icon icon-class="logout"></svg-icon></span></li>
      </ul>
    </div>

  </el-header>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { login } from '@/api/url'
  export default {
    name: 'vHeader',
    data() {
      return {
        //
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      logoutFn() {
        this.$store.dispatch('LoginOut').then(() => {
          window.location.href = login
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/variables';
  @import '../../../styles/mixin';
  .el-header {
    background-color: $headerBg;
    color: #333;
    /*line-height: 80px;*/
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    top:0;
    left:0;
    width: 100%;
    z-index:9;
    padding: 0 20px 0 0;
    .logo {
      width:200px;
      display:flex;
      height:100%;
      align-items: center;
      background: #ffffff;
      a {
        margin-left:24px;
        margin-right:34px;
      }
      .logoTitle {
        display: inline-block;
        font-size: 24px;
        color:#333;
        user-select: none;
        font-style: oblique;
      }
    }
    .headerR {
      user-select: none;
      ul {
        li {
          display: inline-block;
          a {
            line-height: 20px;
            color: $headerColor;
            font-size: $headerFontSize;
            .svg-icon {
              margin-right: 10px;
            }
          }
        }
        .user-name{
          padding: 0 20px;
          border-right: #ccc 1px solid;
          margin-right:20px;
        }
        .hover-hand{
          cursor: pointer;
        }
      }

    }
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    /*position: absolute;*/
    /*right: 35px;*/
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }

</style>
