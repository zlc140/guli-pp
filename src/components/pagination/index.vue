<template>
  <div class="pagination">
    <div class="size">
      <el-select v-model="sizeValue" class="choose-size" @change="sizeChange">
        <el-option
          v-for="item in sizeOptions"
          :value="item.value"
          :label="item.label"
          :key="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="link-box">
      <span style="margin-right:20px;">共{{total}}条</span>
      <el-select v-model="pageValue" class="choose-page" placeholder="请选择" @change="pageChange">
        <el-option
          v-for="item in pageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="btn-prev" @click="prevClick" :class="{disabled: realPageValue < 2}">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="btn-next" @click="nextClick" :class="{disabled: realPageValue > totalPageNum - 1 }">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['total'],
  data() {
    return {
      sizeOptions: [
        {
          label: '每页10条',
          value: 10
        },
        {
          label: '每页20条',
          value: 20
        },
        {
          label: '每页50条',
          value: 50
        }
      ],
      sizeValue: 10,
      pageOptions: [],
      pageValue: '',
      realPageValue: 1,
      totalPageNum: 0
    }
  },
  created() {
    this.initPageNum()
  },
  methods: {
    initPageNum() {
      this.pageOptions = []
      this.totalPageNum = this.total % this.sizeValue === 0 ? this.total / this.sizeValue : parseInt(this.total / this.sizeValue) + 1
      for (let i = 0; i < this.totalPageNum; i++) {
        this.pageOptions.push({
          label: i + 1,
          value: i + 1
        })
      }
      this.realPageValue = 1
      this.pageValue = `1/${this.totalPageNum}页`
    },
    sizeChange() {
      this.$emit('size-change', this.sizeValue)
      this.initPageNum()
    },
    pageChange() {
      this.realPageValue = this.pageValue
      this.setPageNum()
    },
    setPageNum() {
      this.pageValue = `${this.realPageValue}/${this.totalPageNum}页`
      this.$emit('current-change', this.realPageValue)
    },
    prevClick() {
      if (!(this.realPageValue > 1)) {
        return false
      }
      this.realPageValue--
      this.setPageNum()
    },
    nextClick() {
      if (this.realPageValue > this.totalPageNum - 1) {
        return false
      }
      this.realPageValue++
      this.setPageNum()
    }
  },
  watch: {
    total() {
      this.initPageNum()
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .link-box {
      display: flex;
      align-items: center;
    }
    .choose-size {
      width: 110px;
    }
    .choose-page {
      width: 110px;
    }
    .btn-prev, .btn-next{
      width: 40px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #D9D9D9;
      cursor: pointer;
      &.disabled{
        background: #F5F5F5
      }
    }
    .btn-prev:hover, .btn-next:hover{
      border: #0076FF 1px solid;
    }
    .btn-prev{
      border-right: 0;
      margin-left: 8px;
      border-radius: 2px 0 0 2px;
    }
    .btn-next{
      border-radius: 0px 2px 2px 0;
    }
  }
</style>

<style lang="scss">
.pagination {
  .el-input__inner{
    background: #F5F5F5;
    font-size: 14px;
    height: 30px;
  }
  .el-input__inner:hover {
    background: #e8e8e8;
  }
  .el-input__icon {
    line-height: 32px;
  }
}
</style>

