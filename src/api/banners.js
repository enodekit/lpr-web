import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/banners',
    method: 'get',
    params: query
  })
}
