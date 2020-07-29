// const mongoose = require('mongoose')
const qiniu = require('qiniu')
// qiniu.config({
//   access_key: 'fiF1i34jBtSi80DGmrDKLsyeeZY5QspWCjiyeoxH',
//   secret_key: '6KZ9YAnm5Yr6eTe6wYgPOSD-BS_lvK3IqludliHn'
// })
var accessKey = 'fiF1i34jBtSi80DGmrDKLsyeeZY5QspWCjiyeoxH'
var secretKey = '6KZ9YAnm5Yr6eTe6wYgPOSD-BS_lvK3IqludliHn'
var cname = 'http://qcc1othr1.bkt.clouddn.com'
qiniu.conf.ACCESS_KEY = accessKey
qiniu.conf.SECRET_KEY = secretKey
const bucket = 'nbtonsin'
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
var cdnManager = new qiniu.cdn.CdnManager(mac)

// var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
// const imagesBucket = new qiniu.Bucket('wbb')
function uptoken(bucket, key) {
  var options = {
    scope: bucket + ':' + key,
    expires: 7200
  }
  var putPolicy = new qiniu.rs.PutPolicy(options)
  return putPolicy.uploadToken(mac)
}
class QiniuCtrl {
// 在这里新加函数或者修改继承的函数
//   async getToken() {
//     const token = imagesBucket.key('wbb').token()
//     console.log(token)
//     return token
//   }

  async upload(file) {
    const token = await uptoken(bucket, file.name)
    var config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z0
    var formUploader = await new qiniu.form_up.FormUploader(config)
    console.log(token)
    console.log(config)
    var putExtra = new qiniu.form_up.PutExtra()
    await formUploader.putFile(token, file.name, file.path, putExtra, function(err, ret) {
      if (!err) {
        // 上传成功， 处理返回值
        console.log(ret)
      } else {
        // 上传失败， 处理返回代码
        console.log(err)
      }
    })
    var bucketManager = new qiniu.rs.BucketManager(mac, config)
    var publicDownloadUrl = bucketManager.publicDownloadUrl(cname, file.name)
    console.log(publicDownloadUrl)
    return publicDownloadUrl
    // console.log(a)
    // console.log('img2', img)
    // return img
    // await imagesBucket.putFile(file.name, file.path, function(err, reply) {
    //   if (err) {
    //     return console.error(err)
    //   }
    //   console.log(reply)
    // })
    // var picture = await imagesBucket.key(file.name)
    // var picUrl = await picture.url()
    // return picUrl
  }
  async stat() {
    // var config = new qiniu.conf.Config()
    // var bucketManager = new qiniu.rs.BucketManager(mac, config)
    //
    // // bucketManager.batch('chtype', function(err, ate) {
    // //   console.log(err, ate)
    // // })
    // var startDate = '2020-02-28'
    // var endDate = '2020-03-01'
    // var granularity = 'day'
    // var select = 'hits'
    // bucketManager.rs_chtype(startDate, endDate, granularity, select, function(err, rea) {
    //   console.log(err, rea)
    // })
    // var domains = [
    //   'http://q6gadpis0.bkt.clouddn.com/80.png'
    // ]
    // cdnManager.prefetchUrls(domains, function(err, atc) {
    //   console.log(err, atc)
    // })
    // cdnManager.getCdnLogList(domains, logDay, function(err, respBody, respInfo) {
    //   if (err) {
    //     throw err
    //   }
    //   console.log(respInfo.statusCode)
    //   if (respInfo.statusCode === 200) {
    //     var jsonBody = respBody
    //     if (typeof jsonBody === 'string') { jsonBody = JSON.parse(respBody) }
    //     var code = jsonBody.code
    //     console.log(code)
    //     var logData = jsonBody.data
    //     console.log(jsonBody)
    //     domains.forEach(function(domain) {
    //       console.log('log for domain: ' + domain)
    //       var domainLogs = logData[domain]
    //       console.log(logData)
    //       if (domainLogs != null) {
    //         domainLogs.forEach(function(logItem) {
    //           console.log(logItem.name)
    //           console.log(logItem.size)
    //           console.log(logItem.mtime)
    //           console.log(logItem.url)
    //         })
    //         console.log('------------------')
    //       }
    //     })
    //   }
    // })
    // cdnManager.getCdnLogList(startDate, endDate, granularity, domains, function(err,
    //   respBody, respInfo) {
    //   if (err) {
    //     throw err
    //   }
    //   console.log(respInfo.statusCode)
    //   if (respInfo.statusCode === 200) {
    //     var jsonBody = respBody
    //     if (typeof respBody === 'string') {
    //       jsonBody = JSON.parse(respBody)
    //     }
    //     var code = jsonBody.code
    //     console.log(code)
    //     var tickTime = jsonBody.time
    //     console.log(tickTime)
    //     var fluxData = jsonBody.data
    //     domains.forEach(function(domain) {
    //       var fluxDataOfDomain = fluxData[domain]
    //       if (fluxDataOfDomain != null) {
    //         console.log('flux data for:' + domain)
    //         var fluxChina = fluxDataOfDomain['china']
    //         var fluxOversea = fluxDataOfDomain['oversea']
    //         console.log(fluxChina)
    //         console.log(fluxOversea)
    //       } else {
    //         console.log('no flux data for:' + domain)
    //       }
    //       console.log('----------')
    //     })
    //   }
    // })
  }
}

module.exports = new QiniuCtrl()

