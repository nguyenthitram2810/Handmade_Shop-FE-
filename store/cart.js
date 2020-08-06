const Cookie = process.client ? require('js-cookie') : undefined

import axios from "axios"

export const state = () => ({
  listProduct: [],
  listProductNoLogin: [],
})
  
export const mutations = {
  addCart (state, title) {
    state.listProduct = title
  },

  cartNoLogin(state, title) {
    state.listProductNoLogin = title
  },

  removeCartNoLogin(state) {
    state.listProductNoLogin = []
  }
}

export const actions = {
  addCart( { commit }, { product, quantity}) {
    try {
      let temp = {}
      temp["product"] = product
      temp["count"] = quantity  
      if(localStorage.getItem('product')) {
        let arrTemp = JSON.parse(localStorage.getItem('product'))
        let check = 0
        arrTemp.forEach(element => {
          if(element.product.id == temp.product.id) {
            element.count+= temp.count
            check++
          }
        });
        if(check == 0) {
          arrTemp.push(temp)
        }
        localStorage.setItem('product', JSON.stringify(arrTemp));
      }
      else {
        let arrTemp = []
        arrTemp.push(temp)
        localStorage.setItem('product', JSON.stringify(arrTemp));
      }
      commit('addCart', JSON.parse(localStorage.getItem('product')))
    }
    catch(e) {
      throw e
    }
  },
  cartNoLogin( { commit }, { product, quantity}) {
    try {
      let temp = {}
      temp["product"] = product
      temp["count"] = quantity  
      if(localStorage.getItem('productNoLogin')) {
        let arrTemp = JSON.parse(localStorage.getItem('productNoLogin'))
        let check = 0
        arrTemp.forEach(element => {
          if(element.product.id == temp.product.id) {
            element.count+= temp.count
            check++
          }
        });
        if(check == 0) {
          arrTemp.push(temp)
        }
        localStorage.setItem('productNoLogin', JSON.stringify(arrTemp));
      }
      else {
        let arrTemp = []
        arrTemp.push(temp)
        localStorage.setItem('productNoLogin', JSON.stringify(arrTemp));
      }
      commit('cartNoLogin', JSON.parse(localStorage.getItem('productNoLogin')))
    }
    catch(e) {
      throw e
    }
  },

  async removeCart({ commit }, { key }) {
    try {
      let products = JSON.parse(localStorage.getItem('product'))
      products = products.filter(item => item.product.id !== key)
      localStorage.setItem('product', JSON.stringify(products))
      commit('addCart', JSON.parse(localStorage.getItem('product')))
    }
    catch(e) {
      throw e
    }
  },

  
  mergeCart({commit}) {
    try {
      let arrMain = []
      if(localStorage.getItem('product')) {
        arrMain = JSON.parse(localStorage.getItem('product'))
      }
      let arrTemp = JSON.parse(localStorage.getItem('productNoLogin'))
      arrTemp.forEach(temp => {
        let check = 0 
        arrMain.forEach(main => {
          if(temp.product.id == main.product.id) {
            main.count += temp.count
            check++
          }
        })
        if(check == 0) {
          arrMain.push(temp)
        }
      })
      localStorage.removeItem('productNoLogin')
      localStorage.setItem('product', JSON.stringify(arrMain));
      commit('addCart', JSON.parse(localStorage.getItem('product')))
      commit('removeCartNoLogin')
    }
    catch(e) {
      throw e
    }
  },

  changeAmount({commit}, { record }) {
    try {
      let products = JSON.parse(localStorage.getItem('product'))
      products.forEach(e => {
        if(e.product.id == record.key) {
          e.count = record.amount
        }
      })
      localStorage.setItem('product', JSON.stringify(products))
      commit('addCart', JSON.parse(localStorage.getItem('product')))
    }
    catch(e) {
      throw e
    }
  }
}