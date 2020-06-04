<template>
  <div id="projects" class="nk-box bg-dark-1">
    <div class="nk-gap-1 mt-5" />
    <h2 class="text-xs-center display-4  text-white">HOT SALES</h2>
    <div class="nk-gap-1 mt-12" />
    <div style="margin:0 10%">
      <div class="nk-portfolio-list nk-isotope nk-isotope-4-cols">
        <div v-if="productFrist!==undefined" style="width:40%;float:left">
          <div class="nk-isotope-item" data-filter="Visit" style="width:100%">
            <div class="nk-portfolio-item nk-portfolio-item-square nk-portfolio-item-info-style-1" style="overflow:hidden;" @click="showProject(productFrist)">
              <el-image :src="productFrist.img" fit="fill" class="nk-portfolio-images project-class-image" style="height: 100%;min-eight: 400px;">
                <div slot="placeholder" class="image-slot">
                  loading<span class="dot">...</span>
                </div>
              </el-image>
              <div class="nk-portfolio-item-info nk-portfolio-item-info-center text-xs-center">
                <div>
                  <h2 class="portfolio-item-title h3">{{ productFrist.name }}</h2>
                  <div class="portfolio-item-category">Visit</div>
                </div>
              </div>
              <div style="margin:0 10%;border-radius:5px;padding:10px;text-align: center;background:#ffffff;color:#000000">{{ productFrist.name }}</div>
            </div>
          </div>
        </div>
        <div style="width:56%;float:left">
          <div v-for="item in projects" :key="item._id" class="nk-isotope-item" data-filter="Visit" style="width:33%">
            <div class="nk-portfolio-item nk-portfolio-item-square nk-portfolio-item-info-style-1" style="overflow:hidden" @click="showProject(item)">
              <el-image :src="item.img" fit="fill" class="nk-portfolio-images project-class-image" style="height: 100%">
                <div slot="placeholder" class="image-slot">
                  loading<span class="dot">...</span>
                </div>
              </el-image>
              <div class="nk-portfolio-item-info nk-portfolio-item-info-center text-xs-center">
                <div>
                  <div class="portfolio-item-category">Visit</div>
                </div>
              </div>
              <div style="margin:0 10%;border-radius:5px;padding:10px;text-align: center;background:#ffffff;color:#000000">{{ item.name }}</div>
            </div>
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
  name: 'Project',
  components: {
  },
  data() {
    return {
      productFrist: undefined,
      projects: undefined,
      listQuery: {
        key: 'HOTSALES'
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
    }
  }
}
</script>

<style scoped>
  .nk-portfolio-images img{
    width: auto;
  }
</style>
