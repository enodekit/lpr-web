<template>
  <!-- START: Portfolio -->
  <div>
    <div class="container" style="margin:0 10%">
      <div class="thumb-example" style="width: 50%">
        <!-- swiper1 -->
        <swiper ref="swiperTop" class="swiper gallery-top" :options="swiperOptionTop">
          <swiper-slide class="slide-1" />
          <swiper-slide class="slide-2" />
          <swiper-slide class="slide-3" />
          <swiper-slide class="slide-4" />
          <swiper-slide class="slide-5" />
          <div slot="button-next" class="swiper-button-next swiper-button-white" />
          <div slot="button-prev" class="swiper-button-prev swiper-button-white" />
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper ref="swiperThumbs" class="swiper gallery-thumbs" :options="swiperOptionThumbs">
          <swiper-slide class="slide-1" />
          <swiper-slide class="slide-2" />
          <swiper-slide class="slide-3" />
          <swiper-slide class="slide-4" />
          <swiper-slide class="slide-5" />
        </swiper>
      </div>
    </div>
    <div class="nk-gap-1 mt-15" />
  </div>
  <!-- END: Portfolio -->
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
        spaceBetween: 10,
        centeredSlides: true,
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
      project: undefined
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
      this.project = await getOne(this.$route.params.id).data
    }
  }
}
</script>

<style lang="scss" scoped>
  .thumb-example {
    height: 480px;
    background-color: #000000;
  }
  .swiper {
  .swiper-slide {
    background-size: cover;
    background-position: center;
  &.slide-1 {
     background-image:url('../../assets/images/2_02.png');
   }
  &.slide-2 {
     background-image:url('../../assets/images/2_02.png');
   }
  &.slide-3 {
     background-image:url('../../assets/images/2_02.png');
   }
  &.slide-4 {
     background-image:url('../../assets/images/2_02.png');
   }
  &.slide-5 {
     background-image:url('../../assets/images/2_02.png');
   }
  }

  &.gallery-top {
     height: 80%;
     width: 100%;
   }
  &.gallery-thumbs {
     height: 20%;
     box-sizing: border-box;
     padding: 10px 0;
   }
  &.gallery-thumbs .swiper-slide {
     width: 25%;
     height: 100%;
     opacity: 0.4;
   }
  &.gallery-thumbs .swiper-slide-active {
     opacity: 1;
   }
  }
</style>
