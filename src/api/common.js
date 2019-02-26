import request from '@/utils/request'
import verifySign from '@/utils/verify'

export function loadData(url, params) {
  const obj = verifySign(params)
  return request({
    url: url,
    method: 'post',
    data: obj
  })
}
