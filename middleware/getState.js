const Cookie = process.client ? require('js-cookie') : undefined

export default function ({ store, redirect }) {
  let user = {}
  if(Cookie.get('user')) {
    user = JSON.parse(Cookie.get('user'));
  }
  let id = String(user.id)
  if(localStorage.getItem(id)) { 
    let amount = 0
    let products = JSON.parse(localStorage.getItem(id))
    store.commit('cart/addCart', {
      data: products,
      state: 'product'
    })
    products.forEach(e => {
      amount += e.products.length
    });
    store.commit('cart/changeLength', {
      data: amount,
      state: 'product'
    })
  }
  if(localStorage.getItem('noLogin')) {
    let amount = 0
    let products = JSON.parse(localStorage.getItem('noLogin'))
    store.commit('cart/addCart', {
      data: products,
      state: 'productNoLogin'
    })
    products.forEach(e => {
      amount += e.products.length
    });
    store.commit('cart/changeLength', {
      data: amount,
      state: 'productNoLogin'
    })
  }
}
