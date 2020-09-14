<template>
  <div class="nk-main" style="margin-top:105px;">
    <banner-vue />
    <content-vue />
  </div>
</template>

<script>
import ContentVue from './content'
import BannerVue from './banner'
export default {
  name: 'Index',
  components: {
    ContentVue,
    BannerVue
  }
}
</script>
