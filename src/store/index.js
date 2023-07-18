import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    loggedIn:
      Vue.$cookies.get("loggedIn") != undefined
        ? Vue.$cookies.get("loggedIn")
        : "deslogado",
    thanks: false,
    simulate: null,
  },
  mutations: {
    SET_LOOGEDIN(state, payload) {
      (state.loggedIn = payload), Vue.$cookies.set("loggedIn", state.loggedIn);
    },
    SET_THANKS(state, payload) {
      state.thanks = payload;
    },
    SET_SIMULATE(state, payload) {
      state.simulate = payload;
    },
  },
  actions: {
    setLoggedIn(context, payload) {
      context.commit("SET_LOOGEDIN", payload);
    },
    setThanks(context, payload) {
      context.commit("SET_THANKS", payload);
    },
    setSimulate(context, payload) {
      context.commit("SET_SIMULATE", payload);
    },
  },
  modules: {},
});
