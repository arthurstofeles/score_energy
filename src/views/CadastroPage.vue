<template>
  <div class="cadastro se_blue_dark">
    <v-container>
      <router-link to="/">
        <img class="mb-4" src="@/assets/logo-score-energy.svg" alt="Logo ScoreEnergy"
      /></router-link>
      <FormularioCriarConta @criar="cadastrar" :loading="loading" />
      <AlertError :alertError="error" :messageError="message" />
      <AlertSuccess
        :dialog="sucess"
        :dialogMessage="message"
        dialogTextButton="Realizar Login"
        @close="$router.push({ name: 'Login' })"
      />
    </v-container>
  </div>
</template>

<script>
// import { criaConta } from "@/utils/services.js";
import AlertError from "@/components/custom/AlertError";
import AlertSuccess from "@/components/custom/AlertSuccess";
import FormularioCriarConta from "@/components/cadastro-page/Formulario.vue";
export default {
  name: "CriarConta",
  components: { FormularioCriarConta, AlertError, AlertSuccess },
  data: () => ({
    isMobile: false,
    loading: false,
    error: false,
    sucess: false,
    message: "Ocorreu um erro inesperado.",
  }),
  created() {
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
    });
    this.isMobile = window.innerWidth <= 768;
  },
  methods: {
    async cadastrar() {
      //   this.loading = true;
      //   this.sucess = false;
      //   this.error = false;
      //   try {
      //     await criaConta(event).then(() => {
      //       this.loading = false;
      //       this.sucess = true;
      //       this.message = "Cadastro concluído com sucesso!";
      //     });
      //   } catch (err) {
      //     this.error = true;
      //     this.loading = false;
      //     if (err.response.data.detail === "E-mail already registered") {
      //       this.message = "Este e-mail já está cadastrado.";
      //     }
      //     console.error(err);
      //   }
    },
  },
};
</script>
<style scoped>
.cadastro {
  height: 100%;
}
</style>