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