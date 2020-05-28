<template>
  <div class="chart" style="height:300px;margin: 4%;width: 92%;" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { sequential } from '@/api/checkRecords'
import { list as controlList } from '@/api/controls'
import { list as checkList } from '@/api/checks'
import { list as hardwareWordList } from '@/api/hardwareword'
import { list as httpdrivesList } from '@/api/httpDrives'
export default {
  data() {
    return {
      chart: null,
      loading: false,
      listQuery: {
        sort: { recordTime: 1 },
        time: 'recordTime',
        range: []
      },
      group: { _id: '$check', count: { $sum: 1 }},
      controlMap: {},
      checkMap: {},
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: []
        },
        calculable: true,
        series: [
          {
            name: 'Plates',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  methods: {
    async initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      const controls = (await controlList({})).data.rows
      for await (const control of controls) {
        if (this.controlMap[control._id] === undefined) {
          this.controlMap[control._id] = { name: control.name, count: 0 }
        }
      }
      const hardwarewords = (await hardwareWordList({ 'code': 'HIK_TRAFFIC_CA', 'type': 2 })).data.rows
      const hardwareword = hardwarewords[0]
      // 查询设备
      const httpdrives = (await httpdrivesList({ hardwareWord: hardwareword._id })).data.rows
      httpdrives.map((item, index, arr) => {
        arr[index] = item._id
      })
      const checks = (await checkList({ parentName: 'HttpDrive', 'parents': httpdrives, parentKey: 'parent', shortAddress: '0', autopopulate: false })).data.rows
      await checks.map((item, index, arr) => {
        arr[index] = item._id
        this.checkMap[item._id] = item.control
      })
      this.listQuery.group = this.group
      this.listQuery.checks = checks
      const _this = this
      await sequential(this.listQuery).then(response => {
        response.data.forEach(item => {
          if (_this.checkMap[item._id]) {
            const control = _this.checkMap[item._id]
            if (_this.controlMap[control]) {
              _this.controlMap[control].count += item.count
            }
          }
        })
        for (const i in _this.controlMap) {
          console.log(i)
          _this.option.legend.data.push(_this.controlMap[i].name)
          _this.option.series[0].data.push({ value: _this.controlMap[i].count, name: _this.controlMap[i].name })
        }
      })
      this.chart.setOption(this.option)
      console.log(this.chart)
    }
  }
}
</script>
