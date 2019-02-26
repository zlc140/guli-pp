<template>
  <div>
    <el-select v-model="DATA.s" @change='selpro' placeholder="请选择">
      <el-option
        v-for="item in pro"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>；
    
    <el-select v-model="DATA.ss" @change='selcity' placeholder="请选择">
      <el-option
        v-for="item in city"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    
    <el-select v-model="DATA.q" @change='result' placeholder="请选择">
      <el-option
        v-for="item in county"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  
  
  
  </div>
</template>

<style scoped>
  .row {
    display: flex
  }
  
  .col {
    flex-grow: 1
  }
  
  select {
    width: 96%;
    padding: .5rem;
    border: 1px solid #eee;
    margin: 2%;
    border-radius: .3rem;
    font-size: 1.2rem;
  }
</style>

<script>
  import data from './data.js'

  export default {
    data() {
      return {
        data: data,
        pro: '',
        city: '',
        county: '',
        f: {
          p: 0,
          c: 0,
          cc: 0
        },
        DATA: {
          s: '',
          ss: '',
          q: ''
        }
      }
    },
    created() {
      this.pro = this.data
      this.city = this.pro[0].city
      this.county = this.city[0].area
      this.result()
    },
    methods: {
      selpro(handleChange) {
        console.log(handleChange, 'handleChange')
        console.log(this.DATA)
        console.log(this.pro, 'this.pro')
        console.log(this.f.p, 'this.f.p')
        this.pro.forEach(v => {
          if (v.id === handleChange) {
            this.city = v.city
            this.county = this.city[0].area
          }
        })
        this.f.c = 0
        this.f.cc = 0
        this.result()
      },
      selcity(handleChange) {
        this.city.forEach(v => {
          if (v.id === handleChange) {
            this.county = v.area
          }
        })
        this.f.cc = 0
        this.result()
      },
      result() {
        this.$emit('select')
      }
    }
  }
</script>