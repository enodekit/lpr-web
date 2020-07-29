const XLSX = require('xlsx')
var workbook = XLSX.readFile('me=teNolist_192.168.1.64_20200319150433.xls')
console.log(JSON.stringify(workbook))

var ws = XLSX.utils.json_to_sheet([
  { 'No.': 1, 'Plate No.': 'MLC1864', 'Group(0 black list, 1 white list)': 1, 'Expiry Date (Format: YYYY-MM-DD, e.g., 2017-12-07)': '2020-04-04' },
  { 'No.': 1, 'Plate No.': 'MLC18631', 'Group(0 black list, 1 white list)': 1, 'Expiry Date (Format: YYYY-MM-DD, e.g., 2017-12-07)': '2020-04-04' }
], { header: ['No.', 'Plate No.', 'Group(0 black list, 1 white list)', 'Expiry Date (Format: YYYY-MM-DD, e.g., 2017-12-07)'] })
console.log(ws)

const workbook22 = {
  'SheetNames': ['sheet1'],
  'Sheets': {
    'sheet1': ws
  }
}
var buf = XLSX.write(workbook22, { bookType: 'biff8', type: 'buffer' })
console.log(buf)
