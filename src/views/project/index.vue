<template>
  <div class="nk-main" style="margin-top:105px;">
    <price-vue />
    <!--<content-vue />-->
  </div>
</template>

<script>
import PriceVue from './price'
// import ContentVue from './content'
export default {
  name: 'Index',
  components: {
    PriceVue
    // ContentVue
  }
}
</script>
