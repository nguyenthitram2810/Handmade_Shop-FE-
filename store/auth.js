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
      const response = await axios.get(`http://whispering-reef-26272.herokuapp.com/api/v1/users/mail/verify?token=${token}`)
      console.log(response)
      if(response.data.status == "200") {
        Cookie.set('user', JSON.stringify(response.data.data.userInfo))
        Cookie.set('token', response.data.data.token)
        await commit('setUser', JSON.parse(Cookie.get('user')))
      }
      else {
        throw response.data
      }
    }
    catch (e) {
      console.log(e);
      throw e.message
    }
  },
  
  async login({ commit }, {password, username}) {
    try {
      const response = await axios.post(`http://whispering-reef-26272.herokuapp.com/api/v1/signin`, {
        username: username,
        password: password,
      })
      console.log(response);
      if(response.data.status == "200") {
        Cookie.set('user', JSON.stringify(response.data.data.userInfo))
        Cookie.set('token', response.data.data.token)
        await commit('setUser', JSON.parse(Cookie.get('user')))
      }
      else {
        throw response.data
      }
    }
    catch(e) {
      throw e.message
    }
  },

  async loginAdmin({ commit }, {password, username}) {
    try {
      const response = await axios.post(`http://whispering-reef-26272.herokuapp.com/api/v1/signin`, {
        username: username,
        password: password,
      })
      console.log(response);
      if(response.data.status == "200") {
        let user = response.data.data.userInfo
        if(user.roleId != 1) {
          throw {
            message: "Bạn không có quyền truy cập trang Admin!"
          }
        }
        else {
          Cookie.set('user', JSON.stringify(response.data.data.userInfo))
          Cookie.set('token', response.data.data.token)
          await commit('setUser', JSON.parse(Cookie.get('user')))
        }
      }
      else {
        throw response.data
      }
    }
    catch(e) {
      throw e.message
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
  },
}