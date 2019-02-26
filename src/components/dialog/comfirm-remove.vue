<template>
  <div class="dialog-centent">
    <el-dialog :visible="dialogVisible" width="390px" :before-close="handleClose" :append-to-body='true'>
      <div class="content">
        <p class="title">
          <svg-icon icon-class="dialog-warning-icon" class="icon-warning"></svg-icon>{{title}}
        </p>
        <p class="desc">{{desc}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" class="complete" @click="define">确认删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      title: '',
      desc: ''
    }
  },
  methods: {
    show(t, d) {
      this.title = t
      this.desc = d
      this.dialogVisible = true
    },
    handleClose(done) {
      this.dialogVisible = false
    },
    define() {
      this.$emit('define')
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.content,
.dialog-footer {
  text-align: center;
}
.content {
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #333333;
  }
  .desc {
    margin-top: 20px;
    color: #666666;
  }
  .icon-warning {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}
.dialog-centent {
  /deep/ .el-dialog__footer {
    text-align: center;
  }
  /deep/ .complete {
    background: #0076ff;
  }
}
</style>


