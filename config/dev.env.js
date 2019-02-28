'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API
  BASE_API: '"http://47.75.38.171/backend"',
  // BASE_API: '""',
  // 跳转
  BASE_HREF: '"http://127.0.0.1:2018"'
})
