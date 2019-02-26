<template>
  <div class="main">
    <div class="header">
      <div class="title">
        <h2>
          <span></span>
          礼品发布
        </h2>
      </div>
      <div class="add">
        <a href="javascript:void(0)" @click="toAdd">添加内容</a>
      </div>
    </div>
    <div class="content">
      <el-table height=600 :data="tableData" style="width: 100%" @row-click='conversion'>
        <el-table-column prop="memberName" class-name="serialNumber" label="用户名称"></el-table-column>
        <el-table-column prop="giftName" label="兑换奖品">
        </el-table-column>
        <el-table-column prop="contactName" label="用户姓名">
        </el-table-column>
        <el-table-column prop="addressDetail" label="用户地址">
        </el-table-column>
        <el-table-column prop="statusName" class-name="operation" label="更多操作" align='right'>
          <template slot-scope="scope">
            <span v-if="scope.row.status==='I'" @click="addDialogVisible = true">{{scope.row.statusName}}</span>
            <span v-if="scope.row.status==='D'" @click="addDialogVisible = false">{{scope.row.statusName}}</span>
            <span v-if="scope.row.status==='S'" @click="addDialogVisible = false">{{scope.row.statusName}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="请确认发货地址" :visible.sync="addDialogVisible" width="600px" :modal="true" :append-to-body="true" :close-on-click-modal=false>
      <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item>
          <span>{{form.contactName}}</span>
          <span>{{form.contactPhone}}</span>
          <p>地址:<span>{{form.addressDetail}}</span></p>
        </el-form-item>
        <el-form-item>
          <span>用户兑换的是</span>
          <span>{{form.giftName}}</span>
          <p style="width:100%;text-">请确认是否无误</p>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel" style="margin:20px 0 0 250px">取消</el-button>
          <el-button type="primary" @click="addOnSubmit">确认发货</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { loadData } from '@/api/common'
export default {
  data() {
    return {
      addDialogVisible: false,
      id: '',
      form: {
        addressDetail: '',
        giftName: '',
        contactName: '',
        memberName: '',
        contactPhone: ''
      },
      tableData: [],
      listTotal: 0,
      listParams: {
        type: 1,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.listDate()
  },
  methods: {
    toEdit(id) {
      this.$router.push(`/giftAdmin/components/editGift`)
    },
    toAdd() {
      this.$router.push(`/giftAdmin/components/addGift`)
    },
    listDate() {
      loadData('/member_gift/page', this.listParams).then(data => {
        console.log(data)
        this.tableData = data.data
        this.listTotal = data.total
      })
    },
    conversion(row, event, column) {
      loadData('/member_gift/detail/' + row.id).then(data => {
        this.form.addressDetail = data.data.addressDetail
        this.form.giftName = data.data.giftName
        this.form.contactName = data.data.contactName
        this.form.memberName = data.data.memberName
        this.form.contactPhone = data.data.contactPhone
        this.id = data.data.id
      })
    },
    addOnSubmit() {
      this.addDialogVisible = false
      loadData('/member_gift/send/' + this.id).then(data => {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.listDate()
      })
    },
    cancel() {
      this.addDialogVisible = false
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
