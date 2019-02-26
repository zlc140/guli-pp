<template>
  <div class="app-wrapper">
    <vheader></vheader>
    <sidebar class="sidebar-container"></sidebar>
    <navbar></navbar>
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Vheader, Sidebar, Navbar, AppMain } from './components'

export default {
  name: 'layout',
  components: {
    Vheader,
    Sidebar,
    AppMain,
    Navbar
  },
  data() {
    return {
      editableTabsValue: '1',
      editableTabs: [
        {
          title: '轮播图管理',
          name: '1',
          content: ''
        }
      ]
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
