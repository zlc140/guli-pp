const getters = {
  openTab: state => state.app.openTab,
  token: state => state.user.token,
  name: state => state.user.name,
  uploadFileHeader: state => {
    return {
      'Access-Token': state.user.token
    }
  }
}
export default getters
