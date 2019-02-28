<template>
  <div class="main">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="headline">
        <h2><span></span>商品图片</h2>
      </div>
      <el-form-item label="商品图片" prop="name">
        <el-upload ref="upload" :limit=1 class="upload-demo" drag :action="imgUpload" :headers="uploadFileHeader" :on-success="uploadSuccMsgUrl" multiple>
          <div class="pic" v-if="ruleForm.fileId">
            <img :src="imgUrl+ruleForm.fileId">
          </div>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <div class="headline">
        <h2><span></span>链接设置</h2>
      </div>
      <el-form-item label="链接地址" prop="linkAddress">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
      <div class="headline">
        <h2><span></span>内容设置</h2>
      </div>
      <el-form-item label="文章内容" prop="contentsArticle">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
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
import { imgUpload, imgUrl } from '@/api/url'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      imgUrl,
      imgUpload,
      editorOption: {},
      ruleForm: {
        type: 2,
        id: '',
        fileId: '',
        url: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters(['uploadFileHeader'])
  },
  created() {
    this.initDate()
  },
  methods: {
    initDate() {
      this.ruleForm.id = this.$route.params.id
      loadData('/goods/detail/' + this.ruleForm.id).then(data => {
        console.log(data)
        this.ruleForm.fileId = data.data.fileId
        this.ruleForm.url = data.data.url
      })
    },
    uploadSuccMsgUrl(retData, file) {
      this.ruleForm.fileId = retData.data.fileId
      if (retData.status === 200) {
        this.$message({
          message: retData.message,
          type: 'success'
        })
        this.form.logo = retData.data
      } else {
        this.$message({
          message: retData.message,
          type: 'success'
        })
      }
    },
    submitForm() {
      loadData('/goods/save', this.ruleForm).then(data => {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.initDate()
      })
    },
    resetForm() {
      this.$router.push(`/giftAdmin/list`)
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
        width: 100px;
        height: 100px;
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
