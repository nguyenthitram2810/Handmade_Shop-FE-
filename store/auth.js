const Cookie = process.client ? require('js-cookie') : undefined

import axios from "axios"

export const state = () => ({
  userNow: null
})
  
export const mutations = {
  setUser (state, title) {
    state.userNow = title
    //log state.userNow đã có dữ liệu
  },

  removeUser (state) {
    console.log("remove");
    state.userNow = null
  }
}

export const actions = {
  async verifyRegister({ commit }, { token }) {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/users/mail/verify?token=${token}`)
      Cookie.set('user', JSON.stringify(response.data.results.userInfo))
      Cookie.set('token', response.data.results.token)
      await commit('setUser', JSON.parse(Cookie.get('user')))
    }
    catch (e) {
      throw e.response.data.error
    }
  },
  
  async login({ commit }, {name = 'abc', password, username}) {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/signin`, {
        username: username,
        password: password,
        name: name
      })
      Cookie.set('user', JSON.stringify(response.data.results.userInfo))
      Cookie.set('token', response.data.results.token)
      await commit('setUser', JSON.parse(Cookie.get('user')))
    }
    catch(e) {
      throw e.response.data.error
    }
  },

  async removeUser({ commit }) {
    try {
      await commit('removeUser')
    }
    catch(e) {
      console.log("error");
    }
  },

  setUser( { commit }, { user }) {
    try {
      Cookie.set('user', user)
      commit('setUser', JSON.parse(Cookie.get('user')))
    }
    catch(e) {
      console.log("error");
    }
  }
}