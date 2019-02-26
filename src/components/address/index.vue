<template>
  <el-cascader
    :options="pro"
    v-model="selectedOptions"
    placeholder="请选择省市区"
    change-on-select
    @change="handleChange">
  </el-cascader>
</template>

<style scoped>

</style>

<script>
  import data from './data.js'

  export default {
    data() {
      return {
        data: data,
        pro: '',
        selectedOptions: []
      }
    },
    created() {
      this._initData()
    },
    methods: {
      _initData() {
        const cloneArray = function(obj) {
          const newArray = []
          for (const i in obj) {
            newArray[i] = typeof obj[i] === 'object' ? cloneArray(obj[i]) : obj[i]
          }
          return newArray
        }
        const provinceAndCityDataPlus = cloneArray(this.data)
        const obj = {
          label: '全部',
          value: ''
        }
        provinceAndCityDataPlus.unshift(obj)
        for (let i = 0, len = provinceAndCityDataPlus.length; i < len; i++) {
          const province = provinceAndCityDataPlus[i].children
          if (province && province.length) {
            province.unshift(obj)

            for (let j = 0, len = province.length; j < len; j++) {
              const city = province[j].children
              if (city && city.length) {
                city.unshift(obj)
              }
            }
          }
        }
        this.pro = provinceAndCityDataPlus
      },
      handleChange(value) {
        this.$emit('select', value)
      }
    }
  }
</script>