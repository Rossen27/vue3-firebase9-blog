import { createStore } from 'vuex'

export default createStore({
  state: {
    usuario: null,
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    }
  },
  // 從 onAuthStateChanged 接收數據(main.js)
  actions: {
    detectarUsuario({commit}, usuario){
      commit('setUsuario', usuario)
    }
  },
  // 如果用戶存在則返回首頁
  getters: {
    existeUsuario(state){
      if(state.usuario === null){
        return false;
      }else{
        return true;
      }
    }
  },
  modules: {
  }
})