import Vue from 'vue'
import Vuex from 'vuex'
import Auth from "./auth"
import axios from "axios"

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      ...Auth.state,

      user: {}
    },
    getters: {
      ...Auth.getters,

      getUser(state) {
        return state.user
      }
    },
    actions: {
      ...Auth.actions,

      fetchUser(context) {
        return new Promise((resolve, reject) => {
          axios.get("/me").then((res) => {
            context.commit("setUser", res.data);
            resolve(res.data);
          })
        })
      }
    },
    mutations: {
      ...Auth.mutations,

      setUser(state, user) {
        state.user = user;
      }
    },
  });


export default store
