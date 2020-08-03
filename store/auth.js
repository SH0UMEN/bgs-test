import axios from 'axios'

const cookieparser = process.server ? require('cookieparser') : undefined;
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  state: {
    token: "",
  },
  getters: {
  },
  actions: {
    // Проверка токена
    nuxtServerInit ({ commit }, { req }) {
      let token = null;
      if (req.headers.cookie) {
        const parsed = cookieparser.parse(req.headers.cookie);
        token = parsed.token;
      }
      commit('authSuccess', token)
    },
    // Выход
    logout(context) {
      return new Promise((resolve, reject) => {
        context.commit('logout');
        resolve()
      })
    },
    // Авторизация
    auth(context, params) {
      return new Promise((resolve, reject) => {
        axios.post("/auth", params)
          .then((res)=>{
            let token = res.data.token;
            context.commit('authSuccess', token);
            resolve(res)
          }).catch((err)=>{
            reject(err);
          })
      })
    }
  },
  mutations: {
    logout(state) {
      Cookie.remove('token');
      state.token = "";
    },
    authSuccess(state, token) {
      Cookie ? Cookie.set('token', token) : "";
      state.token = token;
    },
  }
}
