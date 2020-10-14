<template>
  <div class="nk-main" style="margin-top:214px;">
    <banner-vue />
    <feature-vue />
    <project-class-vue />
    <project-vue />
    <arrival-vue />
    <cupcake-vue />
    <other-vue />
    <!--<review-vue />-->
    <!--<blog-vue />-->
  </div>
</template>

<script>
import BannerVue from './banner'
import FeatureVue from './feature'
import ProjectVue from './project'
import ProjectClassVue from './projectClass'
import ArrivalVue from './arrivals'
import CupcakeVue from './cupcake'
import OtherVue from './other'
// import ReviewVue from './review'
// import PartnerVue from './partner'
// import BlogVue from './blog'
export default {
  name: 'Index',
  components: {
    BannerVue,
    FeatureVue,
    ProjectVue,
    ProjectClassVue,
    ArrivalVue,
    CupcakeVue,
    OtherVue
    // ReviewVue,
    // PartnerVue,
    // BlogVue
  }
}
</script>
