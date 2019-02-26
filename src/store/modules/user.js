import { getToken, removeToken, setToken, getName, removeName, setName } from '@/utils/auth'
const user = {
  state: {
    token: getToken(),
    name: getName()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    }
  },
  actions: {
    // 登入
    LoginIn({ commit, state }, userLoginInfo) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', userLoginInfo.token)
        commit('SET_NAME', userLoginInfo.name)
        setToken(userLoginInfo.token)
        setName(userLoginInfo.name)
        resolve()
      })
    },
    // 登出
    LoginOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        removeToken()
        removeName()
        resolve()
      })
    }
  }
}
export default user
