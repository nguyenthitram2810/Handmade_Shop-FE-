<template>
  <div class="mx-4 mt-3" >
    <a-carousel autoplay>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
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
                  <div class="label_product">
                      <span class="label_sale">-7%</span>
                  </div>

                  <div class="action_links">
                      <ul>
                          <!-- <li><a @click="addCart(product)" title="Add to cart"><i class="icon-shopping-bag"></i></a></li> -->
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
      </div>
    </div>

    <div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'getState',
  layout: 'cart',
  data() {
    return {
      newProducts: [
        {
          id: 1,
          name: "Áo pull J2TEAM",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo',
          price: 120000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
      ],

      popularProducts: [
        {
          id: 1,
          name: "Áo pull J2TEAM",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo',
          price: 120000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
        {
          id: 2,
          name: "Chiếu trúc",
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU',
          slug: 'alo-alo-123',
          price: 128000,
        },
      ],
    }
  }
};
</script>
<style lang='scss' scoped>
@import url("./style.scss");
@import url("./plugin.scss");
</style>

