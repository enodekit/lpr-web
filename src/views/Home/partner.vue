<template>
  <!-- START: Partners -->
  <div class="bg-white">
    <div class="container">
      <!--<el-carousel :interval="4000" type="card" height="200px" style="padding:20px 0">-->
      <!--<el-carousel-item v-for="item in 6" :key="item">-->
      <!--<h3 class="medium">{{ item }}</h3>-->
      <!--</el-carousel-item>-->
      <!--</el-carousel>-->
      <carousel scroll-per-page="true" per-page="3" pagination-active-color="#efefef" pagination-color="#000000">
        <slide
          v-for="(slide,index) in slides"
          :key="index"
          :data-index="index"
          data-name="MySlideName"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          </el-card>
        </slide>
      </carousel>
    </div>
  </div>
  <!-- END: Partners -->
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'Partner',
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      slides: [
        {},
        {},
        {}
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
