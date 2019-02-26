<template>
  <div class="nav-box">
    <span @click="switchTab(0)">当前位置:</span>
    <span @click="switchTab(0)" class="tab-organization" :class="{'active': isIndex}">轮播图</span>
    <span @click="switchTab(1)" class="tab-other" :class="{'active': !isIndex}" v-if="openTab.text!==undefined">{{strOverFlowMiss(openTab.text, 4)}} <svg-icon @click.native="closeTab" icon-class="bnt-close-tab"></svg-icon></span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { strOverFlowMiss } from '@/utils'
export default {
  data() {
    return {
      isIndex: true
    }
  },
  computed: {
    ...mapGetters([
      'openTab'
    ])
  },
  created() {
    if (this.$route.name !== 'EmployeeList') {
      this.isIndex = false
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'EmployeeList') {
        this.isIndex = true
        return false
      }
      this.isIndex = false
    }
  },
  methods: {
    ...mapMutations([
      'setTabInfo'
    ]),
    strOverFlowMiss,
    switchTab(i) {
      if (i === 0) {
        this.$router.push('/')
      } else {
        this.$router.push(this.openTab.url)
      }
    },
    closeTab(event) {
      const ev = window.event || event
      ev.stopPropagation()
      this.setTabInfo({})
      this.$router.push('/')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.nav-box{
  width:87.5%;
  height:40px;
  background: #F1F1F3;
  position: relative;
  top: 80px;
  left: 220px;
  // box-shadow: 0 0 1px #cccccc;
  display: flex;
  &>span{
    color:#999999;
    width:auto;
    line-height: 40px;
    font-size: 14px;
    // border-right:#E8EDF0 1px solid;
    // cursor: pointer;
    // &.active{
    //   color: #0076FF
    // }
  }
  .tab-organization{
    text-align: center;
  }
  .tab-other{
    padding: 0 8px 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

