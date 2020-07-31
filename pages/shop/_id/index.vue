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
                  <div class="product_thumb">
                    <a class="primary_img" href="product-details.html"><img :src="product.thumbnail" width="100%" alt=""></a>
                    <div class="label_product">
                        <span class="label_sale">-7%</span>
                    </div>

                    <div class="action_links">
                        <ul>
                            <li class="add_to_cart"><a href="cart.html" title="Add to cart"><i class="icon-shopping-bag"></i></a></li>
                            <li class="compare"><a href="#" title="Add to Compare"><i class="icon-sliders"></i></a></li>
                             <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><i class="icon-heart"></i></a></li>    
                            <li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box"  title="quick view"> <i class="icon-eye"></i></a></li>
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
                        <h4 class="product_name"><a href="product-details.html">{{product.name}}</a></h4>
                        <div class="price_box"> 
                          <span class="current_price">£69.00</span>
                          <span class="old_price">£74.00</span>
                        </div>
                      </div>
                    </div>
                    <div class="product_content list_content">
                      <div class="product_rating">
                        <ul>
                            <li><a href="#"><i class="icon-star"></i></a></li>
                            <li><a href="#"><i class="icon-star"></i></a></li>
                            <li><a href="#"><i class="icon-star"></i></a></li>
                            <li><a href="#"><i class="icon-star"></i></a></li>
                            <li><a href="#"><i class="icon-star"></i></a></li>
                        </ul>
                      </div>

                      <h4 class="product_name"><a href="product-details.html">{{product.name}}</a></h4>
                      <div class="price_box"> 
                        <span class="current_price">₫{{product.price}}</span>
                        <!-- <span class="old_price">£74.00</span> -->
                      </div>
                      <div class="product_desc">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco…</p>
                      </div>
                      <div class="action_links list_action_right">
                        <ul>
                          <li class="add_to_cart"><a href="cart.html" title="Add to cart">Add to cart</a></li>
                          <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><i class="icon-heart"></i></a></li>   
                          <li class="compare"><a href="#" title="Add to Compare"><i class="icon-sliders"></i></a></li> 
                        </ul>
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
                  :default-selected-keys="['1']"
                  :style="{ height: '100%', borderRight: 0 }"
                >
                  <a-menu-item key="1">
                    Tất cả sản phẩm
                  </a-menu-item>
                  <a-sub-menu key="sub1">
                    <span slot="title">Áo quần</span>
                    <a-menu-item key="2">
                      Áo quần nam
                    </a-menu-item>
                    <a-menu-item key="3">
                      Áo quần nữ
                    </a-menu-item>
                  </a-sub-menu>
                  <a-sub-menu key="sub2">
                    <span slot="title">Giày dép</span>
                    <a-menu-item key="4">
                      Giày Custom
                    </a-menu-item>
                    <a-menu-item key="5">
                      Dép Custom
                    </a-menu-item>
                  </a-sub-menu>
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

export default {
  components: {
    Product,
  },
  data() {
    return {
      shop: {
        id: 1,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
        description: 'Shop thời trang cute',
        name: 'SHT_Life',
        slug: 'sht_life',
        products: [
          {
            id: 1,
            name: 'Áo pull J2TEAM',
            thumbnail: 'http://res.cloudinary.com/dhbk/image/upload/v1596131648/gallery/tvgb1fqmpkmm7mmxismz.jpg',
            price: "120000"
          },
          {
            id: 2,
            name: 'Quần baggy',
            thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
            price: "250000"
          }
        ]
      }
    }
  },
  mounted() {
    this.getInfoShop()
  },
  methods: {
    getInfoShop() {
      console.log(this.$route.params.id);
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