const Cookie = process.client ? require('js-cookie') : undefined

export default function ({ store, redirect }) {
  if(Cookie.get('user')) { 
    store.commit('auth/setUser', JSON.parse(Cookie.get('user')))
  }
  if (store.state.auth.userNow == null) {
    return redirect('/admin/login')
  }
  if(store.state.auth.userNow != null) {
    let user = store.state.auth.userNow
    if(user.roleId != 1) {
      return redirect('/')
    }
  }
}
