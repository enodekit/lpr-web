<template>
  <div id="projects" class="nk-box bg-dark-1">
    <div class="nk-gap-1 mt-5" />
    <h2 class="text-xs-center display-4  text-white">HOT SALES</h2>
    <div class="nk-gap-1 mt-12" />
    <div style="margin:0 11%;text-align: right">
      <i
        class="el-icon-arrow-left"
        style="border:1px solid #ffffff;background-color: #ffffff;font-size:25px"
        :disabled="listQuery.page===1"
        @click="prev"
      />
      <i
        class="el-icon-arrow-right"
        style="border:1px solid #ffffff;background-color: #ffffff;font-size:25px"
        @click="next"
      />
    </div>
    <div style="margin:0 10%">
      <div class="nk-portfolio-list nk-isotope nk-isotope-4-cols">
        <div v-if="productFrist!==undefined" style="width:40%;float:left">
          <div class="nk-isotope-item" data-filter="Visit" style="width:100%">
            <div class="nk-portfolio-item nk-portfolio-item-square nk-portfolio-item-info-style-1" style="overflow:hidden;" @click="showProject(productFrist)">
              <el-image :src="productFrist.imgs[0]" fit="fill" class="nk-portfolio-images project-class-image" style="min-height: 400px;display:block">
                <div slot="placeholder" class="image-slot">
                  loading<span class="dot">...</span>
                </div>
              </el-image>
              <div class="nk-portfolio-item-info nk-portfolio-item-info-center text-xs-center">
                <div>
                  <h2 class="portfolio-item-title h3">VISIT</h2>
                </div>
              </div>
              <div style="padding:10px;height:100px;text-align: left;background:#ffffff;color:#000000">
                <p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;margin-bottom: 0px!important;font-size: 18px">
                  {{ productFrist.name }}
                </p>
                <div style="color:red">
                  <span style="font-size:14px">$</span>
                  <span style="font-size:20px">
                    {{ priceSet(productFrist.prices) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width:60%;float:left">
          <div v-for="item in projects" :key="item._id" class="nk-isotope-item" data-filter="Visit" style="width:33%;">
            <div class="nk-portfolio-item nk-portfolio-item-square nk-portfolio-item-info-style-1" style="overflow:hidden;background-color: #ffffff" @click="showProject(item)">
              <el-image :src="item.imgs[0]" fit="fill" class="nk-portfolio-images project-class-image pclass-image" style="display:inline-block">
                <div slot="placeholder" class="image-slot">
                  loading<span class="dot">...</span>
                </div>
              </el-image>
              <div class="nk-portfolio-item-info nk-portfolio-item-info-center text-xs-center">
                <div>
                  <h2 class="portfolio-item-title h3">VISIT</h2>
                </div>
              </div>
              <div style="padding:0 5%;text-align: left;height:75px;line-height:1;background:#ffffff;color:#000000">
                <p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;line-height: 18px;margin-bottom: 0px!important;font-size: 14px;">
                  {{ item.name }}
                </p>
                <div style="color:red">
                  <span style="font-size:12px">$</span>
                  <span style="font-size:20px">
                    {{ priceSet(item.prices) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nk-gap-1 mt-15" />
    </div>
  </div></template>

<script>
import { list } from '@/api/products'
import { cutStr } from '@/utils/index'
export default {
  name: 'Project',
  components: {
  },
  data() {
    return {
      productFrist: undefined,
      projects: undefined,
      cutStr: cutStr,
      listQuery: {
        key: 'HOTSALES',
        page: 1,
        limit: 7
      }
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      this.projects = (await list(this.listQuery)).data.rows
      if (this.projects.length > 0) {
        this.productFrist = this.projects[0]
        this.projects.splice(0, 1)
      }
    },
    showProject(row) {
      this.$router.push({ path: '/projects/show/' + row._id, query: {}})
    },
    priceSet(prices) {
      if (prices.length > 0) {
        return prices[0].unitPrice
      } else {
        return ''
      }
    },
    prev() {
      this.listQuery.page--
      this.getProducts()
    },
    next() {
      this.listQuery.page++
      this.getProducts()
    }
  }
}
</script>

<style scoped>
  .nk-portfolio-images img{
    width: auto;
  }
</style>
