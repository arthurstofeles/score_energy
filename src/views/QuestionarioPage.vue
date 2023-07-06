<template>
  <div class="questionario se_blue_dark">
    <v-container>
      <HeaderMobile :links="links" />
      <FormularioQuestionario />
      <AlertError :alertError="error" :messageError="message" />
    </v-container>
  </div>
</template>

<script>
import FormularioQuestionario from "@/components/questionario-page/Formulario.vue";
import HeaderMobile from "@/components/custom/HeaderMobile.vue";
export default {
  name: "QuestionarioPage",
  components: { FormularioQuestionario, HeaderMobile },
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
  }),
};
</script>

<style scoped>
.questionario {
  height: 100%;
}
</style>
