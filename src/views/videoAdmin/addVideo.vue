<template>
  <div class="main">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="headline">
        <h2><span></span>首页视频</h2>
        <el-form-item label="视频名称" prop="linkAddress" >
        <el-input v-model="ruleForm.videoName"></el-input>
        </el-form-item>
      </div>
      <div class="headline">
        <h2><span></span>内容设置</h2>
        <div class="selectContent">
          <el-radio-group v-model="selectContent" @change='selectContentDate'>
            <el-radio-button label="视频链接"></el-radio-button>
            <el-radio-button label="手动上传"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-form-item label="视频链接" prop="linkAddress" v-if="isShow">
        <el-input v-model="ruleForm.url"></el-input>
        <p class="tip">请填写视频的完整地址，eg: http://www.test.mp4</p>
      </el-form-item>
      <el-form-item label="手动上传" prop="contentsArticle" v-if="!isShow">
        <el-upload
          ref="upload"
          :limit=1
          accept="video/*"
          class="upload-demo" drag :action="videoUpload"
          :headers="uploadFileHeader"
          :on-success="uploadSuccMsgUrl" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">限制上传MP4格式，小于25M, 比例： 建议1:1,16:9,9:16, 时长60秒内</div>
        </el-upload>
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
  import { imgUrl, videoUpload } from '@/api/url'
  export default {
    data() {
      return {
        imgUrl,
        videoUpload,
        isShow: true,
        selectContent: '视频链接',
        editorOption: {},
        ruleForm: {
          url: '',
          fileId: '',
          videoPath: '',
          videoName: ''
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

        this.ruleForm.fileId = retData.data.fileId
        if (retData.status === 200) {
          this.$message({
            message: retData.message,
            type: 'success'
          })
        } else {
          this.$message({
            message: retData.message,
            type: 'success'
          })
        }
      },
      selectContentDate(val) {
        if (val === '视频链接') {
          this.isShow = true
        } else {
          this.isShow = false
        }
      },
      submitForm() {
        if(this.isShow && !this.ruleForm.url) {
          this.$message({
            message: '请填写您要上传的视频地址',
            type: 'warning'
          })
          return false
        } else if(this.ruleForm.fileId === '' && !this.isShow) {
          this.$message({
            message: '请先上传的视频您本地视频',
            type: 'warning'
          })
          return false
        }
        let prop = {
          videoName: this.ruleForm.videoName,
          videoPath: this.isShow ? this.ruleForm.url : this.ruleForm.fileId
        }
        loadData('/video/save', prop).then(data => {
          this.$message({
            message: data.message,
            type: 'success'
          })
        })
      },
      resetForm(formName) {
        this.$router.push(`/videoAdmin/list`)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    .tip{
      color:red;
    }
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
