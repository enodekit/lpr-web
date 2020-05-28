import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/productClasss',
    method: 'get',
    params: query
  })
}
