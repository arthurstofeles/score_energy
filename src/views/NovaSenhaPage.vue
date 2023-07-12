<template>
  <div class="nova-senha se_blue_dark">
    <v-container>
      <router-link to="/">
        <img
          class="mb-4"
          src="@/assets/logo-score-energy.svg"
          alt="Logo ScoreEnergy"
      /></router-link>
      <FormularioNovaSenha @criar="criar" :loading="loading" />
      <AlertError :alertError="error" :messageError="message" />
      <AlertSuccess
        :dialog="sucess"
        :dialogMessage="message"
        dialogTextButton="REalizarLogin"
        @close="sucess = false"
      />
    </v-container>
  </div>
</template>

<script>
import { novaSenha } from "@/utils/services.js";
import AlertError from "@/components/custom/AlertError";
import AlertSuccess from "@/components/custom/AlertSuccess";
import FormularioNovaSenha from "@/components/nova-senha-page/Formulario.vue";
export default {
  name: "NovaSenha",
  components: { FormularioNovaSenha, AlertError, AlertSuccess },
  data: () => ({
    isMobile: false,
    loading: false,
    error: false,
    sucess: false,
    message: "Ocorreu um erro inesperado.",
  }),
  created() {
    if (!this.$route.query.token) {
      this.$router.push({ path: "/login" });
    }
  },
  methods: {
    async criar(event) {
      this.loading = true;
      this.sucess = false;
      this.error = false;
      try {
        await novaSenha(event).then(() => {
          this.loading = false;
          this.sucess = true;
          this.message = "Nova senha criada com sucesso!";
        });
      } catch (err) {
        this.error = true;
        this.loading = false;
        console.error(err);
      }
    },
  },
};
</script>
<style scoped>
.nova-senha {
  height: 100%;
}
</style>
