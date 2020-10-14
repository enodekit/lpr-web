<template>
  <div id="cupcake" class="nk-box bg-white">
    <div style="margin:20px 10%">
      <div class="row">
        <div class="col-md-3">
          <div class="category-sidebar">
            <div class="widget category-list">
              <h4 class="widget-header">All Category</h4>
              <ul class="category-list">
                <li v-for="cate in categorys" :key="cate._id"><a>{{ classMap[cate._id].name }}<span>{{ cate.count }}</span></a></li>
              </ul>
            </div>

            <div class="widget category-list">
              <h4 class="widget-header">Nearby</h4>
              <ul class="category-list">
                <li v-for="tag in productTags" :key="tag._id"><a>{{ tag.name }}<span>{{ tag.count }}</span></a></li>
              </ul>
            </div>

            <div class="widget filter">
              <h4 class="widget-header">Show Produts</h4>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="category-search-filter">
            <div class="row">
              <div class="col-md-6">
                <strong>Short</strong>
                <el-select v-model="value" style="width:80%" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <!--<select>-->
                <!--<option>Most Recent</option>-->
                <!--<option value="1">Most Popular</option>-->
                <!--<option value="2">Lowest Price</option>-->
                <!--<option value="4">Highest Price</option>-->
                <!--</select>-->
              </div>
            </div>
          </div>
          <div class="product-grid-list">
            <div class="row mt-30">
              <div v-for="data in listdatas" :key="data._id" class="col-sm-12 col-lg-4 col-md-6" @click="showProject(data)">
                <!-- product card -->
                <div class="product-item bg-light">
                  <div class="card">
                    <div class="thumb-content">
                      <el-image class="card-img-top img-fluid" :src="data.imgs[0]" :alt="data.name" />
                    </div>
                    <div class="card-body">
                      <h4 class="card-title p_line_3"><a href="">{{ data.name }}</a></h4>
                      <ul v-if="data.price!==undefined" class="list-inline product-meta">
                        <li class="list-inline-item" style="color:red">
                          <span>$</span>
                          <strong>{{ data.price }}</strong>
                        </li>
                        <!--<li class="list-inline-item">-->
                        <!--<i class="fa fa-calendar" />26th December-->
                        <!--</li>-->
                      </ul>
                      <p class="card-text">{{ data.remark }}</p>
                      <el-rate
                        :value="data.value!==undefined?data.value:5"
                        disabled
                        text-color="#ff9900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" layout="total, prev, pager, next" :limit.sync="listQuery.limit" @pagination="getList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { list, aggregate, tagCount } from '@/api/products'
import { list as ClassList } from '@/api/productClasss'
import '@/styles/web/style.css'
import Pagination from '@/components/Pagination' // 分页组件Secondary package based on el-pagination
// import { list as wordList } from '@/api/words'
// import { list as wordTypeList } from '@/api/wordTypes'
// import '@/styles/web/slick-theme.css'
// import '@/styles/web/nice-select.css'
// import '@/styles/web/slick.css'
// import '@/styles/web/jquery.fancybox.pack.css'
// import '@/styles/web/font-awesome.min.css'
// import '@/styles/web/bootstrap-slider.min.css'
import '@/styles/web/bootstrap.min.css'
export default {
  name: 'Arrivals',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        limit: 18,
        page: 1,
        sort: '-_id'
      },
      total: 0,
      aggregateQuery: {
        sort: { _id: 1 },
        group: { _id: '$productClass', count: { $sum: 1 }}
      },
      tagQuery: {
        sort: { _id: 1 }
      },
      value: 4,
      productFrist: undefined,
      projects: undefined,
      categorys: undefined,
      classes: undefined,
      classMap: {},
      productTags: [],
      listdatas: [],
      options: [{ value: 1, label: 'Most Popular' }, { value: 2, label: 'Lowest Price' }, { value: 3, label: 'Top rated' }, { value: 4, label: 'Highest Price' }]
    }
  },
  created() {
    this.getListData()
  },
  methods: {
    async getListData() {
      this.classes = (await ClassList()).data.rows
      const productClas = []
      this.classes.forEach(cla => {
        productClas.push(cla._id)
        this.classMap[cla._id] = cla
      })
      if (productClas.length > 0) {
        this.aggregateQuery.productClas = productClas
      }
      this.categorys = (await aggregate(this.aggregateQuery)).data
      this.listQuery.productClass = this.tagQuery.productClass = this.$route.params.id
      this.productTags = (await tagCount(this.tagQuery)).data
      this.getList()
    },
    getList() {
      list(this.listQuery).then(response => {
        this.listdatas = response.data.rows
        this.total = response.data.total
      })
    },
    showProject(row) {
      this.$router.push({ path: '/projects/show/' + row._id, query: {}})
    }

  }
}
</script>

<!--<style scoped>-->
  <!--.project_head{-->
    <!--width: 20%;float:left;margin:0 2.5%-->
  <!--}-->
  <!--.project_icon{-->
    <!--border: 2px #000000 solid;-->
    <!--font-size: 60px;-->
    <!--color:#000000;-->
    <!--border-radius:50px;-->
    <!--padding:10px}-->
  <!--.project_content{-->
    <!--width: 100%;-->
    <!--margin-top: -15px;-->
    <!--text-align: left;-->
    <!--font-size: 10px;-->
    <!--font-weight: 600;-->
    <!--background: #000000;-->
    <!--border: 1px solid #000000;-->
    <!--color: #ffffff;-->
    <!--word-break: break-word;-->
  <!--}-->
  <!--.nk-isotope .nk-isotope-item{-->
    <!--width: 20%;-->
  <!--}-->
  <!--.nk-portfolio-list .nk-portfolio-item{-->
    <!--margin: 0 10px!important;-->
  <!--}-->
<!--</style>-->
