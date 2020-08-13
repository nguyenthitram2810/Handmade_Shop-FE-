<template>
  <div class="pt-3 pb-3"  style="background: #F5F5F5;">
    <div class="container-fluid">
      <div class="user-profile pl-2">
		    <figure>
		    	<div class="edit-pp">
		    		<label class="fileContainer">
		    			<i class="fa fa-camera"></i>
		    			<input type="file">
		    		</label>
		    	</div>

		    	<img src="/images/profile-image.jpg" alt="">

		    	<ol class="pit-rate">
		    		<li class="rated"><i class="fa fa-star"></i></li>
		    		<li class="rated"><i class="fa fa-star"></i></li>
		    		<li class="rated"><i class="fa fa-star"></i></li>
		    		<li class="rated"><i class="fa fa-star"></i></li>
		    		<li class=""><i class="fa fa-star"></i></li>
		    		<li><span>4.7/5</span></li>
		    	</ol>
		    </figure>
				
				<div class="profile-section">
					<div class="row">
						<div class="col-lg-2 col-md-3">
							<div class="profile-author">
								<div class="profile-author-thumb">
									<img alt="author" :src="shop.thumbnail">
									<div class="edit-dp">
										<label class="fileContainer">
											<i class="fa fa-camera"></i>
											<input type="file">
										</label>
									</div>
								</div>
									
								<div class="author-content">
									<a class="h4 author-name" href="about.html">{{ shop.name }}</a>
								</div>
							</div>
						</div>

						<div class="col-lg-10 col-md-9">
							<ul class="profile-menu">
								<li>
									<a :class="{active: newest}"  @click="sortNewest()">Mới nhất</a>
								</li>
								<li>
									<a :class="{active: downToUp}" @click="sortDownToUp()">Giá: Thấp đến Cao</a>
								</li>
                <li>
									<a :class="{active: upToDown}" @click="sortUpToDown()">Giá: Cao đến Thấp</a>
								</li>
							</ul>
							<ol class="folw-detail">
								<li><span>Sản phẩm</span><ins>101</ins></li>
								<li><span>Đánh giá</span><ins>4.7/5</ins></li>
								<li><span>Số đánh giá</span><ins>127</ins></li>
							</ol>
						</div>
					</div>
				</div>	
			</div><!-- user profile banner  -->

      <div class="row pl-2">
        <div class="col-lg-9 col-md-12"> 
          <div class="row shop_wrapper">
            <div v-for="(product, index) in shop.products" :key="index" class="col-lg-3 col-md-3 col-12 ">
              <article class="single_product box-shadow--main">
                <figure>
                  <div  class="product_thumb">
                    <nuxt-link class="primary_img" :to="`/shop/product/detail/${product.slug}`"><img :src="product.thumbnail" width="100%" alt=""></nuxt-link>
                    <div class="label_product">
                        <span class="label_sale">-{{ product.percent}}%</span>
                    </div>

                    <div class="action_links">
                        <ul>
                            <li class="add_to_cart"><a @click="addCart(product)" title="Add to cart"><i class="icon-shopping-bag"></i></a></li>
                             <li class="wishlist"><a href="#" title="Add to Wishlist"><i class="icon-heart"></i></a></li>    
                            <li class="quick_button"><nuxt-link :to="`/shop/product/detail/${product.slug}`"  title="quick view"> <i class="icon-eye"></i></nuxt-link></li>
                        </ul>
                    </div>

                    <div class="action_links list_action">
                        <ul>  
                            <li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box"  title="quick view"> <i class="icon-eye"></i></a></li>
                        </ul>
                    </div>
                  </div>
                    <div class="product_content grid_content">
                      <div class="product_price_rating">
                        <div class="product_rating">
                          <ul>
                            <li><a href="#"><i class="icon-star"></i></a></li>
                            <li><a href="#"><i class="icon-star"></i></a></li>
                            <li><a href="#"><i class="icon-star"></i></a></li>
                            <li><a href="#"><i class="icon-star"></i></a></li>
                            <li><a href="#"><i class="icon-star"></i></a></li>
                          </ul>
                        </div>
                        <h4 class="product_name"><nuxt-link :to="`/shop/product/detail/${product.slug}`">{{product.name}}</nuxt-link></h4>
                        <div class="price_box"> 
                          <span class="current_price">₫ {{product.reduce}}</span>
                        </div>
                      </div>
                    </div>
                  </figure>
              </article>
            </div>
          </div>
        </div>
		
		    <div class="col-lg-3 col-md-12">
          <a-layout>
            <a-layout-header class="header d-flex align-items-center  al-color-white ">
              <a-icon type="unordered-list" class="mr-2" /><h3 class=" al-color-white ">Danh mục</h3>
            </a-layout-header>
            <a-layout> 
              <a-layout-sider width="100%" style="background: #fff">
                <a-menu
                  mode="inline"
                  :default-selected-keys="['0']"
                  :style="{ height: '100%', borderRight: 0 }"
                >
                  <a-menu-item key="0">
                    Tất cả sản phẩm
                  </a-menu-item>
                  <a-menu-item v-for="(cate, index) in listCate" :key="index + 1">
                    {{cate.name}}
                  </a-menu-item>
                </a-menu>
              </a-layout-sider>
            </a-layout>
          </a-layout>
        </div>
      </div>
      <div class="row">
        <div class="al-text-center col-lg-9 col-md-12">
          <a-pagination v-model="current" :total="30" show-less-items />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '~/components/Product'
const Cookie = process.client ? require('js-cookie') : undefined
import axios from "axios"

export default {
  layout: 'cart',
  middleware: 'getState',
  components: {
    Product,
  },
  data() {
    return {
      shop: {},
      listCate: [],
      newest: true,
      downToUp: false,
      upToDown: false,
      current: 2,
    }
  },
  mounted() {
    this.$router.push({ query: { page: 1, amount: 10, category: 'all', sortBy: 'newest' }})
    this.getInfoShop()
  },
  methods: {
    async getInfoShop() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/shop/${this.$route.params.id}/products`)
        if(response.data.status == "200") {
          this.shop =  response.data.data[0]
          this.getListCate(this.shop.products)
        }
        else {
          this.$notification["error"]({
            message: 'GET PRODUCT ERROR',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET PRODUCT ERROR',
          description:
            response.data.message
        });
      }
    },

    getListCate(data) {
      let temp = new Set()
      data.forEach(e => {
        let i = temp.size
        temp.add(e.category.id)
        if(i < temp.size) {
          this.listCate.push(e.category)
        }
      });
    },

    addCart(product) {
      try {
        if(Cookie.get('user')) {
          let user = JSON.parse(Cookie.get('user'));
          let id = String(user.id)
          if(user.shopActive) {
            if(user.shop.id != product.shopId) {
              this.$store.dispatch('cart/addCart', {shop: this.shop, product, quantity: 1, state: 'product', userID: id })
            }
            else {
              throw {
                message: "Bạn không thể mua sản phẩm của cửa hàng mình!"
              }
            }
          }
          else {
            console.log("vao day")
            this.$store.dispatch('cart/addCart', {shop: this.shop, product, quantity: 1, state: 'product', userID: id })
          }
        }
        else {
          this.$store.dispatch('cart/addCart', {shop: this.shop, product, quantity: 1, state: 'productNoLogin', userID: 'noLogin' })
        }
        this.$notification["success"]({
          message: 'ADD CART',
          description:
            "Add cart success!"
        });
      }
      catch(e) {
        this.$notification["error"]({
          message: 'ADD CART ERROR',
          description:
            e.message
        });
      }
    },

    sortNewest() {
      try {
        this.$router.push({ query: { page: 1, amount: 10, category: 'all', sortBy: 'newest' }})
        this.downToUp = false
        this.newest = true
        this.upToDown = false
      }
      catch(e) {

      }
    },

    sortDownToUp() {
      try {
        this.$router.push({ query: { page: 1, amount: 10, category: 'all', sortBy: 'priceASC' }})
        this.downToUp = true
        this.newest = false
        this.upToDown = false
      }
      catch(e) {

      }
    },

    sortUpToDown() {
      try {
        this.$router.push({ query: { page: 1, amount: 10, category: 'all', sortBy: 'priceDESC' }})
        this.downToUp = false
        this.newest = false
        this.upToDown = true
      }
      catch(e) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
@import url("./color.scss");
@import url("./responsive.scss");
@import url("./style2.scss");
@import url("./plugin.scss");
</style>