import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/products',
    method: 'get',
    params: query
  })
}
export function getOne(id) {
  return request({
    url: `/products/${id}`,
    method: 'get'
  })
}
