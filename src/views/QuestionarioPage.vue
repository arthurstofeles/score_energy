<template>
  <div class="questionario se_blue_dark">
    <v-container>
      <HeaderMobile :links="links" />
      <FormularioQuestionario
        :questions="questions"
        v-if="questions.length > 0"
      />
      <AlertError :alertError="error" :messageError="message" />
    </v-container>
  </div>
</template>

<script>
import { perguntasScore } from "@/utils/services.js";
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
        route: "",
        children: [],
      },
      {
        title: "FINALIZAR ANÁLISE",
        route: "",
        children: [],
      },
    ],
    error: false,
    message: "Ocorreu um erro inesperado",
    questions: [],
  }),
  created() {
    this.getPerguntas();
  },
  methods: {
    async getPerguntas() {
      const perguntas = await perguntasScore();
      this.questions = perguntas.results;
      console.log(perguntas.results);
    },
  },
};
</script>

<style scoped>
.questionario {
  height: 100%;
}
</style>
