<template>
  <div class="main">
    <div class="left">
      <div class="header">
        <div class="title">
          <h2>
            <span></span>
            一级菜单
          </h2>
        </div>
        <div class="add">
          <a href="javascript:void(0)" @click="toAddMenu">添加一级菜单</a>
        </div>
      </div>
      <div class="content">
        <el-table height="500" :highlight-current-row='true' :data="firsttableData" style="width: 100%" @cell-click="selectRow">
          <el-table-column type="index" :index="indexMethod" class-name="serialNumber" label="排序" width=180></el-table-column>
          <el-table-column prop="name" label="菜单名称">
          </el-table-column>
          <el-table-column prop="operation" class-name="operation" label="更多操作" align='right'>
            <template slot-scope="scope">
              <a href="javascript:void(0)" class="btn" @click="toEditMenu(scope.row.id)">
                <svg-icon icon-class="edit" class="editIcon"></svg-icon>
              </a>
              <a href="javascript:void(0)" class="btn" @click="removeItem(scope.row.id,1)">
                <svg-icon icon-class="delete" class="deleteIcon"></svg-icon>
              </a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="right">
      <div class="header">
        <div class="title">
          <h2>
            <span></span>
            二级菜单
          </h2>
        </div>
        <div class="add">
          <a href="javascript:void(0)" @click="toAddArticle">添加内容</a>
        </div>
      </div>
      <div class="content">
        <el-table :data="secondTableData" style="width: 100%">
          <el-table-column prop="name" class-name="serialNumber" label="文章名"></el-table-column>
          <el-table-column prop="operation" class-name="operation" label="更多操作" align='right'>
            <template slot-scope="scope">
              <a href="javascript:void(0)" class="btn" @click="toEditArticle(scope.row.id)">
                <svg-icon icon-class="edit" class="editIcon"></svg-icon>
              </a>
              <a href="javascript:void(0)" class="btn" @click="removeItem(scope.row.id,2)">
                <svg-icon icon-class="delete" class="deleteIcon"></svg-icon>
              </a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <comfirm-remove ref="dialog" @define="comfirmRemove" @close="handelColseDialog"></comfirm-remove>
  </div>
</template>
<script>
import { loadData } from '@/api/common'
import ComfirmRemove from '@/components/dialog/comfirm-remove'
export default {
  data() {
    return {
      firsttableData: [],
      secondTableData: [],
      menuId: '',
      removeId: '',
      removeType: ''
    }
  },
  components: {
    ComfirmRemove
  },
  created() {
    this.firstListDate()
  },
  methods: {
    toEditMenu(id) {
      this.$router.push(`/infoArticle/components/editMenu/${id}`)
    },
    toAddMenu() {
      this.$router.push(`/infoArticle/components/addMenu`)
    },
    toEditArticle(id) {
      console.log(id)
      this.$router.push(`/infoArticle/components/editArticle/${id}`)
    },
    toAddArticle() {
      console.log(this.menuId)
      this.$router.push(
        `/infoArticle/components/addArticle/${this.menuId}`
      )
    },
    indexMethod(index) {
      return index + 1
    },
    firstListDate() {
      loadData('/article_menu/page', {
        type: 2
      }).then(data => {
        this.firsttableData = data.data
      })
    },
    secondListDate() {
      loadData('/article_content/page', {
        menuId: this.menuId
      }).then(data => {
        this.secondTableData = data.data
      })
    },
    selectRow(row, column, cell, event) {
      this.menuId = row.id
      this.secondListDate()
    },
    handelColseDialog() {
      this.multipleSelection = []
    },
    removeItem(id, type) {
      this.removeId = id
      this.removeType = type
      this.$refs.dialog.show('删除一级菜单信息', '您确定删除该一级菜单信息吗？')
    },
    comfirmRemove() {
      const urls = this.removeType === 1 ? '/article_menu/delete/' : '/article_content/delete/';
      loadData(urls + this.removeId).then(data => {
        this.$message({
          message: data.message,
          type: 'success'
        })
        if (this.removeType === 1) {
          this.firstListDate()
        } else {
          this.secondListDate()
        }
      })
    },
    handleCurrentChange(val) {
      this.listParams.pageNum = val
      this.firstListDate()
    },
    handlePageSizeChange(val) {
      this.listParams.pageSize = val
      this.firstListDate()
    }
  }
}
</script>
<style lang='scss' scoped>
.main {
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    width: 100%;
  }
  .right {
    margin-left: 20px;
  }
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
            max-width: 80px;
            max-height: 80px;
          }
        }
      }
    }
  }
}
</style>
