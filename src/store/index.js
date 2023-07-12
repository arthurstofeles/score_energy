import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    loggedIn:
      Vue.$cookies.get("loggedIn") != undefined ? Vue.$cookies.get("loggedIn") : "deslogado",
  },
  mutations: {
    SET_LOOGEDIN(state, payload) {
      (state.loggedIn = payload), Vue.$cookies.set("loggedIn", state.loggedIn);
    },
  },
  actions: {
    setLoggedIn(context, payload) {
      context.commit("SET_LOOGEDIN", payload);
    },
  },
  modules: {},
});
