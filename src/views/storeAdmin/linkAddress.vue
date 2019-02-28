<template>
  <div class="main">
    <div class="header">
      <div class="title">
        <h2>
          <span></span>
          在线商城管理列表
        </h2>
      </div>
      <div class="add">
        <a href="javascript:void(0)" @click="addDialogVisible = true">添加链接</a>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" class-name="serialNumber">
        </el-table-column>
        <el-table-column prop="url">
        </el-table-column>
        <el-table-column prop="operation" class-name="operation">
          <template slot-scope="scope">
            <a href="javascript:void(0)" class="btn" @click="toEdit(scope.row.id)">
              <svg-icon icon-class="edit" class="editIcon"></svg-icon>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" @size-change="handlePageSizeChange" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="listTotal">
      </el-pagination>
    </div>
    <el-dialog title="添加服务信息" :visible.sync="addDialogVisible" width="600px" :modal="true" :append-to-body="true" :close-on-click-modal=false @open="datareq">
      <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="链接地址" prop='url'>
          <el-input v-model="form.url" placeholder="请输入链接地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel" style="margin:20px 0 0 250px">取消</el-button>
          <el-button type="primary" @click="addOnSubmit">提交</el-button>
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
      tableData: [],
      listTotal: 0,
      listParams: {
        pageNum: 1,
        pageSize: 10
      },
      form: {
        url: ''
      }
    }
  },
  created() {
    this.listDate()
  },
  methods: {
    toEdit(id) {
      this.$router.push(`/storeAdmin/components/linkAddressEdit/${id}`)
    },
    listDate() {
      loadData('/store/page', this.listParams).then(data => {
        this.tableData = data.data
        this.listTotal = data.total
      })
    },
    datareq() {
      this.form.url = ''
    },
    cancel() {
      this.addDialogVisible = false
    },
    addOnSubmit() {
      loadData('/store/save', this.form).then(data => {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.listDate()
        this.addDialogVisible = false
      })
    },
    handleCurrentChange(val) {
      this.listParams.pageNum = val
      this.listDate()
    },
    handlePageSizeChange(val) {
      this.listParams.pageSize = val
      this.listDate()
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
    /deep/ .el-table__header-wrapper {
      height: 0;
    }
    /deep/ .el-input__inner {
      background: #c7cdd2;
    }
    /deep/ .serialNumber {
      padding-left: 20px;
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
