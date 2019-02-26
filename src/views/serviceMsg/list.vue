<template>
  <div class="main">
    <div class="header">
      <div class="title">
        <h2>
          <span></span>
          客服留言列表
        </h2>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" height=600 style="width: 100%">
        <el-table-column prop="title" class-name="serialNumber" label="留言主题"></el-table-column>
        <el-table-column prop="content" label="留言内容">
        </el-table-column>
        <el-table-column prop="createTime" label="留言时间">
        </el-table-column>
        <el-table-column prop="date" label="更多操作" align='right'>
          <template slot-scope="scope">
            <a href="javascript:void(0)" class="btn" @click="check(scope.row.id)">查看</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="留言内容" :visible.sync="addDialogVisible" width="600px" :modal="true" :append-to-body="true" :close-on-click-modal=false>
      <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="留言内容" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="" v-model="form.content">
          </el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" style="margin-left:150px;" @click="cancel">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { loadData } from '@/api/common'
import moment from 'moment'
export default {
  data() {
    return {
      addDialogVisible: false,
      form: {
        content: ''
      },
      tableData: [],
      listTotal: 0,
      listParams: {
        pageNum: 1,
        pageSize: 10
      },
      id: ''
    }
  },
  created() {
    this.listDate()
  },
  methods: {
    listDate() {
      loadData('/member_message/page', this.listParams).then(data => {
        this.tableData = data.data
        this.listTotal = data.total
        for (let i = 0; i < data.data.length; i += 1) {
          data.data[i].createTime = moment(data.data[i].createTime).format(
            'YYYY-MM-DD'
          )
        }
      })
    },
    check(id) {
      this.addDialogVisible = true
      loadData('/member_message/detail/' + id).then(data => {
        this.form.content = data.data.content
      })
    },
    examine(id) {
      this.$router.push(`/giftAdmin/components/editGift`)
    },
    addOnSubmit() {
      this.addDialogVisible = false
    },
    cancel() {
      this.addDialogVisible = false
    },
    handelColseDialog() {
      this.multipleSelection = []
    }
  }
}
</script>
<style lang='scss' scoped>
.main {
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
      width: 90px;
      height: 25px;
      line-height: 25px;
      display: inline-block;
      background: #2ea0ff;
      text-align: center;
      color: #ffffff;
      border-radius: 4px;
      margin-top: 20px;
    }
  }
  .content {
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
    }
  }
}
</style>
