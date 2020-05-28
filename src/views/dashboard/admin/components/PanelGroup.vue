<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="camare" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            摄像头
          </div>
          <count-to :start-val="0" :end-val="hardwareCount" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="nested" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            站点
          </div>
          <count-to :start-val="0" :end-val="controlCount" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="car" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            一周车牌
          </div>
          <count-to :start-val="0" :end-val="plateNumber" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="alert" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            警告
          </div>
          <count-to :start-val="0" :end-val="alertNumber" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getCount } from '@/api/controls'
import { list as hardwareWordList } from '@/api/hardwareword'
import { list as httpdrivesList } from '@/api/httpDrives'
import { list as checkList } from '@/api/checks'
import { count } from '@/api/checkRecords'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      controlCount: 0,
      hardwareCount: 0,
      plateNumber: 0,
      alertNumber: 0
    }
  },
  created() {
    this.getCount()
  },
  methods: {
    // 点击触发图标
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    async getCount() {
      this.controlCount = (await getCount({})).data
      const hardwarewords = (await hardwareWordList({ 'code': 'HIK_TRAFFIC_CA', 'type': 2 })).data.rows
      const hardwareword = hardwarewords[0]
      // 查询设备
      const http_data = (await httpdrivesList({ hardwareWord: hardwareword._id })).data
      this.hardwareCount = http_data.total
      const httpdrives = http_data.rows
      httpdrives.map((item, index, arr) => {
        // this.httpdriveMap[item._id] = item
        arr[index] = item._id
      })
      const checks = (await checkList({ parentName: 'HttpDrive', 'parents': httpdrives, parentKey: 'parent', shortAddress: '0', autopopulate: false })).data.rows
      await checks.map((item, index, arr) => {
        arr[index] = item._id
      })
      const value2 = []
      const now = new Date()
      const date = now.getDate()
      now.setDate(date - 7)
      now.setSeconds(0)
      now.setMinutes(0)
      now.setHours(0)
      now.setMilliseconds(0)
      const bdate = new Date(now).getTime()
      value2.push(bdate)
      now.setDate(date)
      now.setSeconds(59)
      now.setMinutes(59)
      now.setHours(23)
      now.setMilliseconds(0)
      const edate = new Date(now).getTime()
      value2.push(edate)
      this.plateNumber = (await count({ checks: checks, range: value2, time: 'recordTime' })).data
      const alert_checks = (await checkList({ parentName: 'HttpDrive', 'parents': httpdrives, parentKey: 'parent', shortAddress: '2', autopopulate: false })).data.rows
      await alert_checks.map((item, index, arr) => {
        arr[index] = item._id
      })
      this.alertNumber = (await count({ checks: alert_checks, query: { '$and': [{ value: { $ne: null }}, { value: { $ne: 2 }}] }})).data
    }
  }
}
</script>

<style rel="scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #9b5821
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #9b5821
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
