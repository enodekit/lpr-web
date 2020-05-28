<template>
  <div id="arrivals" class="nk-box bg-gray-1">
    <div class="nk-gap-1 mt-5" />
    <h2 class="text-xs-center display-4">OTHER ACCESSORIES</h2>
    <div class="nk-gap-1 mt-12" />
    <div style="margin:0 10%">
      <div class="nk-portfolio-list nk-isotope nk-isotope-4-cols">
        <div v-for="item in projects" :key="item._id" class="nk-isotope-item" data-filter="Visit" style="width:33%">
          <div class="nk-portfolio-item nk-portfolio-item-square nk-portfolio-item-info-style-1" style="overflow:hidden">
            <el-image :src="item.img" fit="fill" class="nk-portfolio-images project-class-image" style="height: 100%;max-height: 400px;">
              <div slot="placeholder" class="image-slot">
                loading<span class="dot">...</span>
              </div>
            </el-image>
            <div class="nk-portfolio-item-info nk-portfolio-item-info-center text-xs-center">
              <div>
                <div class="portfolio-item-category">Visit</div>
              </div>
            </div>
            <div style="margin:10px 10% 0 10%;border-radius:5px;padding:10px;text-align: center;background:#ffffff;color:#000000">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="nk-gap-1 mt-15" />
  </div>
</template>

<script>
import { list } from '@/api/products'
export default {
  name: 'Arrivals',
  components: {
  },
  data() {
    return {
      listQuery: {
        limit: 20,
        sort: '-_id'
      },
      productFrist: undefined,
      projects: undefined
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    async getProduct() {
      this.projects = (await list(this.listQuery)).data.rows
    }
  }
}
</script>

<style scoped>
  .project_head{
    width: 20%;float:left;margin:0 2.5%
  }
  .project_icon{
    border: 2px #000000 solid;
    font-size: 60px;
    color:#000000;
    border-radius:50px;
    padding:10px}
  .project_content{
    width: 100%;
    margin-top: -15px;
    text-align: left;
    font-size: 10px;
    font-weight: 600;
    background: #000000;
    border: 1px solid #000000;
    color: #ffffff;
    word-break: break-word;
  }
  .nk-isotope .nk-isotope-item{
    width: 20%;
  }
  .nk-portfolio-list .nk-portfolio-item{
    margin: 0 10px!important;
  }
</style>
