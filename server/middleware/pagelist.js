const mongoose = require('mongoose')

module.exports = {
  getPageList
}

async function getPageList(Model, currentPage = 1, pageSize = 10, conditions = {}, fields, options = {}, populate = []) {
  if (typeof Model !== 'function') {
    throw new TypeError('Model is not a function')
  }
  if (!(Model.prototype instanceof mongoose.Model)) {
    throw new TypeError('Model is not a mongoose.Model')
  }
  pageSize = Number(pageSize)
  const StartLine = (currentPage - 1) * pageSize
  const total = await Model.countDocuments(conditions).exec()
  const q = Model.find(conditions, fields, options).limit(pageSize).skip(StartLine)
  for (const x in populate) {
    q.populate(populate[x])
  }
  const rows = await q.exec()
  return { total, rows }
}

