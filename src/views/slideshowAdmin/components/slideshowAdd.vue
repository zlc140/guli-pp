<template>
  <div class="main">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="headline">
        <h2><span></span>轮播图片</h2>
      </div>
      <el-form-item label="轮播图片" prop="name">
        <el-upload ref="upload" :limit=1 class="upload-demo" drag :action="imgUpload" :headers="uploadFileHeader" :on-success="uploadSuccMsgUrl" multiple>
          <div class="pic1" v-if="ruleForm.fileId">
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
        <h2><span></span>内容设置</h2>
        <div class="selectContent">
          <el-radio-group v-model="selectContent" @change='selectContentDate'>
            <el-radio-button label="链接"></el-radio-button>
            <el-radio-button label="文章"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-form-item label="链接地址" prop="linkAddress" v-if="isShow">
        <el-input v-model="ruleForm.url"></el-input>
        <p class="tip">请填写完整的连接地址 eg: http://www.pulipulai.com</p>
      </el-form-item>
      <el-form-item label="文章内容" prop="contentsArticle" v-if="!isShow">
        <quill-editor class="appwrapper" v-model="ruleForm.url" ref="myQuillEditor" :options="editorOption">
      </quill-editor>
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
import { mapGetters } from 'vuex'
import { imgUpload, imgUrl } from '@/api/url'
export default {
  data() {
    return {
      imgUrl,
      imgUpload,
      isShow: true,
      selectContent: '链接',
      editorOption: {},
      ruleForm: {
        // id: '',
        fileId: '',
        url: '',
        content: ''
      }
      // rules: {
      //   linkAddress: [
      //     { required: true, message: '请输入链接地址', trigger: 'blur' }
      //   ],
      //   contentsArticle: [
      //     { required: true, message: '请输入文章内容', trigger: 'blur' }
      //   ]
      // }
    }
  },
  computed: {
    ...mapGetters(['uploadFileHeader'])
  },
  created() {
    // console.log(this.imgUpload)
  },
  methods: {
    uploadSuccMsgUrl(retData, file) {
      console.log(retData)
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
    selectContentDate(val) {
      if (val === '链接') {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    submitForm() {
      loadData('/rotate/save', this.ruleForm).then(data => {
        this.$message({
          message: data.message,
          type: 'success'
        })
      })
    },
    resetForm(formName) {
      this.$router.push(`/slideshowAdmin/list`)
    }
  }
}
</script>
<style lang="scss" scoped>
  .tip{
    color:red;
  }
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
    .pic1 {
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
