<template>
  <div>
    <div class="nk-header-title nk-header-title-md">
      <div class="bg-image">
        <div :style="backgroundDiv" />
        <!--<div class="bg-image-overlay" style="background-color: rgba(12, 12, 12, 0.6);" />-->
      </div>
      <div class="nk-header-table">
        <div class="nk-header-table-cell">
          <div class="container">
            <div style="color:#ffffff;text-align: left" v-html="data.content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { list } from '@/api/banners'
export default {
  name: 'Banner',
  data() {
    return {
      backgroundDiv: {
        backgroundImage: '',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '60vh'
      },
      data: {}
    }
  },
  created() {
    this.getBanner()
  },
  methods: {
    async getBanner() {
      this.data = (await list({})).data.rows[0]
      this.backgroundDiv.backgroundImage = 'url(' + this.data.path + ')'
    }
  }
}
</script>

<style scoped>

</style>

