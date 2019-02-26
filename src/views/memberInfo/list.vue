<template>
  <div class="main">
    <div class="header">
      <div class="title">
        <h2>
          <span></span>
          会员信息列表
        </h2>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" height=600 style="width: 100%">
        <el-table-column prop="memberName" class-name="serialNumber" label="用户名"></el-table-column>
        <el-table-column prop="email" label="用户邮箱">
        </el-table-column>
        <el-table-column prop="address" label="用户地址">
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间">
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" @size-change="handlePageSizeChange" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="listTotal">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { loadData } from '@/api/common'
import moment from 'moment'
export default {
  data() {
    return {
      tableData: [],
      listTotal: 0,
      listParams: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.listDate()
  },
  methods: {
    listDate() {
      loadData('/member/page', this.listParams).then(data => {
        console.log(data)
        this.tableData = data.data
        this.listTotal = data.total
        for (let i = 0; i < data.data.length; i += 1) {
          data.data[i].createTime = moment(data.data[i].createTime).format(
            'YYYY-MM-DD'
          )
        }
      })
    },
    handleCurrentChange(val) {
      this.listParams.pageNum = val
      console.log(this.listParams.pageNum)
      this.listDate()
    },
    handlePageSizeChange(val) {
      this.listParams.pageSize = val
      console.log(this.listParams.pageSize)
      this.listDate()
    },
    toEdit(id) {
      this.$router.push(`/memberInfo/components/memberInfoEid`)
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
