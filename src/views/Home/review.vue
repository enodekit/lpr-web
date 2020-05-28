<template>
  <!-- START: Reviews -->
  <div class="nk-box bg-dark-1">
    <div class="container-fluid">
      <!-- START: Carousel -->
      <carousel per-page="1" pagination-active-color="#efefef" pagination-color="#000000">
        <slide
          v-for="(slide,index) in slides"
          :key="index"
          :data-index="index"
          data-name="MySlideName"
          style="padding-top: 20px;"
          @slideclick="handleSlideClick"
        >
          <div v-html="slide.html" />
        </slide>
      </carousel>
      <!-- END: Carousel -->
    </div>
  </div>
  <!-- END: Reviews -->
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'Review',
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      slides: [
        {
          html: '<blockquote class="nk-blockquote-style-1 text-white"><p>Outstanding job and exceeded all expectations. It was a pleasure to work with them on a sizable first project and am looking forward to start the next one asap.</p><cite>Michael Hopkins</cite></blockquote>'
        },
        {
          html: '<blockquote class="nk-blockquote-style-1 text-white"><p>Outstanding j2222ob and exceeded all expectations. It was a pleasure to work with them on a sizable first project and am looking forward to start the next one asap.</p><cite>Michael Hopkins</cite></blockquote>'
        },
        {
          html: '<blockquote class="nk-blockquote-style-1 text-white"><p>Outstanding j33332ob and exceeded all expectations. It was a pleasure to work with them on a sizable first project and am looking forward to start the next one asap.</p><cite>Michael Hopkins</cite></blockquote>'
        }
      ]
    }
  },
  methods: {
    handleSlideClick(dataset) {
      console.log(dataset.index, dataset.name)
    }
  }
}
</script>

<style scoped>

</style>
