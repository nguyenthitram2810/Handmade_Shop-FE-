const Cookie = process.client ? require('js-cookie') : undefined

export default function ({ store, redirect }) {
  if(Cookie.get('user')) { 
    store.commit('auth/setUser', JSON.parse(Cookie.get('user')))
  }
}
