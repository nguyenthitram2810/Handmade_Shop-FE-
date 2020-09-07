<template>
  <div class="container-fluid"  style="background: #F5F5F5;">
    <div v-if="listProducts.length > 0" class="white-theme mt-3 p-4 font--bold font--20">
      CATEGORY/<span>{{ category.name}}</span>
    </div>

    <div v-if="listProducts.length > 0" class="row px-2 my-3">
      <div v-for="(product, index) in listProducts" :key="index" class="col-lg-2 col-md-3 col-sm-4 px-2 mt-3">
        <article class="single_product box-shadow--main">
          <figure>
            <div  class="product_thumb">
              <nuxt-link class="primary_img" :to="`/shop/product/detail/${product.slug}`"><img :src="product.thumbnail" width="100%" alt=""></nuxt-link>
              <div v-if="product.percent > 0" class="label_product">
                  <span class="label_sale">-{{ product.percent}}%</span>
              </div>
              <div class="action_links">
                  <ul>
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
            <div class="product_content grid_content px-1 pb-2 al-w-product">
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

    <div v-else class="my-5">
      <a-empty class="m-auto"/>
    </div>

    <div class="row">
      <div class="al-text-center col-12 mb-3">
        <a-pagination :page-size.sync="pageSize"  v-model="current" :total="total" @change="onChange"/>
      </div>
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
      total: 0,
      current: 1,
      category: {},
      pageSize: 12,
    }
  },

  mounted() {
    this.$router.push({ query: { page: this.current, amount: 12, }})
    this.getListProducts(this.current)
  },

  methods: {
    async getListProducts(page) {
      try {
        const response = await axios.get(`http://whispering-reef-26272.herokuapp.com/api/v1/products?key=category&value=${this.$route.params.id}&page=${page}&amount=12`)
        console.log(response)
        if(response.data.status == "200") {
          if(response.data.data.count > 0) {
            this.total = response.data.data.count
            this.listProducts = response.data.data.rows
            this.category = this.listProducts[0].category
          }
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
    }, 

    onChange(pageNumber) {
      this.current = pageNumber
      this.$router.push({ query: { page: this.current, amount: 12, }})
      this.getListProducts(this.current)
    },
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
@import url("./plugin.scss");
</style>