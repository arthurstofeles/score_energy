import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "HomePage" */ "@/views/HomePage.vue"),
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "LoginPage" */ "@/views/LoginPage.vue"),
  },
  {
    path: "/cadastro",
    component: () =>
      import(/* webpackChunkName: "CadastroPage" */ "@/views/CadastroPage.vue"),
  },
  {
    path: "/questionario",
    component: () =>
      import(/* webpackChunkName: "QuestionarioPage" */ "@/views/QuestionarioPage.vue"),
  },
  {
    path: "/obrigado",
    component: () =>
      import(/* webpackChunkName: "ObrigadoPage" */ "@/views/ObrigadoPage.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
