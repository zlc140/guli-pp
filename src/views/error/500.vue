<template>
  <div class="error-500">
    <svg-icon icon-class="500" class="icon"></svg-icon>
    <p>哎呀，服务器出点小问题！</p>
  </div>
</template>

<style lang="scss" scoped>
.error-500{
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
