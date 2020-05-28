<template>
  <div>
    <div style="color: #333;background-color: #f5f5f5;border-color: #ddd;height:50px">
      <el-select
        v-model="checkQuery.control"
        placeholder="All Sites"
        filterable
        style="width: 20%;height:20px;padding-top:10px"
        size="mini"
        value-key="value"
        @change="getList"
      >
        <el-option
          v-for="item in controls"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        >
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
      <span style="line-height:50px">Most Recent Plate Groups</span>
      <el-button-group style="float: right;padding-top:10px">
        <el-button type="info" size="mini" icon="el-icon-arrow-left" @click="getList('newer')">Newer</el-button>
        <el-button type="info" size="mini" @click="getList('older')">Older<i class="el-icon-arrow-right el-icon--right" /></el-button>
      </el-button-group>
    </div>
    <el-table v-loading="loading" :data="list" style="width: 100%;">
      <el-table-column label="Site" min-width="100">
        <template slot-scope="{row}">
          {{ row.control.name }}
        </template>
      </el-table-column>
      <el-table-column label="Camera" min-width="100" align="center">
        <template slot-scope="{row}">
          {{ row.httpdirve.name }}
        </template>
      </el-table-column>
      <el-table-column label="Country" min-width="100" align="center">
        <template slot-scope="{row}">
          {{ row.country }}
        </template>
      </el-table-column>
      <el-table-column label="Plate Number" min-width="120" align="center">
        <template slot-scope="{row}">
          {{ row.licensePlate }}
        </template>
      </el-table-column>
      <el-table-column label="Vehicle" min-width="100" align="center">
        <template slot-scope="{row}">
          {{ row.plateType }}
        </template>
      </el-table-column>
      <el-table-column label="Direction" min-width="100" align="center">
        <template slot-scope="{row}">
          {{ row.direction }}
        </template>
      </el-table-column>
      <el-table-column label="Confidence" min-width="100" align="center">
        <template slot-scope="{row}">
          {{ row.confidenceLevel }}
        </template>
      </el-table-column>
      <el-table-column label="Time" min-width="100" align="center">
        <template slot-scope="{row}">
          {{ row.dateTime | parseTime('{h}:{i}') }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { transactionList } from '@/api/remoteSearch'
// import { list } from '@/api/controls'
import { list as checkRecordsList } from '@/api/checkRecords'
import { list as checkList } from '@/api/checks'
import { list as controlList } from '@/api/controls'
import { list as hardwareWordList } from '@/api/hardwareword'
import { list as httpdrivesList } from '@/api/httpDrives'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null,
      loading: false,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '-id'
      },
      checkQuery: {
        parentName: 'HttpDrive',
        parentKey: 'parent',
        shortAddress: '0',
        autopopulate: false
      },
      hardwareCount: 0,
      httpdriveMap: {},
      controlMap: {},
      controls: [],
      httpdrives: undefined
    }
  },
  watch: {
    propData: async function() {
      await this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      this.controlMap = {}
      const hardwarewords = (await hardwareWordList({ 'code': 'HIK_TRAFFIC_CA', 'type': 2 })).data.rows
      const hardwareword = hardwarewords[0]
      // 查询设备
      this.httpdrives = (await httpdrivesList({ hardwareWord: hardwareword._id })).data.rows
      this.httpdrives.map((item, index, arr) => {
        this.httpdriveMap[item._id] = item
        arr[index] = item._id
      })
      this.controls = (await controlList({})).data.rows
      for await (const control of this.controls) {
        this.controlMap[control._id] = control
      }
      await this.getList()
    },
    async getList(type) {
      this.loading = true
      const _this = this
      this.checkQuery.parents = this.httpdrives
      if (type === 'older') {
        this.listQuery.page++
      } else if (type === 'newer') {
        this.listQuery.page--
        if (this.listQuery.page < 1) {
          this.listQuery.page = 1
        }
      } else {
        this.listQuery.page = 1
      }
      const checks = (await checkList(this.checkQuery)).data.rows
      await checks.map((item, index, arr) => {
        arr[index] = item._id
      })
      this.listQuery.checks = checks
      checkRecordsList(this.listQuery).then(response => {
        if (response.data.rows.length > 0) {
          response.data.rows.map((item, index, arr) => {
            try {
              if (item.valueStr !== null) {
                arr[index] = JSON.parse(item.valueStr)
                if (_this.httpdriveMap[item.check.parent] !== undefined) {
                  arr[index].httpdirve = _this.httpdriveMap[item.check.parent]
                }
                if (arr[index].httpdirve !== undefined && _this.controlMap[arr[index].httpdirve.control] !== undefined) {
                  arr[index].control = _this.controlMap[arr[index].httpdirve.control]
                }
              }
            } catch (e) {
              console.log(e)
            }
          })
        }
        this.list = response.data.rows
        this.loading = false
      })
    }
  }
}
</script>
