import request from '../utils/request'
import currentUrl from '../utils/env'

export function getBlogList(params) {
  return request({
    method: 'Get',
    url: currentUrl + '/getBlog',
    params: params
  })
}

export function postBlog(params) {
  return request({
    method: 'Post',
    url: currentUrl + '/postBlog',
    params: params
  })
}

export function getSingleBlog(params) {
  return request({
    method: 'Get',
    url: currentUrl + '/getSingleBlog',
    params: params
  })
}

export function login(params) {
  return request({
    method: 'Post',
    url: currentUrl + '/login',
    params: params
  })
}

export function register(params) {
  return request({
    method: 'Post',
    url: currentUrl + '/register',
    params: params
  })
}

export function getItemList(params) {
  return request({
    method: 'Get',
    url: currentUrl + '/getItemList',
    params: params
  })
}

export function addUser(params) {
  return request({
    method: 'Post',
    url: currentUrl + '/addUser',
    params: params
  })
}

export function getUserList(params) {
  return request({
    method: 'Get',
    url: currentUrl + '/getUserList',
    params: params
  })
}
