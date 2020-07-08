<template>
  <div class="form-body">
      <div class="website-logo">
        <nuxt-link to="/">
          <div class="logo">
            <img class="logo-size" src="/images/logoName.png" alt="">
          </div>
        </nuxt-link>
      </div>

      <div class="row">
        <div class="img-holder">
            <div class="bg"></div>
            <div class="info-holder">
            </div>
        </div>

        <div class="form-holder">
          <div class="form-content">
            <div class="form-items">
              <h3>Đăng nhập với Alibabu</h3>
              <p>Alibabu - Thiên đường mua sắm</p>

              <div class="page-links">
                  <nuxt-link to="/login" class="active">Đăng nhập</nuxt-link>
                  <nuxt-link to="/register">Đăng ký</nuxt-link>
              </div>

              <form>
                  <input class="form-control" type="text" name="email" placeholder="Địa chỉ Email" required>
                  <input class="form-control" type="password" name="password" placeholder="Mật khẩu" required>
                  <input type="checkbox" id="chk1"><label for="chk1">Lưu đăng nhập</label>
                  <div class="form-button">
                      <button id="submit" type="submit" class="ibtn">Đăng nhập</button> 
                      <nuxt-link to="#">Quên mật khẩu?</nuxt-link>
                  </div>
              </form>

              <div class="other-links">
                  <span>Đăng nhập với</span><a href="#">Facebook</a><a href="#">Google</a><a href="#">Linkedin</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'fullpage',
}
</script>

<style lang='scss' scoped>
@import url("./style.scss");
@import url("./theme.scss");
</style>
