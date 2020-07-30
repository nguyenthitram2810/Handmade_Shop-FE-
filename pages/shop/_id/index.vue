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
									<a class="" href="#">Timeline</a>
								</li>
								<li>
									<a class="active" href="#">About</a>
								</li>
								<li>
									<a class="" href="#">Friends</a>
								</li>
								<li>
									<a class="" href="#">Photos</a>
								</li>
								<li>
									<a class="" href="#">Videos</a>
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
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>
		
		<div class="col-lg-3 col-md-12">
          <!--sidebar widget start-->
          <aside class="sidebar_widget">
              <div class="widget_inner">
                  <div class="widget_list widget_categories">
                      <a-layout>
                        <a-layout-header class="header d-flex align-items-center  al-color-white ">
                          <a-icon type="unordered-list" class="mr-2" /><h3 class=" al-color-white ">Danh mục</h3>
                        </a-layout-header>
                        <a-layout> 
                          <a-layout-sider width="100%" style="background: #fff">
                          <a-menu
                            mode="inline"
                            :default-selected-keys="['1']"
                            :default-open-keys="['sub1']"
                            :style="{ height: '100%', borderRight: 0 }"
                          >
                            <a-sub-menu key="sub1">
                              <span slot="title"><a-icon type="user" />subnav 1</span>
                              <a-menu-item key="1">
                                option1
                              </a-menu-item>
                              <a-menu-item key="2">
                                option2
                              </a-menu-item>
                              <a-menu-item key="3">
                                option3
                              </a-menu-item>
                              <a-menu-item key="4">
                                option4
                              </a-menu-item>
                            </a-sub-menu>
                            <a-sub-menu key="sub2">
                              <span slot="title"><a-icon type="laptop" />subnav 2</span>
                              <a-menu-item key="5">
                                option5
                              </a-menu-item>
                              <a-menu-item key="6">
                                option6
                              </a-menu-item>
                              <a-menu-item key="7">
                                option7
                              </a-menu-item>
                              <a-menu-item key="8">
                                option8
                              </a-menu-item>
                            </a-sub-menu>
                            <a-sub-menu key="sub3">
                              <span slot="title"><a-icon type="notification" />subnav 3</span>
                              <a-menu-item key="9">
                                option9
                              </a-menu-item>
                              <a-menu-item key="10">
                                option10
                              </a-menu-item>
                              <a-menu-item key="11">
                                option11
                              </a-menu-item>
                              <a-menu-item key="12">
                                option12
                              </a-menu-item>
                            </a-sub-menu>
                          </a-menu>
                        </a-layout-sider>
                        </a-layout>
                      </a-layout>
                  </div>
              </div>
          </aside>
          <!--sidebar widget end-->
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
</style>