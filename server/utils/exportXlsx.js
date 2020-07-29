const fsPromises = require('fs').promises
const xlsx = require('node-xlsx')
const path = require('path')
function resolve(dir) {
  return path.join(process.cwd(), '.', dir)
}
async function downloadXlsx(data, name1) {
  var buffer = xlsx.build([{ name: 'sheet1', data: data }])
  var target_path = 'fileupload/' + new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()
  await fsPromises.mkdir(resolve(`assets/${target_path}`), { recursive: true })
  target_path = target_path + '/' + name1 + '' + new Date().getTime() + '.xls'
  await fsPromises.writeFile(resolve(`assets/${target_path}`), buffer, 'binary')
  return target_path
}

module.exports = {
  downloadXlsx
}

downloadXlsx([['No.', 'Plate No.', 'Group(0 black list, 1 white list)', 'Expiry Date (Format: YYYY-MM-DD, e.g., 2017-12-07)'], [1, 'MLC1864', '1', '2020-04-04']], 'test1111')
