<template>
  <div class="main">
    <div class="header">
      <div class="title">
        <h2>
          <span></span>
          商品信息管理列表
        </h2>
      </div>
      <div class="add">
        <a href="javascript:void(0)" @click="toAdd">添加内容</a>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" height=600 style="width: 100%" row-class-name="hover-hand">
        <el-table-column prop="slideshowPic" class-name="serialNumber" label="商品图片">
          <template slot-scope="scope">
            <img class="pic" :src="imgUrl+scope.row.fileId" alt="品牌图片">
          </template>
        </el-table-column>
        <el-table-column prop="url" label="商品链接">
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间">
        </el-table-column>
        <el-table-column prop="operation" class-name="operation" label="更多操作" align='center'>
          <template slot-scope="scope">
            <a href="javascript:void(0)" class="btn" @click="toEdit(scope.row.id)">
              <svg-icon icon-class="edit" class="editIcon"></svg-icon>
            </a>
            <a href="javascript:void(0)" class="btn" @click="removeItem(scope.row.id)">
              <svg-icon icon-class="delete" class="deleteIcon"></svg-icon>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" @size-change="handlePageSizeChange" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="listTotal">
      </el-pagination>
    </div>
    <comfirm-remove ref="dialog" @define="comfirmRemove" @close="handelColseDialog"></comfirm-remove>
  </div>
</template>
<script>
import { loadData } from '@/api/common'
import { imgUrl } from '@/api/url'
import ComfirmRemove from '@/components/dialog/comfirm-remove'
import moment from 'moment'
export default {
  data() {
    return {
      imgUrl,
      tableData: [],
      listTotal: 0,
      listParams: {
        type: 1,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  components: {
    ComfirmRemove
  },
  created() {
    this.listDate()
  },
  methods: {
    toEdit(id) {
      this.$router.push(`/commodityInfo/components/commodityInfoEdit/${id}`)
    },
    toAdd() {
      this.$router.push(`/commodityInfo/components/commodityInfoAdd`)
    },
    listDate() {
      loadData('/goods/page', this.listParams).then(data => {
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
      this.listDate()
    },
    handlePageSizeChange(val) {
      this.listParams.pageSize = val
      this.listDate()
    },
    handelColseDialog() {
      this.multipleSelection = []
    },
    removeItem(id) {
      this.removeId = id
      this.$refs.dialog.show('删除商品信息', '您确定删除该商品信息吗？')
    },
    comfirmRemove() {
      loadData('/goods/delete/' + this.removeId).then(data => {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.listDate()
      })
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
            max-width: 40px;
            max-height: 40px;
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
