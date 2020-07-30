const Cookie = process.client ? require('js-cookie') : undefined

export default function ({ store, redirect }) {
  if(Cookie.get('user')) { 
    store.commit('auth/setUser', JSON.parse(Cookie.get('user')))
  }
  if (store.state.auth.userNow.shopActive == true) {
    return redirect('/shop/manage/product/list')
  }
}
