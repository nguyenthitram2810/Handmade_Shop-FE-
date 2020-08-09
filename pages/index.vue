<template>
  <div class="mx-4 mt-3" >
    <a-carousel autoplay>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel>

    <div class="mt-3 ">
      <p class="font--bold al-text-color font--20">Phổ biến</p>
    </div>
    
    <div class="popular_recommend">
      <a-carousel arrows :slidesToShow="5" :dots="false" :slidesToScroll = "5">
        <div
          slot="prevArrow"
          slot-scope="props"
          class="custom-slick-arrow"
          style="left: 10px;zIndex: 1"
        >
          <a-icon type="left-circle" />
        </div>

        <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
          <a-icon type="right-circle" />
        </div>
        
        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Áo pull JWT</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
              <div class="mb-1 al-bg-bestseller w-50 d-flex align-items-center justify-content-center border-radius--6">
                <a-icon class="color-white mr-1" type="dollar-circle" theme="filled" />
                <span class="color-white">Best seller</span>
              </div>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Đầm hoa thiết kế</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
              <div class="mb-1 al-bg-bestseller w-50 d-flex align-items-center justify-content-center border-radius--6">
                <a-icon class="color-white mr-1" type="dollar-circle" theme="filled" />
                <span class="color-white">Best seller</span>
              </div>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Áo pull J2Team</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Quần ống rộng</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Bàn trúc tròn</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Son Alibabu</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
              <div class="mb-1 al-bg-bestseller w-50 d-flex align-items-center justify-content-center border-radius--6">
                <a-icon class="color-white mr-1" type="dollar-circle" theme="filled" />
                <span class="color-white">Best seller</span>
              </div>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Son handmade</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
              <div class="mb-1 al-bg-bestseller w-50 d-flex align-items-center justify-content-center border-radius--6">
                <a-icon class="color-white mr-1" type="dollar-circle" theme="filled" />
                <span class="color-white">Best seller</span>
              </div>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Ghế trúc</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
            </div>
          </a-card>
        </div>
      </a-carousel>
    </div>

    <div class="mt-3 ">
      <p class="font--bold al-text-color font--20">Gợi ý cho bạn</p>
    </div>

    <div class="popular_recommend">
      <a-carousel arrows :slidesToShow="5" :dots="false" :slidesToScroll = "5">
        <div
          slot="prevArrow"
          slot-scope="props"
          class="custom-slick-arrow"
          style="left: 10px;zIndex: 1"
        >
          <a-icon type="left-circle" />
        </div>

        <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
          <a-icon type="right-circle" />
        </div>
        
        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Áo pull JWT</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
              <div class="mb-1 al-bg-bestseller w-50 d-flex align-items-center justify-content-center border-radius--6">
                <a-icon class="color-white mr-1" type="dollar-circle" theme="filled" />
                <span class="color-white">Best seller</span>
              </div>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Đầm hoa thiết kế</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
              <div class="mb-1 al-bg-bestseller w-50 d-flex align-items-center justify-content-center border-radius--6">
                <a-icon class="color-white mr-1" type="dollar-circle" theme="filled" />
                <span class="color-white">Best seller</span>
              </div>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Áo pull J2Team</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Quần ống rộng</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Bàn trúc tròn</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Son Alibabu</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
              <div class="mb-1 al-bg-bestseller w-50 d-flex align-items-center justify-content-center border-radius--6">
                <a-icon class="color-white mr-1" type="dollar-circle" theme="filled" />
                <span class="color-white">Best seller</span>
              </div>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Son handmade</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
              <div class="mb-1 al-bg-bestseller w-50 d-flex align-items-center justify-content-center border-radius--6">
                <a-icon class="color-white mr-1" type="dollar-circle" theme="filled" />
                <span class="color-white">Best seller</span>
              </div>
            </div>
          </a-card>
        </div>

        <div class="px-1">
          <a-card hoverable style="height: 280px;" class="pop-card">
            <img
              slot="cover"
              alt="product"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <div>
              <p class="al-text-color font--bold mb-0">Ghế trúc</p>
              <p class="font--15 mb-0">Pull Store</p>
              <div class="mb-0">
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon  style="color: #f77f00" type="star" theme="filled"/>
                <a-icon type="star" />
              </div>
              <p class="al-text-color font--bold mb-1">₫ 120.000</p>
            </div>
          </a-card>
        </div>
      </a-carousel>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'getState',
};
</script>
<style lang='scss' scoped>
@import url("./style.scss");
</style>