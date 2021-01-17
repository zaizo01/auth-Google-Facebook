import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '@/firebase'
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    newUser(state, payload){
      if (payload === null) {
        state.user = ''
      } else {
        state.user = payload;
      }
    }
  },
  actions: {
    async setUser({commit}, user){

      try {
          const doc = db.collection('users').doc(user.uid).get()
          if (doc.exists) {
            commit('newUser', doc.data())
          } else {

            const userInfo = {
              name: user.displayName,
              email: user.email,
              uid: user.uid,
              photo: user.photoURL
          }
            await  db.collection('users').doc(user.uid).set(
              userInfo
          )

          console.log('User authenticared in DB');
          commit('newUser', userInfo);
          }

      } catch (error) {
        console.log(error);
      }

        
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
