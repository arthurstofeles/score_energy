<template>
  <div class="questionario se_blue_dark">
    <v-container>
      <HeaderMobile :links="links" />
      <FormularioQuestionario
        :questions="questions"
        v-if="questions.length > 0"
        @calcular="setResultado"
        :loading="loadingBtn"
      />
      <div class="d-flex justify-center pt-16" v-else>
        <v-progress-circular
          :size="75"
          indeterminate
          color="se_green_light"
        ></v-progress-circular>
      </div>
      <AlertError :alertError="error" :messageError="message" />
    </v-container>
  </div>
</template>

<script>
import { perguntasScore, resultadoScore } from "@/utils/services.js";
import AlertError from "@/components/custom/AlertError";
import FormularioQuestionario from "@/components/questionario-page/Formulario.vue";
import HeaderMobile from "@/components/custom/HeaderMobile.vue";
export default {
  name: "QuestionarioPage",
  components: { FormularioQuestionario, HeaderMobile, AlertError },
  data: () => ({
    links: [
      {
        title: "REFAZER SCORE",
        route: "/",
        children: [],
      },
      {
        title: "FINALIZAR ANÁLISE",
        route: "/",
        children: [],
      },
    ],
    error: false,
    message: "Ocorreu um erro inesperado",
    questions: [],
    loadingBtn: false,
  }),
  beforeCreate() {
    if (this.$store.state.loggedIn === "deslogado") {
      this.$router.push({ path: "/login" });
    }
  },
  created() {
    this.getPerguntas();
  },
  methods: {
    async getPerguntas() {
      const perguntas = await perguntasScore();
      this.questions = perguntas.results;
    },
    async setResultado(payload) {
      this.error = false;
      this.loadingBtn = true;
      try {
        await resultadoScore(payload).then(() => {
          this.loadingBtn = false;
          this.$store.dispatch("setThanks", true);
          this.$router.push({ path: "/obrigado" });
        });
      } catch (e) {
        this.loadingBtn = false;
        this.error = true;
      }
    },
  },
};
</script>

<style scoped>
.questionario {
  height: 100%;
}
</style>
