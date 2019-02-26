<template>
  <div class="error-404">
    <svg-icon icon-class="404" class="icon"></svg-icon>
    <p>哎呀，页面走丢了！</p>
  </div>
</template>

<style lang="scss" scoped>
.error-404{
  height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon{
    width: 500px;
    height: 500px;
  }
}
</style>
