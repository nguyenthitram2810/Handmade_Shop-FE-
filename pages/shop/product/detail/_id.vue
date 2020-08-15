<template>
  <div class="pt-3 pb-3 al-bg-out ">
    <div class="container-fluid">
      <div class="al-margin-7 al-bg-white p-2 al-height-detail">
        <div class="row">
          <div class="col-md-5">
            <a-carousel arrows dots-class="slick-dots slick-thumb">
              <a slot="customPaging" slot-scope="props">
                <img :src="getImgUrl(props.i)" />
              </a>
              <div class="" v-for="(item, index) in product.gallery" :key="index">
                <img :src="item.src" width="100%"/>
              </div>
            </a-carousel>
          </div>
          <div class="col-md-7 pt-2">
            <h3 class="font--25 al-text-space">{{ product.name }}</h3>
            <div class="d-flex align-items-center mt-2 mb-3">
              <div>
                <span class="mr-2">{{ product.sold}} Đã bán</span>
                <span class="mr-2">|</span>
              </div>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
            </div>
            
            <!-- <div class="mt-2 mb-4 py-1 al-bg-bestseller d-flex align-items-center justify-content-center border-radius--10 w-100-px">
              <a-icon class="color-white mr-1" type="dollar-circle" theme="filled" />
              <span class="color-white">Best seller</span>
            </div> -->

            <div class="w-100 py-3 al-bg-price pl-4 my-2 d-flex align-items-center">
              <div class="mr-4 al-line-through">₫ {{ product.price }}</div>
              <h3 class="al-color-price font--25 mr-3">₫ {{ product.reduce }}</h3>
            </div>

            <div class="my-4 al-height-description">
              {{ product.description }}
            </div>

            <a-button-group class="d-flex align-items-center my-4">
              <h4 class="mr-4">Số lượng</h4>
              <a-button class="al-border-left-radius" v-on:click="quantity++">+</a-button>
              <a-input class="al-input-quantity al-radius-0 al-borderx-0 w-60-px al-text-center" v-model="quantity" :value="quantity" />
              <a-button class="al-border-right-radius" v-on:click="quantity--">-</a-button>
              <span class="ml-3">{{product.restAmount}} sản phẩm có sẵn</span>
            </a-button-group>

            <div >
              <a-button size="large" class="al-button-cart mr-5" icon="shopping-cart" @click="addCart(product)">
                Thêm vào giỏ hàng
              </a-button>
              <a-button @click="buyNow(product)" size="large" class="al-button-buy px-5">
                Mua ngay
              </a-button>
            </div>

            <div class="d-flex mt-4">
              <h4>Category:</h4>
              <nuxt-link :to="`/${category.slug}`" class="font--17 pl-1">{{ category.name }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <div class="al-margin-7 mt-3 al-bg-white p-3">
        <div class="row">
          <div class="col-4 d-flex align-items-center al-border-right">
            <a-avatar :size="64" :src="shop.thumbnail" />
            <div class="d-flex flex-column pl-2 justify-content-between">
              <h4>{{shop.name}}</h4>
              <nuxt-link :to="`/shop/${shop.slug}`">
                <a-button class="mt-1" size="small">
                  Xem shop
                </a-button>
              </nuxt-link>
            </div>
          </div>
          <div class="col-4 d-flex flex-column justify-content-between">
            <p>Số đánh giá  <span class="pl-3 al-color-orange">108</span></p> 
            <p class="mb-0">Sản phẩm <span class="pl-4 al-color-orange">170</span></p>
          </div>
          <div class="col-4 d-flex flex-column justify-content-between">
            <p>Tham gia  <span class="pl-3 al-color-orange">2 tháng trước</span></p>
            <p class="mb-0">Đánh giá  <span class="pl-3 al-color-orange">4.7</span></p>
          </div>
        </div>
      </div>

      <div class="al-margin-7 mt-3 al-bg-white p-3">
        <h3>CHI TIẾT SẢN PHẨM</h3>
        <div class="pl-5 pt-3 d-flex">
          <div class="d-flex flex-column">
            <p>Danh mục hàng</p>
            <p>Vật liệu</p>
            <p>Kho hàng</p>
            <p>Gửi từ</p>
          </div>
          <div class="d-flex flex-column pl-5">
            <p>{{ category.name}}</p>
            <p><span v-for="(item, index) in product.materials" :key="index">{{ item.name }}, </span></p>
            <p>{{ product.restAmount }}</p>
            <p>Hồ Chí Minh</p>
          </div>
        </div>
      </div>

      <div class="al-margin-7 mt-3 al-bg-white p-3">
        <h3>ĐÁNH GIÁ SẢN PHẨM</h3>
        <div class="d-flex al-bg-price p-3 my-3">
          <div class="d-flex flex-column">
            <div class="d-flex al-color-price m-auto"><h2 class="align-self-end pr-1 al-color-price">4</h2> <p class="align-self-end mb-2">  trên 5</p></div>
            <div class="mb-0 font--25">
              <a-icon  style="color: #f77f00" type="star" theme="filled"/>
              <a-icon  style="color: #f77f00" type="star" theme="filled"/>
              <a-icon  style="color: #f77f00" type="star" theme="filled"/>
              <a-icon  style="color: #f77f00" type="star" theme="filled"/>
              <a-icon type="star" />
            </div>
          </div>
          <div class="row pl-5 align-items-center">
            <a-button class="mr-2">Tất cả</a-button>
            <a-button class="mr-2">5 Sao</a-button>
            <a-button class="mr-2">4 Sao</a-button>
            <a-button class="mr-2">3 Sao</a-button>
            <a-button class="mr-2">2 Sao</a-button>
            <a-button class="mr-2">1 Sao</a-button>
          </div>
        </div>
        <div class="d-flex flex-column">
          <div class="row pl-3">
            <div class="col-1" style="text-align:right;">
              <a-avatar style="backgroundColor:#87d068" icon="user" />
            </div>
            <div class="d-flex flex-column col-11">
              <h4>Nguyễn Thị Trâm</h4>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p>Máy rất mượt màn hình ổn pin trâu mỗi tội sạc theo máy chỉ có 5v 1a nên sạc khá lâu mới đầy pin. Không có google
                  cũng hơi bất tiện.toàn phải dùng apkpure tải ứng dụng về. Nói chung tầm giá 3tr mua về giải trí xem phim con này 
                  là tốt nhất
              </p>
            </div>        
          </div>
          <div class="row pl-3">
            <div class="col-1" style="text-align:right;">
              <a-avatar style="backgroundColor:#87d068" icon="user" />
            </div>
            <div class="d-flex flex-column col-11">
              <h4>Nguyễn Thị Trâm</h4>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p>Máy rất mượt màn hình ổn pin trâu mỗi tội sạc theo máy chỉ có 5v 1a nên sạc khá lâu mới đầy pin. Không có google
                  cũng hơi bất tiện.toàn phải dùng apkpure tải ứng dụng về. Nói chung tầm giá 3tr mua về giải trí xem phim con này 
                  là tốt nhất
              </p>
            </div>        
          </div>
        </div>
      </div>

      <div class="al-margin-7 mt-3 al-bg-white p-3">
        <div>
          <a-comment>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <div slot="content">
              <a-form-item>
                <a-textarea :rows="4" :value="value" @change="handleChange" />
              </a-form-item>
              <a-form-item>
                <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                  Add Comment
                </a-button>
              </a-form-item>
            </div>
          </a-comment>
          <a-list
            v-if="comments.length"
            :data-source="comments"
            :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
            item-layout="horizontal"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-comment
                :author="item.author"
                :avatar="item.avatar"
                :content="item.content"
                :datetime="item.datetime"
              />
            </a-list-item>
          </a-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import moment from 'moment'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'cart',
  middleware: 'getState',
  data() {
    return {
      quantity: 1,
      product: {},
      shop: {},
      category: '',
      comments: [],
      submitting: false,
      value: '',
      moment,
    };
  },
  mounted() {
    this.getProduct()
  },
  watch: {
    quantity(newValue) {
      if(newValue < 1) {
        this.quantity = 1
      }
      if(newValue > this.product.restAmount) {
        this.quantity = this.product.restAmount
      }
    }
  },
  methods: {
    getImgUrl(i) {
      return this.product.gallery[i].src;
    },
    async getProduct() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/products/${this.$route.params.id}`)
        console.log(response);
        if(response.data.status == "200") {
          this.product = response.data.data
          this.category = response.data.data.category
          this.shop = response.data.data.shop
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
            e.message
        });
      }
    },
    handleSubmit() {
      if (!this.value) {
        return;
      }

      this.submitting = true;

      setTimeout(() => {
        this.submitting = false;
        this.comments = [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: moment().fromNow(),
          },
          ...this.comments,
        ];
        this.value = '';
      }, 1000);
    },
    handleChange(e) {
      this.value = e.target.value;
    },

    addCart(product) {
      try {
        if(Cookie.get('user')) {
          let user = JSON.parse(Cookie.get('user'));
          let id = String(user.id)
          if(user.shopActive) {
            if(user.shop.id != product.shop.id) {
              this.$store.dispatch('cart/addCart', { shop: this.shop, product, quantity: this.quantity, state: 'product', userID: id })
            }
            else {
              throw {
                message: "Bạn không thể mua sản phẩm của cửa hàng mình!"
              }
            }
          }
          else {
            this.$store.dispatch('cart/addCart', { shop: this.shop, product, quantity: this.quantity, state: 'product', userID: id })
          }
        }
        else {
          this.$store.dispatch('cart/addCart', { shop: this.shop, product, quantity: this.quantity,  state: 'productNoLogin', userID: 'noLogin' })
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

    buyNow(product) {
      console.log(product)
      this.addCart(product)
      this.$router.push("/cart")
    }
  },
};
</script>
<style scoped>
.ant-carousel >>> .slick-dots {
  height: auto;
}
.ant-carousel >>> .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 100%;
}
.ant-carousel >>> .slick-thumb {
  bottom: -80px;
}
.ant-carousel >>> .slick-thumb li {
  width: 80px;
  height: 80px;
}
.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>