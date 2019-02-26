<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import SidebarItem from './sidebar-item'
import ScrollBar from '@/components/scroll-bar'

export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {
      sidebar: {
        opened: '1'
      }
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>