const Cookie = process.client ? require('js-cookie') : undefined

import axios from "axios"

export const state = () => ({
  listProduct: [],
  listProductNoLogin: [],
  amountProduct: null,
  amountProductNoLogin: null,
})
  
export const mutations = {
  addCart (state, payload) {
    if(payload.state == 'product') {
      state.listProduct = payload.data
    }
    else {
      state.listProductNoLogin = payload.data
    }
  },

  removeCartNoLogin(state) {
    state.listProductNoLogin = []
  },

  changeLength(state, payload) {
    if(payload.state =='product') {
      state.amountProduct = payload.data
    }
    else {
      state.amountProductNoLogin = payload.data
    }
  },

  removeAll(state) {
    state.amountProduct = null
    state.listProductNoLogin = null
    state.listProduct = null
    state.listProductNoLogin = null
  }
}

export const actions = {
  addCart( { commit }, {shop, product, quantity, state, userID}) {
    try { 
      let amountProduct = 0
      let objProduct = {}
      objProduct["product"] = product
      objProduct["count"] = quantity
      let arrTemp = []
      if(localStorage.getItem(userID)) {
        arrTemp = JSON.parse(localStorage.getItem(userID))
      }
      let checkShop = 0
      arrTemp.forEach(obj => {
        if(obj.shopID == shop.id) {
          checkShop++
          let checkProduct = 0
          let listProduct = obj.products
          listProduct.forEach(p => {
            if(p.product.id == product.id) {
              p.count += quantity
              checkProduct++
            }
          })
          if(checkProduct == 0) {
            obj.products.push(objProduct)
          }
        }
      })
      if(checkShop == 0) {
        let temp = {}
        temp["products"] = [objProduct]
        temp["shopID"] = shop.id
        temp["shopName"] = shop.name
        temp["slug"] = shop.slug
        arrTemp.push(temp)
      }
      localStorage.setItem(userID, JSON.stringify(arrTemp));
      console.log(JSON.parse(localStorage.getItem(userID)));
      commit('addCart', {
        data: JSON.parse(localStorage.getItem(userID)),
        state
      })
      arrTemp.forEach(e => {
        amountProduct += e.products.length
      })
      commit('changeLength', {
        data: amountProduct,
        state
      })
    }
    catch(e) {
      throw e
    }
  },
  async removeCart({ commit }, { key, state, userID }) {
    try {
      let amountProduct = 0
      let products = JSON.parse(localStorage.getItem(userID))
      products = products.filter(item => {
        let temp = item.products
        temp = temp.filter(e => e.product.id !== key)
        item.products = temp
        return item
      })
      products = products.filter(item => item.products.length != 0)
      let data = []
      if(products.length == 0) {
        localStorage.removeItem(userID)
      }
      else {
        localStorage.setItem(userID, JSON.stringify(products))
        data = JSON.parse(localStorage.getItem(userID))
      }
      commit('addCart', {
        data: data,
        state,
      })
      products.forEach(e => {
        amountProduct += e.products.length
      })
      commit('changeLength', {
        data: amountProduct,
        state
      })
    }
    catch(e) {
      throw e
    }
  },

  mergeCart({commit}, { userID }) {
    try {
      let amountProduct = 0
      let arrMain = []
      if(localStorage.getItem(userID)) {
        arrMain = JSON.parse(localStorage.getItem(userID))
      }
      let arrTemp = JSON.parse(localStorage.getItem('noLogin'))
      arrTemp.forEach(temp => {
        let check = 0 
        arrMain.forEach(main => {
          if(temp.shopID == main.shopID) {
            check++
            temp.products.forEach(p => {
              let checkProduct = 0
              main.products = main.products.filter(mP => {
                if(mP.product.id == p.product.id) {
                  mP.count += p.count
                  checkProduct++
                }
                return mP
              })
              if(checkProduct == 0) {
                main.products.push(p)
              }
            })
          }
        })
        if(check == 0) {
          arrMain.push(temp)
        }
      })
      localStorage.removeItem('noLogin')
      localStorage.setItem(userID, JSON.stringify(arrMain));
      commit('addCart', {
        data: JSON.parse(localStorage.getItem(userID)),
        state: 'product',
      })
      commit('removeCartNoLogin')
      commit('changeLength', {
        data: null, 
        state: 'productNoLogin'
      })
      arrMain.forEach(e => {
        amountProduct += e.products.length
      })
      commit('changeLength', {
        data: amountProduct,
        state: 'product'
      })
    }
    catch(e) {
      throw e
    }
  },

  changeAmount({commit}, { record, state, userID, changeRestAmount }) {
    try {
      let products = JSON.parse(localStorage.getItem(userID))
      products.forEach(e => {
        e.products.forEach(p => {
          if(p.product.id == record.key) {
            p.count = record.amount
            if(changeRestAmount == 'yes') {
              p.product.restAmount = record.amount
            }
          }
        })
      })
      localStorage.setItem(userID, JSON.stringify(products))
      commit('addCart', {
        data: JSON.parse(localStorage.getItem(userID)),
        state
      })
    }
    catch(e) {
      throw e
    }
  },


  removeAll({commit}) {
    try {
      commit('removeAll');
    }
    catch(e) {

    }
  }
}