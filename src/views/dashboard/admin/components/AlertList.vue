<template>
  <div style="max-height:500px;margin: 4%;width: 92%;">
    <div style="margin-bottom: 20px;">
      <a v-for="data in lists" :key="data._id" style="display: block;border:1px solid #ddd;font-size:14px;color: #555;padding: 10px 15px;">
        <i class="el-icon-s-data el-icon--right" />
        <!--<span style="margin-left:10px">-->
        {{ data.valueJSON!==undefined?data.valueJSON.licensePlate:'' }}({{ data.valueJSON!==undefined?data.valueJSON.country:'' }})
        <!--</span>-->
        <span style="float: right">
          {{ data.valueJSON!==undefined?data.recordTime:'' | parseTime('{h}:{i}') }}
        </span>
      </a>
    </div>
    <div v-if="lists.length>0" style="border:1px solid #ddd;line-height:40px;text-align: center;border-radius:4px">
      View All Alerts
    </div>
    <div v-if="lists.length<=0" style="border:1px solid #ddd;line-height:40px;text-align: center;border-radius:4px">
      暂无数据
    </div>
  </div>
</template>

<script>

import { list as checkRecordsList } from '@/api/checkRecords'
import { list as checkList } from '@/api/checks'
// import { list as controlList } from '@/api/controls'
import { list as hardwareWordList } from '@/api/hardwareword'
import { list as httpdrivesList } from '@/api/httpDrives'
export default {
  data() {
    return {
      lists: []
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    async initChart() {
      const hardwarewords = (await hardwareWordList({ 'code': 'HIK_TRAFFIC_CA', 'type': 2 })).data.rows
      const hardwareword = hardwarewords[0]
      // 查询设备
      const http_data = (await httpdrivesList({ hardwareWord: hardwareword._id })).data
      const httpdrives = http_data.rows
      httpdrives.map((item, index, arr) => {
        arr[index] = item._id
      })
      const checks = (await checkList({ parentName: 'HttpDrive', 'parents': httpdrives, parentKey: 'parent', shortAddress: '0', autopopulate: false })).data.rows
      await checks.map((item, index, arr) => {
        arr[index] = item._id
      })
      checkRecordsList({ checks: checks, limit: 10, query: { 'valueJSON': { $ne: null }, 'valueJSON.type': { $ne: 2 }}, sort: { recordTime: -1 }}).then(response => {
        this.lists = response.data.rows
      })
    }
  }
}
</script>
