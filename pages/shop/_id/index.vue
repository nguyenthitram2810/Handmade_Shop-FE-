<template>
  <div class="mt-3 mb-3">
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
									<a class="" href="#">Phổ biến</a>
								</li>
								<li>
									<a class="active" href="#">Mới nhất</a>
								</li>
								<li>
									<a class="" href="#">Bán chạy</a>
								</li>
								<li>
									<a class="" href="#">Giá: Thấp đến Cao</a>
								</li>
                <li>
									<a class="" href="#">Giá: Cao đến Thấp</a>
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
            <div v-for="product in shop.products" :key="product.id" class="col-lg-3 col-md-3 col-12 ">
              <article class="single_product">
                <figure>
                  <div  class="product_thumb">
                    <nuxt-link class="primary_img" :to="`/shop/product/detail/${product.slug}`"><img :src="product.thumbnail" width="100%" alt=""></nuxt-link>
                    <div class="label_product">
                        <span class="label_sale">-7%</span>
                    </div>

                    <div class="action_links">
                        <ul>
                            <li class="add_to_cart"><a @click="addCart(product)" href="#" title="Add to cart"><i class="icon-shopping-bag"></i></a></li>
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
                          <span class="current_price">₫ {{product.price}}</span>
                          <!-- <span class="old_price">£74.00</span> -->
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
    </div>
  </div>
</template>

<script>
import Product from '~/components/Product'
const Cookie = process.client ? require('js-cookie') : undefined
import axios from "axios"

export default {
  components: {
    Product,
  },
  data() {
    return {
      shop: {},
      listCate: [],
    }
  },
  mounted() {
    this.getInfoShop()
  },
  methods: {
    async getInfoShop() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/shop/${this.$route.params.id}/products`)
        console.log(response);
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
        console.log(i);
        temp.add(e.category.id)
        if(i < temp.size) {
          this.listCate.push(e.category)
        }
      });
      console.log(this.listCate);
    },

    addCart(product) {
      
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