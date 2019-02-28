<template>
  <div class="video-main">
    <div class="header">
      <div class="title">
        <h2>
          <span></span>
          视频管理
        </h2>
      </div>
      <div class="add">
        <a href="javascript:void(0)" @click="toAdd">上传视频</a>
        <a href="javascript:void(0)" class="del" @click="toDel" v-if="this.videoPath">删除视频</a>
      </div>
    </div>
    <div class="content">
      <div class="video-box" v-if="videoPath">
        <video id="my-video" ref="video"
               class="video-js vjs-default-skin vjs-big-play-centered"
               width="1200"
               preload="auto"
               x5-playsinline="true"
               webkit-playsinline="true"
               playsinline="true"
               data-setup='{}'
               controls>
          <source :src="videoPath" :type="type">
          <p class="vjs-no-js">
            您的浏览器不支持 video 标签。
          </p>
        </video>
      </div>
      <div v-else class="video-box">
          您还没有上传首页视频~
      </div>
    </div>

  </div>
</template>
<script>
  import { loadData } from '@/api/common'
  import { imgUrl } from '@/api/url'
  import moment from 'moment'
  import videojs from 'video.js'

  // 视频格式
  const TYPES = {
    m3u8: {
      type: "application/x-mpegURL",
    },
    mp4: {
      type: "video/mp4",
    },
    webm: {
      type: "video/webm",
    },
    ogv: {
      type: "video/ogg",
    }
  }

  export default {
    data() {
      return {
        imgUrl,
        videoData: {},
        videoPath: '',
        type:''
      }
    },
    mounted() {
      this.listDate()
    },
    methods: {
      toEdit(id) {
        this.$router.push({
          path: '/videoAdmin/manage',
          query: { type: 'edit' }
        })
      },
      toAdd() {
        this.$router.push({
          path: '/videoAdmin/manage',
          query: { type: 'add' }
        })
      },
      toDel() {
        let id = this.videoData ? this.videoData.videoId : ''
        if (!id) return;
        loadData(`/video/delete/${id}`).then(res => {
            this.$message({
              message: "删除成功",
              type: 'success'
            })
        })
      },
      listDate() {
        loadData('/video/page', {
          pageNum: 1,
          pageSize: 10
        }).then(data => {
          // this.videoData = data.data && data.data.videoPath ? data.data : null;
          this.videoData = null
          if(data.data && data.data.length > 0) {
            this.videoData = data.data[data.data.length -1]
          }
          if(!this.videoData) return
          this.videoPath = this.videoData.videoPath
          let res = this.videoPath.match(/\.([^./]*)$/)
          res = res ? res[1].toLowerCase() : 'mp4'
          this.type = TYPES[res].type
          setTimeout(function() {
            var player = videojs('my-video', {
              controls: true,
              preload: 'auto',
              poster: '',
              loop: true,
              width: 1200
            })
          })
        }).catch(err => {
          // this.videoPath = 'https://vjs.zencdn.net/v/oceans.mp4'
          // let res = this.videoPath.match(/\.([^./]*)$/)
          // res = res ? res[1].toLowerCase() : 'mp4'
          // this.type = TYPES[res].type
          // setTimeout(function() {
          //   var player = videojs('my-video', {
          //     controls: true,
          //     preload: 'auto',
          //     poster: '',
          //     loop: true,
          //     width: 1200
          //   })
          // })

          console.log(err, 'err')
        })
      }
    }
  }
</script>
<style lang='scss'>
  @import "~video.js/src/css/video-js.scss";
  .video-main {
    .header {
      display: flex;
      justify-content: space-between;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #efefef;
      .title {
        h2 {
          color: #333333;
          font-size: 14px;
          // padding-left: 20px;
          span {
            margin-right: 20px;
            width: 6px;
            height: 20px;
            background: #2ea0ff;
            display: inline-block;
            border-radius: 4px;
            position: relative;
            top: 5px;
            left: 20px;
          }
        }
      }
      .add {
        width: 300px;
        line-height: 25px;
        display: inline-flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
        a{
          width: 90px;
          margin-right: 10px;
          height: 25px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background: #2ea0ff;
          text-align: center;
          color: #ffffff;
          border-radius: 4px;
        }
      }
    }
    .content {
      flex: 1;
      overflow: auto;
      &::-webkit-scrollbar-track-piece {
        background: #ffffff;
      }
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {

        background: #eeeeee;
        border-radius: 20px;
      }
      .video-box{
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 50px 30px;
        min-width: 1300px;
        margin-bottom: 150px;
      }
      /deep/ .serialNumber {
        padding-left: 20px;
      }
      /deep/ .el-table {
        .operation {
          .cell {
            a {
              color: #999999 !important;
            }
            .deleteIcon {
              margin-left: 10px;
            }
          }
        }
        /deep/ .cell {
          .el-table__column-filter-trigger {
            float: right;
          }
        }
        /deep/ thead {
          tr {
            height: 48px !important;
          }
        }
        /deep/ .serialNumber {
          padding-left: 24px;
        }
        /deep/ th {
          padding: 0;
          .cell {
            color: #999999 !important;
            font-size: 12px;
            font-weight: normal;
            line-height: 34px;
            padding: 0;
          }
        }
        /deep/ td {
          .cell {
            color: #666666 !important;
            font-size: 12px;
            padding: 0 5px;
            .btn:hover {
              color: #409eff !important;
            }
            .textColor {
              color: #ffffff;
            }
            .pic {
              max-width: 80px;
              max-height: 80px;
            }
          }
        }
      }
    }
    .pagination {
      padding: 10px 24px;
      flex: none;
      // border-top: #cccccc 1px solid;
      /deep/ .el-pagination__total {
        float: left;
      }
      /deep/ .el-pagination__sizes {
        float: left;
      }
    }
  }
</style>
