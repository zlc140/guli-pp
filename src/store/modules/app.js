const app = {
  state: {
    openTab: {}
  },
  mutations: {
    setTabInfo: (state, obj) => {
      state.openTab = obj
    }
  }
}

export default app
