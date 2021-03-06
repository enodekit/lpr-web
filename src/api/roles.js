import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/roles',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function updateOne(data) {
  return request({
    url: `/roles/${data._id}`,
    method: 'put',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}

export function deleteMany(ids) {
  return request({
    url: '/roles',
    method: 'delete',
    data: ids // delete传递主体要包含在data里
  })
}
