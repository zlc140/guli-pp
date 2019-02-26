import Cookies from 'js-cookie'

const TokenKey = 'Access-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get('name')
}

export function setName(token) {
  return Cookies.set('name', token)
}

export function removeName() {
  return Cookies.remove('name')
}
