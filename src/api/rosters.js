import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/rosters',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '/rosters',
    method: 'post',
    data
  })
}

export function updateOne(data) {
  return request({
    url: `/rosters/${data._id}`,
    method: 'put',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/rosters/${id}`,
    method: 'delete'
  })
}

export function deleteMany(ids) {
  return request({
    url: '/rosters',
    method: 'delete',
    data: ids // delete传递主体要包含在data里
  })
}

export function importRosters(data) {
  return request({
    url: '/rosters/import',
    method: 'post',
    data
  })
}

export function exportRosters(query) {
  return request({
    url: '/rosters/export',
    method: 'get',
    responseType: 'blob',
    params: query
  })
}
