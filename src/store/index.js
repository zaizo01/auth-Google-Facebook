import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '@/firebase'
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    newUser(state, payload){
      state.user = payload;
    }
  },
  actions: {
    setUser({commit}, user){
        const userInfo = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photo: user.photoURL
      }
      commit('newUser', userInfo);
    },
    closeSession({commit}){
      auth.signOut();
      commit('setUser', null);
      router.push({name: 'Login'})
    }
  },
  modules: {
  }
})
