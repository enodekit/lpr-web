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
export function aggregate(query) {
  return request({
    url: `/products/aggregate`,
    method: 'get',
    params: query
  })
}
export function tagCount(query) {
  return request({
    url: `/products/tag-count`,
    method: 'get',
    params: query
  })
}
