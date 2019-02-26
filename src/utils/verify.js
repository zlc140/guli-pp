const verifySign = function(param) {
  const constParams = {
    // timestamp: Math.round(new Date().valueOf())
  }
  const body = param || {}
  Object.assign(body, constParams)
  return body
}
export default verifySign

