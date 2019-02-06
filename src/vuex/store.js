import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  userName: 'aa',
  userId: ''
}

const mutations = {
  changeUser(userObj) {
    state.userName = userObj.name;
    state.userId = userObj.id
  }
}

const getters = {
}
const actions={
    changeUserAction({commit}, data) {
      commit('changeUser', data)
    }
}


export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})