<template>
  <!-- START: Portfolio -->
  <div style="background-color:#f2f3f7">
    <div class="container">
      <div style="background-color:#ffffff;border-top:#e6e7eb solid 1px;">
        <div class="content-header">
          <div class="detail-subscribe">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="detail-breadcrumb">
              <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="content-body">
          <div class="thumb-example" style="float:left;width:380px">
            <!-- swiper1 -->
            <swiper ref="swiperTop" class="swiper gallery-top" :options="swiperOptionTop">
              <swiper-slide v-for="slide in swiperSlides" :key="slide" :style="slide" />
            </swiper>
            <!-- swiper2 Thumbs -->
            <swiper ref="swiperThumbs" class="swiper gallery-thumbs" :options="swiperOptionThumbs">
              <swiper-slide v-for="slide in swiperSlides" :key="slide" :style="slide" />
            </swiper>
          </div>
          <div style="width: 65%;float: left">
            <div class="ma-title-wrap">
              <h1 data-spm-anchor-id="a2700.details.maonnacta.i0.412e5d27RrZddL">
                {{ project.name }}
              </h1>
              <span id="detail-title-tags-after-title" class="promotion-title-tag pt-after" />
              <div class="ma-tag-wrap">
                <span id="detail-title-tags-below-title" class="promotion-tags" />
                <div class="ma-tag ma-tag-orange hot-sale-tag hot-sale-tag-1">
                  Hot sale products
                </div>
                <div class="ma-tag ma-tag-orange hot-sale-tag hot-sale-tag-2">
                  Hot sale in
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" class="tab-style">
      <el-tab-pane label="Product Details" name="pd" style="background-color: #ffffff;padding-left:10px!important;">
        <div v-html="project.content" />
      </el-tab-pane>
      <el-tab-pane label="Company Profile" name="cp" style="background-color: #ffffff;padding-left:10px!important;">
        <div v-html="project.company" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { getOne } from '@/api/products'
export default {
  name: 'Project',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 0,
        centeredSlides: false,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      },
      listQuery: {
        limit: 20,
        sort: '-_id',
        status: true,
        isshow: true
      },
      project: {
        content: undefined,
        company: undefined
      },
      swiperSlides: [],
      activeName: 'pd'
    }
  },
  created() {
    this.getProductClass()
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper
      const swiperThumbs = this.$refs.swiperThumbs.$swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
  methods: {
    async getProductClass() {
      this.project = (await getOne(this.$route.params.id)).data
      this.swiperSlides = []
      this.project.imgs.forEach(item => {
        this.swiperSlides.push('background-image:url("' + item + '")')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .swiper {
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  &.gallery-top {
     height: 350px;
     width: 350px;
     margin: 0 auto;
     border: 1px solid #e6e7eb;
   }
  &.gallery-thumbs {
     height: 90px;
     width: 350px;
     box-sizing: border-box;
     padding-top: 10px;
   }
  &.gallery-thumbs .swiper-slide {
     width: 70px;
     height: 70px;
     opacity: 0.5;
   }
  &.gallery-thumbs .swiper-slide-active {
     opacity: 1;
     width: 68px;
     height: 68px;
     border: 2px solid #fe9b0a;
   }
    &.gallery-thumbs .swiper-slide-active .arrow{
      display: inline-block;
      width: 0;
      height: 0;
      line-height: 0;
      vertical-align: middle;
      border: 5px dashed transparent;
      border-bottom: 5px solid #fe9b0a;
      position: absolute;
      top: -11px;
      left: 30px
    }
  }
  .widget-main-action .ma-price-wrap {
    border-top: 1px solid #e6e7eb;
    background-color: #fff;
    padding: 0 18px;
  }
  .content-body {
    position: relative;
    box-sizing: content-box;
    width: 100%;
    max-width: 1200px;
    padding: 0 16px;
    margin: 0 auto;
  }
  .tab-style{
    margin: 0 auto;
    max-width: 1200px;
    padding-top:20px;
    padding-right: 240px;
    background-color: transparent;
  }
  .ma-title-wrap h1{
    display: inline;
    font-size: 16px;
    color: #333;
    line-height: 24px
  }
  .widget-main-action .ma-tag-orange{
    background-color: #edf0f3;
    color: #999;
  }
  .widget-main-action .ma-tag {
    display: inline-block;
    vertical-align: top;
    margin-right: 4px;
    font-weight: 400;
    background-color: #e8f1fa;
    color: #6b8eb3;
    line-height: 22px;
    height: 20px;
    font-size: 12px;
    padding: 0 8px;
    position: relative;
    zoom: 1;
  }
  .detail-subscribe {
    max-width: 1200px;
    margin: 7px auto;
    position: relative;
    z-index: 1;
  }
  .detail-subscribe .detail-breadcrumb {
    display: inline-block;
    vertical-align: top;
    height: 26px;
    overflow: hidden;
    font-size: 12px;
    line-height: 26px;
  }
  .detail-subscribe .detail-breadcrumb .breadcrumb-link {
    font-size: 12px;
    line-height: 26px;
  }
  .detail-subscribe .detail-breadcrumb .seperator {
    margin: 0 5px;
  }
</style>
