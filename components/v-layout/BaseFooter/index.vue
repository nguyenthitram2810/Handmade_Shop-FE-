<template>
  <footer>
    <div class="bg-footer al-w-100">
      <a-row type="flex" justify="space-around" class="mx-3 color-white py-3">
        <a-col :span="5" class="pl-5">
          <div>
            <nuxt-link to="#" class="font---text d-block color-white mb-2 font--bold">Chăm sóc khách hàng</nuxt-link>
            <div class="font--15">
              <nuxt-link to="#" class="d-block color-white">Hướng dẫn mua hàng</nuxt-link>
              <nuxt-link to="#" class="d-block color-white">Hướng dẫn bán hàng</nuxt-link>
              <nuxt-link to="#" class="d-block color-white">Thanh toán</nuxt-link>
              <nuxt-link to="#" class="d-block color-white">Vận chuyển</nuxt-link>
              <nuxt-link to="#" class="d-block color-white">Trả hàng & hoàn tiền</nuxt-link>
              <nuxt-link to="#" class="d-block color-white">Chăm sóc khách hàng</nuxt-link>
              <nuxt-link to="#" class="d-block color-white">Chính sách bảo hành</nuxt-link>
            </div>
          </div>
        </a-col>
        <a-col :span="5" class="pl-5">
          <nuxt-link to="#" class="font---text d-block color-white mb-2 font--bold">Về Alibabu</nuxt-link>
          <div class="font--15">
              <nuxt-link to="#" class="d-block color-white">Giới thiệu về Alibabu</nuxt-link>
              <nuxt-link to="#" class="d-block color-white">Tuyển dụng</nuxt-link>
              <nuxt-link to="#" class="d-block color-white">Điều khoản Alibabu</nuxt-link>
              <nuxt-link to="#" class="d-block color-white">Chính sách bảo mật</nuxt-link>
            </div>
        </a-col>
        <a-col :span="5" class="pl-5">
          <nuxt-link to="#" class="font---text d-block color-white mb-2 font--bold">Thanh toán</nuxt-link>
          <div>
            <a-row type="flex">
              <a-col :span="6" class="mr-2">
                <img src="/images/visa.jpg" alt="" class="al-w-100" >
              </a-col>
              <a-col :span="6" class="mr-2">
                <img src="/images/paypal.jpg" alt="" class="al-w-100" >
              </a-col>
              <a-col :span="6" class="mr-2">
                <img src="/images/jcb.png" alt="" class="al-w-100">
              </a-col>
              <a-col :span="6" class="mr-2">
                <img src="/images/air-pay.jpg" alt="" class="al-w-100">
              </a-col>
            </a-row>
          </div>
          <nuxt-link to="#" class="font---text d-block color-white mb-2 font--bold">Vận chuyển</nuxt-link>
          <div>
            <a-row type="flex">
              <a-col :span="6" class="mr-2">
                <img src="/images/j&t.png" alt="" class="al-w-100" >
              </a-col>
              <a-col :span="6" class="mr-2">
                <img src="/images/vnpost.jpg" alt="" class="al-w-100" >
              </a-col>
              <a-col :span="6" class="mr-2">
                <img src="/images/ghtk.png" alt="" class="al-w-100">
              </a-col>
              <a-col :span="6" class="mr-2">
                <img src="/images/ghn.png" alt="" class="al-w-100">
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :span="5" class="pl-5">
          <nuxt-link to="#" class="font---text d-block color-white mb-2 font--bold">Theo dõi chúng tôi trên</nuxt-link>
          <div class="font--15">
              <nuxt-link to="#" class="d-block color-white"><span><i class="fab fa-facebook"></i> Facebook</span></nuxt-link>
              <nuxt-link to="#" class="d-block color-white"><span><a-icon type="instagram" theme="filled" /> Instagram</span></nuxt-link>
              <nuxt-link to="#" class="d-block color-white"><span><a-icon type="twitter" /> Twitter</span></nuxt-link>
            </div>
        </a-col>
      </a-row>
    </div>

    <div class="bg-copyright color-white font--15 py-3 px-3">
      <a-row type="flex" justify="space-around">
        <span>© 2020 Alibabu. Tất cả các quyền được bảo lưu.</span>
        <span>Quốc gia và Khu vực: Việt Nam | Thái Lan</span>
      </a-row>
    </div>
  </footer>
</template>

<style scoped>
@import url("./style.scss");
</style>

<script>
export default {
  name: 'BaseFooter',
  props: {}
}
</script>
