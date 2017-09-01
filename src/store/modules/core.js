const state = {
     box : [1,2,3]
}


const actions = {

  ['add_action']({commit},payload) {
    commit('save_test',payload)
  }
}


const mutations = {
  ['save_test'](state,payload){
    state.box.push(payload)
  }
}

const getters = {
  ['getBox'] (state) {
    return state.box
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}