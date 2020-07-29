const request = require('request')
const xml2js = require('xml2js')
const XLSX = require('xlsx')
const parseString = new xml2js.Parser({ explicitArray: false }).parseString

class HikCameraSDK {
  constructor(info) {
    this.ip = info.ip
    this.httpPort = info.httpPort
    this.username = info.username
    this.password = info.password
    if (info.inputChannels && info.inputChannels[0]) this.channel = info.inputChannels[0] // 默认使用第一个视频输入通道
  }

  async _get(url) {
    const { ip, username, password, httpPort } = this
    return await new Promise((res, rej) => {
      request({
        url: `http://${ip}:${httpPort}${url}`,
        auth: {
          user: username,
          pass: password,
          'sendImmediately': false
        }
      }, (err, response, body) => {
        if (err) return rej(err)
        parseString(body, (err, result) => {
          if (err) return rej(err)
          res(result)
        })
      })
    })
  }

  async _put(url, body) {
    const { ip, username, password, httpPort } = this
    return await new Promise((res, rej) => {
      request.put(`http://${ip}:${httpPort}${url}`, // 查看所有通道的报警配置
        {
          auth: {
            user: username,
            pass: password,
            'sendImmediately': false
          },
          body
        }, (err, response, body) => {
          if (err) return rej(err)
          parseString(body, (err, result) => {
            if (err) return rej(err)
            res(result)
          })
        })
    })
  }

  /**
   * 获取通道
   * @return {Promise<void>}
   */
  async getInputChannels() {
    const result = await this._get('/ISAPI/System/Video/inputs/channels')
    return result
  }
  // 支持的功能查看
  async authITC() {
    const result = await this._get('/ISAPI/ITC/capability')
    return result
  }

  // 查看 上报报警的http配置
  async getEventHttpHost() {
    const result = await this._get('/ISAPI/Event/notification/httpHosts')
    return result
  }

  // 设置上报监听配置
  async setEventHttpHost() {
    const body = `<HttpHostNotificationList>
<HttpHostNotification>
<id>1</id>
<url>/api-v1/hk-test</url>
<protocolType>HTTP</protocolType>
<parameterFormatType>XML</parameterFormatType>
<addressingFormatType>ipaddress</addressingFormatType>
<ipAddress>192.168.1.6</ipAddress>
<portNo>4042</portNo>
<httpAuthenticationMethod>none</httpAuthenticationMethod>
</HttpHostNotification>
</HttpHostNotificationList>`
    const result = await this._put('/ISAPI/Event/notification/httpHosts', body)
    return result
  }

  // 判断是否是基线协议推送 车牌监听需要基线协议监听
  async isAlarmHttpPushProtocol() {
    const result = await this._get('/ISAPI/Traffic/ANPR/alarmHttpPushProtocol')
    return result
  }

  // 设置基线协议 车牌监控需要
  async setAlarmHttpPushProtocol() {
    const body = `<AlarmHttpPushProtocol version="2.0" xmlns="http://www.std-cgi.com/ver20/XMLSchema">
<baseLineProtocolEnabled>true</baseLineProtocolEnabled>
</AlarmHttpPushProtocol>`
    const result = await this._put('/ISAPI/Traffic/ANPR/alarmHttpPushProtocol', body)
    return result
  }

  // 获取当前摄像头的车牌名单
  async getLicensePlateAuditData() {
    const { ip, username, password, httpPort } = this
    const result = await new Promise((res, rej) => {
      request({
        url: `http://${ip}:${httpPort}/ISAPI/Traffic/channels/${this.channel.id}/licensePlateAuditData`,
        auth: {
          user: username,
          pass: password,
          'sendImmediately': false
        },
        encoding: null
      }, (err, response, body) => {
        if (err) return rej(err)
        const wk = XLSX.read(body)
        res(XLSX.utils.sheet_to_json(wk.Sheets.sheet1))
      })
    })
    return result
  }

  // 设置当前摄像头的车牌名单
  async setLicensePlateAuditData(body) {
    const result = await this._put(`/ISAPI/Traffic/channels/${this.channel.id}/licensePlateAuditData`, body)
    return result
  }

  // 获取当前设备的网络信息
  async getNetWork() {
    const result = await this._get('/ISAPI/System/network/interfaces')
    return result.NetworkInterfaceList.NetworkInterface
  }
}

module.exports = HikCameraSDK

// const hc = new HikCameraSDK({ ip: '192.168.1.64', httpPort: 80, username: 'admin', password: 'Nayota88223080' })
//
// hc.getNetWork().then(res => {
//   console.log(res)
// })
