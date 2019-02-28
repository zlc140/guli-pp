<template>
  <div class="main">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="headline">
        <h2><span></span>添加菜单名</h2>
      </div>
      <el-form-item label="菜单名" prop="linkAddress">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="submitForm">保存信息</el-button>
        <el-button @click="resetForm" class="cancel">取消编辑</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { loadData } from '@/api/common'
export default {
  data() {
    return {
      ruleForm: {
        type: 1,
        name: ''
      }
    }
  },
  created() {
    this.initDate()
    // console.log(this.imgUpload)
  },
  methods: {
    initDate() {
      this.ruleForm.id = this.$route.params.id
      loadData('/article_menu/detail/' + this.ruleForm.id).then(data => {
        console.log(data)
        this.ruleForm.name = data.data.name
      })
    },
    submitForm() {
      loadData('/article_menu/save', this.ruleForm).then(data => {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.initDate()
      })
    },
    resetForm(formName) {
      this.$router.push(`/enterpriseArticle/list`)
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  /deep/ .el-form {
    padding: 20px 20px;
    .el-input__inner {
      // width: 400px;
      width: 100%;
      background: #f4f4f4;
    }
    .el-textarea__inner {
      width: 100%;
      min-height: 150px !important;
      background: #f4f4f4;
    }
    .headline {
      h2 {
        display: inline-block;
        color: #333333;
        font-size: 14px;
        padding-bottom: 24px;
        span {
          width: 6px;
          height: 20px;
          display: inline-block;
          background: #2ea0ff;
          border-radius: 4px;
          position: relative;
          top: 5px;
          margin-right: 10px;
        }
      }
      .selectContent {
        margin-left: 25px;
        display: inline-block;
        margin-bottom: 25px;
      }
    }
    .pic {
      position: absolute;
      top: 40px;
      width: 100%;
      height: 100%;
      background: #ffffff;
      img {
        width: 80px;
        height: 80px;
        overflow: hidden;
      }
    }
    /deep/ .btn {
      margin-top: 40px;
      padding-bottom: 290px;
      .el-form-item__content {
        margin-left: 0 !important;
        color: #666666;
        font-size: 14px;
        .cancel {
          margin-left: 150px;
        }
      }
    }
  }
}
</style>
