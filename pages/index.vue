<template>
  <div class="mx-4 mt-3" >
    <a-carousel autoplay>
      <div><img class="al-w-100 al-height-auto" src="http://laz-img-cdn.alicdn.com/images/ims-web/TB16qXYhRBh1e4jSZFhXXcC9VXa.jpg_1200x1200Q100.jpg_.webp" alt=""></div>
      <div><img class="al-w-100 al-height-auto" src="http://laz-img-cdn.alicdn.com/images/ims-web/TB1ZfXBRBr0gK0jSZFnXXbRRXXa.jpg_1200x1200.jpg" alt=""></div>
      <div><img class="al-w-100 al-height-auto" src="http://laz-img-cdn.alicdn.com/images/ims-web/TB1rVKLfggP7K4jSZFqXXamhVXa.jpg_1200x1200Q100.jpg_.webp" alt=""></div>
      <div><img class="al-w-100 al-height-auto" src="http://laz-img-cdn.alicdn.com/images/ims-web/TB1cNG3dCslXu8jSZFuXXXg7FXa.jpg_1200x1200Q100.jpg_.webp" alt=""></div>
    </a-carousel>

    <div class="mt-3 ">
      <p class="font--bold al-text-color font--20">Mới nhất</p>
    </div>
    
    <div class="row pl-1 mt-3">
      <div class="col-lg-12 col-md-12"> 
        <div class="row shop_wrapper">
          <div v-for="(product, index) in newProducts" :key="index" class="col-lg-2 col-md-3 col-sm-4 px-2">
            <article class="single_product box-shadow--main">
              <figure>
                <div  class="product_thumb">
                  <nuxt-link class="primary_img" :to="`/shop/product/detail/${product.slug}`"><img :src="product.thumbnail" width="100%" alt=""></nuxt-link>
                  <div v-if="product.percent > 0" class="label_product">
                      <span class="label_sale">-{{product.percent}}%</span>
                  </div>

                  <div class="action_links">
                      <ul>
                          <!-- <li><a @click="addCart(product)" title="Add to cart"><i class="icon-shopping-bag"></i></a></li> -->
                           <!-- <li><a href="#" title="Add to Wishlist"><i class="icon-heart"></i></a></li>     -->
                          <li><nuxt-link :to="`/shop/product/detail/${product.slug}`"  title="quick view"> <i class="icon-eye"></i></nuxt-link></li>
                      </ul>
                  </div>

                  <div class="action_links list_action">
                      <ul>  
                          <li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box"  title="quick view"> <i class="icon-eye"></i></a></li>
                      </ul>
                  </div>
                </div>

                <div class="product_content grid_content al-w-product">
                  <div class="product_price_rating">
                    <!-- <div class="product_rating">
                      <ul>
                        <li><a href="#"><i class="icon-star"></i></a></li>
                        <li><a href="#"><i class="icon-star"></i></a></li>
                        <li><a href="#"><i class="icon-star"></i></a></li>
                        <li><a href="#"><i class="icon-star"></i></a></li>
                        <li><a href="#"><i class="icon-star"></i></a></li>
                      </ul>
                    </div> -->
                    <h4 class="product_name truncate-2-lines"><nuxt-link :to="`/shop/product/detail/${product.slug}`">{{product.name}}</nuxt-link></h4>
                    <div class="price_box"> 
                      <span class="current_price">₫ {{product.price}}</span>
                    </div>
                  </div>
                </div>
              </figure>
            </article>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 ">
      <p class="font--bold al-text-color font--20">Phổ biến</p>
    </div>

    <div class="row pl-1 mt-3">
      <div class="col-lg-12 col-md-12"> 
        <div class="row shop_wrapper">
          <div v-for="(product, index) in popularProducts" :key="index" class="col-lg-2 col-md-3 col-sm-4 col-12 px-2">
            <article class="single_product box-shadow--main">
              <figure>
                <div  class="product_thumb">
                  <nuxt-link class="primary_img" :to="`/shop/product/detail/${product.slug}`"><img :src="product.thumbnail" width="100%" alt=""></nuxt-link>
                  <div v-if="product.percent > 0" class="label_product">
                      <span class="label_sale">-{{product.percent}}%</span>
                  </div>

                  <div class="action_links">
                      <ul>
                          <!-- <li><a @click="addCart(product)" title="Add to cart"><i class="icon-shopping-bag"></i></a></li> -->
                           <!-- <li><a href="#" title="Add to Wishlist"><i class="icon-heart"></i></a></li>     -->
                          <li><nuxt-link :to="`/shop/product/detail/${product.slug}`"  title="quick view"> <i class="icon-eye"></i></nuxt-link></li>
                      </ul>
                  </div>

                  <div class="action_links list_action">
                      <ul>  
                          <li class="quick_button"><a href="#" data-toggle="modal" data-target="#modal_box"  title="quick view"> <i class="icon-eye"></i></a></li>
                      </ul>
                  </div>
                </div>

                <div class="product_content grid_content al-w-product">
                  <div class="product_price_rating">
                    <!-- <div class="product_rating">
                      <ul>
                        <li><a href="#"><i class="icon-star"></i></a></li>
                        <li><a href="#"><i class="icon-star"></i></a></li>
                        <li><a href="#"><i class="icon-star"></i></a></li>
                        <li><a href="#"><i class="icon-star"></i></a></li>
                        <li><a href="#"><i class="icon-star"></i></a></li>
                      </ul>
                    </div> -->
                    <h4 class="product_name truncate-2-lines"><nuxt-link :to="`/shop/product/detail/${product.slug}`">{{product.name}}</nuxt-link></h4>
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
    </div>

    <div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  middleware: ['getState','loadState'],
  layout: 'cart',
  data() {
    return {
      newProducts: [],
      popularProducts: [],
    }
  },
  mounted() {
    this.getNewProduct()
    this.getPopularProduct()
  },

  methods: {
    async getPopularProduct() {
      try {
        const response = await axios.get(`http://whispering-reef-26272.herokuapp.com/api/v1/products?key=best-seller`)
        if(response.data.status == "200") {
          this.popularProducts = response.data.data
        }
        else {
          this.$notification["error"]({
            message: 'GET POPULAR PRODUCT ERROR',
            description:
              response.data.message
          });
        }
      } catch (e) {
        this.$notification["error"]({
            message: 'GET POPULAR PRODUCT ERROR',
            description:
              e.message
          });
      }
    },

    async getNewProduct() {
      try {
        const response = await axios.get(`http://whispering-reef-26272.herokuapp.com/api/v1/products?order=createdAt&amount=12`)
        console.log(response)
        if(response.data.status == "200") {
          this.newProducts = response.data.data.rows
        }
        else {
          this.$notification["error"]({
            message: 'GET POPULAR PRODUCT ERROR',
            description:
              response.data.message
          });
        }
      } catch (e) {
        this.$notification["error"]({
            message: 'GET POPULAR PRODUCT ERROR',
            description:
              e.message
          });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import url("./style.scss");
@import url("./plugin.scss");
</style>

