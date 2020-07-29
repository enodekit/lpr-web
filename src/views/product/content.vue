<template>
  <div id="cupcake" class="nk-box bg-white">
    <div class="row">
      <div class="col-md-3">
        <div class="category-sidebar">
          <div class="widget category-list">
            <h4 class="widget-header">All Category</h4>
            <ul class="category-list">
              <li><a href="category.html">Laptops <span>93</span></a></li>
              <li><a href="category.html">Iphone <span>233</span></a></li>
              <li><a href="category.html">Microsoft  <span>183</span></a></li>
              <li><a href="category.html">Monitors <span>343</span></a></li>
            </ul>
          </div>

          <div class="widget category-list">
            <h4 class="widget-header">Nearby</h4>
            <ul class="category-list">
              <li><a href="category.html">New York <span>93</span></a></li>
              <li><a href="category.html">New Jersy <span>233</span></a></li>
              <li><a href="category.html">Florida  <span>183</span></a></li>
              <li><a href="category.html">California <span>120</span></a></li>
              <li><a href="category.html">Texas <span>40</span></a></li>
              <li><a href="category.html">Alaska <span>81</span></a></li>
            </ul>
          </div>

          <div class="widget filter">
            <h4 class="widget-header">Show Produts</h4>
            <select>
              <option>Popularity</option>
              <option value="1">Top rated</option>
              <option value="2">Lowest Price</option>
              <option value="4">Highest Price</option>
            </select>
          </div>

          <div class="widget price-range">
            <h4 class="widget-header">Price Range</h4>
            <div class="block">
              <b>$10</b>
              <input id="ex2" type="text" class="span2" value="" data-slider-min="10" data-slider-max="1000" data-slider-step="5" data-slider-value="[250,450]">
              <b>$5000</b>
            </div>
          </div>

          <div class="widget product-shorting">
            <h4 class="widget-header">By Condition</h4>
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox" value="">
                Brand New
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox" value="">
                Almost New
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox" value="">
                Gently New
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox" value="">
                Havely New
              </label>
            </div>
          </div>

        </div>
      </div>
      <div class="col-md-9">
        <div class="category-search-filter">
          <div class="row">
            <div class="col-md-6">
              <strong>Short</strong>
              <select>
                <option>Most Recent</option>
                <option value="1">Most Popular</option>
                <option value="2">Lowest Price</option>
                <option value="4">Highest Price</option>
              </select>
            </div>
            <div class="col-md-6">
              <div class="view">
                <strong>Views</strong>
                <ul class="list-inline view-switcher">
                  <li class="list-inline-item">
                    <a href="javascript:void(0);"><i class="fa fa-th-large" /></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="javascript:void(0);"><i class="fa fa-reorder" /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="product-grid-list">
          <div class="row mt-30">
            <div class="col-sm-12 col-lg-4 col-md-6">
              <!-- product card -->
              <div class="product-item bg-light">
                <div class="card">
                  <div class="thumb-content">
                    <!-- <div class="price">$200</div> -->
                    <a href="">
                      <img class="card-img-top img-fluid" src="images/products/products-1.jpg" alt="Card image cap">
                    </a>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title"><a href="">11inch Macbook Air</a></h4>
                    <ul class="list-inline product-meta">
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-folder-open-o" />Electronics</a>
                      </li>
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-calendar" />26th December</a>
                      </li>
                    </ul>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, aliquam!</p>
                    <div class="product-ratings">
                      <ul class="list-inline">
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item"><i class="fa fa-star" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-sm-12 col-lg-4 col-md-6">
              <!-- product card -->
              <div class="product-item bg-light">
                <div class="card">
                  <div class="thumb-content">
                    <!-- <div class="price">$200</div> -->
                    <a href="">
                      <img class="card-img-top img-fluid" src="images/products/products-2.jpg" alt="Card image cap">
                    </a>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title"><a href="">Study Table Combo</a></h4>
                    <ul class="list-inline product-meta">
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-folder-open-o" />Furnitures</a>
                      </li>
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-calendar" />26th December</a>
                      </li>
                    </ul>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, aliquam!</p>
                    <div class="product-ratings">
                      <ul class="list-inline">
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item"><i class="fa fa-star" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-sm-12 col-lg-4 col-md-6">
              <!-- product card -->
              <div class="product-item bg-light">
                <div class="card">
                  <div class="thumb-content">
                    <!-- <div class="price">$200</div> -->
                    <a href="">
                      <img class="card-img-top img-fluid" src="images/products/products-3.jpg" alt="Card image cap">
                    </a>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title"><a href="">11inch Macbook Air</a></h4>
                    <ul class="list-inline product-meta">
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-folder-open-o" />Electronics</a>
                      </li>
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-calendar" />26th December</a>
                      </li>
                    </ul>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, aliquam!</p>
                    <div class="product-ratings">
                      <ul class="list-inline">
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item"><i class="fa fa-star" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-sm-12 col-lg-4 col-md-6">
              <!-- product card -->
              <div class="product-item bg-light">
                <div class="card">
                  <div class="thumb-content">
                    <!-- <div class="price">$200</div> -->
                    <a href="">
                      <img class="card-img-top img-fluid" src="images/products/products-1.jpg" alt="Card image cap">
                    </a>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title"><a href="">11inch Macbook Air</a></h4>
                    <ul class="list-inline product-meta">
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-folder-open-o" />Electronics</a>
                      </li>
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-calendar" />26th December</a>
                      </li>
                    </ul>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, aliquam!</p>
                    <div class="product-ratings">
                      <ul class="list-inline">
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item"><i class="fa fa-star" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-sm-12 col-lg-4 col-md-6">
              <!-- product card -->
              <div class="product-item bg-light">
                <div class="card">
                  <div class="thumb-content">
                    <!-- <div class="price">$200</div> -->
                    <a href="">
                      <img class="card-img-top img-fluid" src="images/products/products-2.jpg" alt="Card image cap">
                    </a>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title"><a href="">Study Table Combo</a></h4>
                    <ul class="list-inline product-meta">
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-folder-open-o" />Furnitures</a>
                      </li>
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-calendar" />26th December</a>
                      </li>
                    </ul>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, aliquam!</p>
                    <div class="product-ratings">
                      <ul class="list-inline">
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item"><i class="fa fa-star" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-sm-12 col-lg-4 col-md-6">
              <!-- product card -->
              <div class="product-item bg-light">
                <div class="card">
                  <div class="thumb-content">
                    <!-- <div class="price">$200</div> -->
                    <a href="">
                      <img class="card-img-top img-fluid" src="images/products/products-3.jpg" alt="Card image cap">
                    </a>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title"><a href="">11inch Macbook Air</a></h4>
                    <ul class="list-inline product-meta">
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-folder-open-o" />Electronics</a>
                      </li>
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-calendar" />26th December</a>
                      </li>
                    </ul>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, aliquam!</p>
                    <div class="product-ratings">
                      <ul class="list-inline">
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item"><i class="fa fa-star" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-sm-12 col-lg-4 col-md-6">
              <!-- product card -->
              <div class="product-item bg-light">
                <div class="card">
                  <div class="thumb-content">
                    <!-- <div class="price">$200</div> -->
                    <a href="">
                      <img class="card-img-top img-fluid" src="images/products/products-1.jpg" alt="Card image cap">
                    </a>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title"><a href="">11inch Macbook Air</a></h4>
                    <ul class="list-inline product-meta">
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-folder-open-o" />Electronics</a>
                      </li>
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-calendar" />26th December</a>
                      </li>
                    </ul>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, aliquam!</p>
                    <div class="product-ratings">
                      <ul class="list-inline">
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item"><i class="fa fa-star" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-sm-12 col-lg-4 col-md-6">
              <!-- product card -->
              <div class="product-item bg-light">
                <div class="card">
                  <div class="thumb-content">
                    <!-- <div class="price">$200</div> -->
                    <a href="">
                      <img class="card-img-top img-fluid" src="images/products/products-2.jpg" alt="Card image cap">
                    </a>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title"><a href="">Study Table Combo</a></h4>
                    <ul class="list-inline product-meta">
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-folder-open-o" />Furnitures</a>
                      </li>
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-calendar" />26th December</a>
                      </li>
                    </ul>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, aliquam!</p>
                    <div class="product-ratings">
                      <ul class="list-inline">
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item"><i class="fa fa-star" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-sm-12 col-lg-4 col-md-6">
              <!-- product card -->
              <div class="product-item bg-light">
                <div class="card">
                  <div class="thumb-content">
                    <!-- <div class="price">$200</div> -->
                    <a href="">
                      <img class="card-img-top img-fluid" src="images/products/products-3.jpg" alt="Card image cap">
                    </a>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title"><a href="">11inch Macbook Air</a></h4>
                    <ul class="list-inline product-meta">
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-folder-open-o" />Electronics</a>
                      </li>
                      <li class="list-inline-item">
                        <a href=""><i class="fa fa-calendar" />26th December</a>
                      </li>
                    </ul>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, aliquam!</p>
                    <div class="product-ratings">
                      <ul class="list-inline">
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item selected"><i class="fa fa-star" /></li>
                        <li class="list-inline-item"><i class="fa fa-star" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="pagination justify-content-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item active"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/products'
import '@/styles/web/style.css'
import '@/styles/web/slick-theme.css'
// import '@/styles/web/nice-select.css'
// import '@/styles/web/slick.css'
// import '@/styles/web/jquery.fancybox.pack.css'
// import '@/styles/web/font-awesome.min.css'
// import '@/styles/web/bootstrap-slider.min.css'
// import '@/styles/web/bootstrap.min.css'
export default {
  name: 'Arrivals',
  components: {

  },
  data() {
    return {
      listQuery: {
        limit: 20,
        sort: '-_id'
      },
      productFrist: undefined,
      projects: undefined
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    async getProduct() {
      this.projects = (await list(this.listQuery)).data.rows
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
