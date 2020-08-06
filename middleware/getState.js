const Cookie = process.client ? require('js-cookie') : undefined

export default function ({ store, redirect }) {
  if(localStorage.getItem('product')) { 
    store.commit('cart/addCart', JSON.parse(localStorage.getItem('product')))
  }
  if(localStorage.getItem('productNoLogin')) {
    store.commit('cart/cartNoLogin', JSON.parse(localStorage.getItem('productNoLogin')))
  }
}
