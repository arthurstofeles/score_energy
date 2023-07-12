<template>
  <div class="login se_blue_dark">
    <v-container>
      <router-link to="/">
        <img class="mb-4" src="@/assets/logo-score-energy.svg" alt="Logo ScoreEnergy"
      /></router-link>
      <FormularioLogin
        @login="logar"
        :loading="loading"
        @recuperar="formModal = true"
      />
      <AlertError :alertError="error" :messageError="message" />
      <AlertSuccess
        :dialog="sucess"
        :dialogMessage="message"
        dialogTextButton="Fechar"
        @close="sucess = false"
      />
      <RecuperarSenha
        :dialog="formModal"
        @close="formModal = false"
        @recuperar="recuperar"
        :loading="loadingModal"
      />
    </v-container>
  </div>
</template>

<script>
import { login, recuperarSenha } from "@/utils/services.js";
import AlertError from "@/components/custom/AlertError";
import AlertSuccess from "@/components/custom/AlertSuccess";
import FormularioLogin from "@/components/login-page/Formulario.vue";
import RecuperarSenha from "@/components/login-page/RecuperarSenha.vue";
export default {
  name: "LoginPage",
  components: { FormularioLogin, AlertError, AlertSuccess, RecuperarSenha },
  data: () => ({
    isMobile: false,
    loading: false,
    error: false,
    sucess: false,
    message: "Ocorreu um erro inesperado.",
    formModal: false,
    loadingModal: false,
  }),
  beforeCreate() {
    if (this.$store.state.loggedIn === "logado") {
      this.$router.push({ path: "/simulador" });
    }
  },
  created() {
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
    });
    this.isMobile = window.innerWidth <= 768;
  },
  methods: {
    async logar(event) {
      this.loading = true;
      this.error = false;
      try {
        await login(event).then((resp) => {
          this.loading = false;
          this.$router.push({ path: "/questionario" });
          window.localStorage.token = `Bearer ${resp.token}`;
          // this.$store.dispatch("setLoggedIn", "logado");
        });
      } catch (err) {
        this.error = true;
        this.loading = false;
        console.error(err);
      }
    },
    async recuperar() {
      this.sucess = false;
      this.loadingModal = true;
      this.error = false;
      try {
        await recuperarSenha(event).then(() => {
          this.loadingModal = false;
          this.formModal = false;
          this.sucess = true;
          this.message = "Verifique seu e-mail e segua os próximos passos";
        });
      } catch (err) {
        this.loadingModal = false;
        this.formModal = false;
        this.error = true;
        console.error(err);
      }
    },
  },
};
</script>
<style scoped>
.login {
  height: 100%;
}
</style>
