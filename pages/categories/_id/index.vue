<template>
  <div class="container-fluid"  style="background: #F5F5F5;">
    <div class="white-theme mt-3 p-4 font--bold font--20">
      CATEGORY/{{listProducts.name}}
    </div>

    <div v-if="products.length" class="row px-2 my-3">
      <div v-for="(product, index) in products" :key="index" class="col-lg-2 col-md-3 col-sm-4 px-2">
        <article class="single_product box-shadow--main">
          <figure>
            <div  class="product_thumb">
              <nuxt-link class="primary_img" :to="`/shop/product/detail/${product.slug}`"><img :src="product.thumbnail" width="100%" alt=""></nuxt-link>
              <div class="label_product">
                  <span class="label_sale">-7%</span>
              </div>
              <div class="action_links">
                  <ul>
                      <li><a @click="addCart(product)" title="Add to cart"><i class="icon-shopping-bag"></i></a></li>
                       <li><a href="#" title="Add to Wishlist"><i class="icon-heart"></i></a></li>    
                      <li><nuxt-link :to="`/shop/product/detail/${product.slug}`"  title="quick view"> <i class="icon-eye"></i></nuxt-link></li>
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
                </div>
              </div>
            </div>
          </figure>
        </article>
      </div>
    </div>

    <div v-else class="my-5">
      <a-empty class="m-auto"/>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  layout: 'cart',
  data() {
    return {
      listProducts: [],
      products: [],
    }
  },

  mounted() {
    this.getListProducts()
  },

  methods: {
    async getListProducts() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/products?key=category&value=${this.$route.params.id}`)
        console.log(response)
        if(response.data.status == "200") {
          this.listProducts = response.data.data
          this.products = this.listProducts.products
        }
        else {
          this.$notification["error"]({
            message: 'GET PRODUCTS ERROR',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET PRODUCTS ERROR',
          description:
            e.message
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
@import url("./plugin.scss");
</style>