<template>
  <!-- START: Blog -->
  <div id="blog" class="nk-box bg-gray-1">
    <div class="nk-gap-4 mt-5" />

    <h2 class="text-xs-center display-4">Latest Blog</h2>

    <div class="nk-gap mnt-6" />
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="text-xs-center">Donec orci sem, pretium ac dolor et, faucibus faucibus mauris. Etiam,pellentesque faucibus. Vestibulum gravida volutpat ipsum non ultrices.
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="margin-bottom: 20px;">
      <!-- START: Carousel -->
      <carousel :pagination-size="10" :pagination-padding="10" :scroll-per-page="false" :per-page="3" pagination-active-color="#444" pagination-color="#efefef">
        <slide
          v-for="(slide,index) in slides"
          :key="index"
          :data-index="index"
          data-name="MySlideName"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img style="height: 200px;" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ slide.currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </slide>
      </carousel>
    </div>
  </div>
  <!-- END: Blog -->
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'Blog',
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      slides: [
        {},
        {},
        {},
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
  .el-card{
    margin:20px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
