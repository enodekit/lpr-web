<template>
  <!-- START: Portfolio -->
  <div style="background-color:#f2f3f7">
    <div style="background-color:#ffffff;border-top:#e6e7eb solid 1px;">
      <div class="container">
        <div class="content-header">
          <div class="detail-subscribe">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="detail-breadcrumb">
              <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item v-for="pArr in project.productClassArr" :key="pArr" :to="{ path: '/products/'+pArr }">{{ proClassMap[pArr].name }}</el-breadcrumb-item>
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
          <div style="width: 65%;float: left;font-size: 14px;">
            <div class="ma-title-wrap" style="padding-left:18px">
              <div class="ready-to-ship-icon">
                <div class="pre-icon">
                  Ready to Ship
                </div>
                <div class="icon-ins">
                  <i class="next-icon el-icon-circle-check next-icon-xs" />In Stock <i class="next-icon el-icon-circle-check next-icon-xs" />Fast Dispatch
                </div>
              </div>
              <h1 class="ma-title" style="display: inline;font-size: 16px;color: #333;line-height: 24px;">
                {{ project.name }}
              </h1>
              <el-rate
                v-model="project.value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              />
            </div>
            <div class="ma-main" style="margin-top: 12px;">
              <div class="ma-price-wrap">
                <div class="ma-reference-price ma-reference-price-promotion ">
                  <div class="ma-reference-price-promotion-price ">
                    <div class="ma-props"><span class="ma-reference-price-highlight">$3.15 - $7.78</span><span> / Piece </span></div>
                    <div class="ma-props"> <span class="ma-promotion-props">$3.50 - $8.65</span></div>
                  </div>
                  <div class="ma-reference-price-promotion-moq">
                    <div class="ma-props">
                      <span class="ma-props-title">
                        5  Pieces
                      </span>
                      <span>(Min. Order)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="ma-brief-list ma-main-brief-list">
                <div id="skuWrap" class="sku-wrap">
                  <dl class="sku-attr-dl util-clearfix IMAGE">
                    <dt class="name" title="Color">Color:</dt>
                    <dd class="sku-attr-val value util-clearfix" style="float">
                      <span class="sku-attr-val-frame picture-frame">
                        <img width="30" height="30" src="//sc01.alicdn.com/kf/Hbedca46337244a4182c24c8ffb12069e4.jpg_100x100.jpg" title="Orange" alt="Orange" data-spm-anchor-id="a2700.wholesale.maonnacta.i4.b6247e1bmhqBiT">
                        <span class="icon-sku-attr-val" />
                      </span>
                      <span class="sku-attr-val-frame picture-frame">
                        <img width="30" height="30" src="//sc01.alicdn.com/kf/Hbedca46337244a4182c24c8ffb12069e4.jpg_100x100.jpg" title="Orange" alt="Orange" data-spm-anchor-id="a2700.wholesale.maonnacta.i4.b6247e1bmhqBiT">
                        <span class="icon-sku-attr-val" />
                      </span>
                      <span class="sku-attr-val-frame picture-frame">
                        <img width="30" height="30" src="//sc01.alicdn.com/kf/Hbedca46337244a4182c24c8ffb12069e4.jpg_100x100.jpg" title="Orange" alt="Orange" data-spm-anchor-id="a2700.wholesale.maonnacta.i4.b6247e1bmhqBiT">
                        <span class="icon-sku-attr-val" />
                      </span>
                    </dd>
                  </dl>
                  <dl class="sku-attr-dl util-clearfix TEXT" data-role="last-sku-attr">
                    <dt class="name" title="Size">Size:</dt>
                    <dd class="sku-attr-val value util-clearfix">
                      <div data-id="191286172:-2;" data-role="sku-attr-val" class="sku-attr-val-item">
                        <div class="sku-attr-val-last sku-attr-val-text">
                          <span class="sku-attr-val-frame text-frame" title="3M">
                            3M
                            <span class="icon-sku-attr-val" />
                          </span>
                        </div>
                        <div class="sku-price">
                          <div data-role="sku-price-item">$3.15</div>
                        </div>
                        <div data-role="sku-quantity" class="sku-quantity quantity-value">
                          <div style="display:inline-block">
                            <a class="btn-quantity quantity-down" data-role="quantity-down" href="javascript:void(0);" data-spm-anchor-id="0.0.0.0"><b>-</b></a>
                            <input type="text" value="0" maxlength="6" class="ui2-textfield ui2-textfield-single" data-role="wholesale-order-quantity">
                            <a class="btn-quantity quantity-up" data-role="quantity-up" href="javascript:void(0);"><b>+</b></a>
                          </div>
                          <div data-role="product-inventory" class="product-inventory inventory-hide" title="20 Pieces available">
                            <span class="inventory-wrap">
                              <span data-role="inventory-count">20-CN_LOCAL_01</span> available
                            </span>
                          </div>
                        </div>
                      </div>
                    </dd>
                  </dl>
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
import { list as ClassList } from '@/api/productClasss'
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
      activeName: 'pd',
      proClassMap: undefined
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
      const proClass = (await ClassList()).data.rows
      this.proClassMap = {}
      proClass.forEach(item => {
        this.proClassMap[item._id] = item
      })
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
    margin: 10px auto;
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
  .ready-to-ship-icon {
    height: 20px;
    line-height: 20px;
    margin-bottom: 8px;
  }
  .ready-to-ship-icon .pre-icon {
    display: inline-block;
    padding: 0 8px;
    background-image: linear-gradient(-45deg,#f5515f,#ff7527);
    border-radius: 2px 0 0 2px;
    color: #fff;
    font-family: Roboto-Bold,sans-serif;
    font-size: 12px;
  }
  .ready-to-ship-icon .icon-ins {
    display: inline-block;
    padding: 0 12px;
    background: #fff0e6;
    border-radius: 2px;
    font-family: Roboto-Regular,sans-serif;
    font-size: 12px;
    color: #ff6a00;
  }
  .ready-to-ship-icon .icon-ins i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .ma-price-wrap {
    border-top: 1px solid #e6e7eb;
    background-color: #fff;
    padding: 0 18px;
  }
  .ma-reference-price{
    color: #999;
    padding: 20px 0;
    overflow: hidden;
  }
  .ma-reference-price-promotion {
    padding: 10px 0;
    color: #999;
  }
  .IMAGE{
    max-height: 44px;
    overflow: hidden;
  }
  #skuWrap dt.name {
    position: relative;
    z-index: 1;
    color: #666;
    width: 110px;
    float: left;
  }
  #skuWrap dt.name,.selling-point span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
  #skuWrap dt.name{position:relative;z-index:1;color:#666;width:110px;float:left}
  #skuWrap .sku-attr-val{position:relative;padding:2px 88px 0 110px}
  #skuWrap .sku-attr-dl.TEXT{max-height:38px;overflow:hidden}
  #skuWrap .sku-attr-dl.COLOR,#skuWrap .sku-attr-dl.IMAGE{max-height:44px;overflow:hidden}
  #skuWrap .sku-attr-val-frame{position:relative;float:left;margin:0 10px 10px 0;background-color:#fff;border:1px solid #ddd;cursor:pointer;text-align:center}
  #skuWrap .sku-attr-val-frame.current-sku-attr-val {border-color: #ff751a;box-shadow: none;max-width: 148px;}
  #skuWrap .sku-attr-val-last .sku-attr-val-frame{border:1px solid #ddd;background:none;padding-left:0;padding-right:0;color:#000;cursor:default}
  #skuWrap .sku-attr-val-last .text-frame{font-weight:700;padding-top:4px;padding-left:4px;padding-right:4px}
  #skuWrap .picture-frame{display:inline-block;width:30px;height:30px}
  #skuWrap .picture-frame .color,#skuWrap .picture-frame .image{display:block;width:100%;height:100%}
  #skuWrap .text-frame{height:18px;line-height:18px;padding:3px 5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;display:inline-block}
  #skuWrap .icon-sku-attr-val{display:none;position:absolute;right:0;bottom:0;width:14px;height:10px;background:url(https://img.alicdn.com/tfs/TB1CaGKfAY2gK0jSZFgXXc5OFXa-612-200.png) no-repeat}
  #skuWrap .sku-attr-val-frame.selected{margin:0 8px 8px 0;border-width:2px;border-color:#ff751a}
  #skuWrap .sku-attr-val-frame.selected .icon-sku-attr-val{display:block}
  #skuWrap .sku-show-more{display:inline-block;cursor:pointer}
  #skuWrap .sku-show-more .arrow{position:relative;top:2px;margin-left:3px}
  #skuWrap .sku-attr-dl.TEXT .sku-show-more{line-height:25px}
  #skuWrap .sku-attr-dl.COLOR .sku-show-more,#skuWrap .sku-attr-dl.IMAGE .sku-show-more{line-height:30px}
  .ma-reference-price-promotion>div {
    padding: 0 10px;
    float: left;
    position: relative;
  }
  .ma-reference-price-promotion>div:first-child {
    padding-left: 0;
    padding-right: 10px;
  }
  .ma-reference-price-promotion .ma-props {
    height: 24px;
    line-height: 30px;
  }
  .ma-reference-price-promotion .ma-props-title {
    color: #333;
  }
  .ma-reference-price-highlight {
    color: #ff7519;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
  }
  .ma-promotion-props {
    text-decoration: line-through;
  }
  .ma-main-brief-list{
    border-top:1px solid #e6e7eb;
    padding: 0 18px;
  }
  .ma-main-brief-list .customize{position:relative}

  .ma-main-brief-list .customize .customize-text-wrap{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

  .ma-main-brief-list .customize .customize-more{display:none;position:absolute;top:4px;right:0;z-index:1;cursor:pointer}
  .ma-brief-list{
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    padding: 10px 18px;
  }
  .ma-brief-list .customize .customize-list-less,.ma-brief-list .customize .customize-list-more{cursor:pointer;display:inline}
  .ma-brief-list .customize .customize-list-less .arrow,.ma-brief-list .customize .customize-list-more .arrow,.ma-brief-list .customize .customize-more .arrow{line-height:20px;vertical-align:middle;margin-left:3px}
  .ma-brief-list .customize-list .customization-list-item-expend,.ma-brief-list .customize .customize-list-less{display:none}
  .ma-brief-list .customize-list .customization-list-item-moq{color:#999}
  .ma-brief-list .sku-attr-dl{margin-top:4px}
  .ma-brief-list .sku-attr-dl:first-child{margin-top:0}
  .ma-brief-list .sku-attr-dl .name{width:110px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;position:relative;z-index:1}
  .ma-brief-list .sku-attr-val.value{position:relative;padding:2px 100px 0 116px}
  .ma-brief-list [data-role=last-sku-attr] .sku-attr-val.value{padding-right:0}
  .ma-brief-list .sku-attr-dl.TEXT{max-height:34px;overflow:hidden}
  .ma-brief-list .sku-attr-dl.COLOR,.ma-brief-list .sku-attr-dl.IMAGE{max-height:42px;overflow:hidden}
  .ma-brief-list #skuWrap .sku-attr-dl[data-role=last-sku-attr]{max-height:none}
  .module-mainAction-lite-vb .ma-brief-list #skuWrap .sku-attr-dl[data-role=last-sku-attr]{position:relative;top:-6px}
  .module-mainAction-lite-vb .ma-brief-list #skuWrap .sku-attr-dl.moq-warning[data-role=last-sku-attr]{animation:blink .8s linear 2 alternate}
</style>
