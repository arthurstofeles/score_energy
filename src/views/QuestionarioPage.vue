<template>
  <div class="questionario se_blue_dark">
    <v-container>
      <router-link to="/">
        <img
          class="mb-4"
          src="@/assets/logo-score-energy.svg"
          alt="Logo ScoreEnergy"
      /></router-link>
      <FormularioQuestionario />
      <AlertError :alertError="error" :messageError="message" />
    </v-container>
  </div>
</template>

<script>
import FormularioQuestionario from "@/components/questionario-page/Formulario.vue";
export default {
  name: "QuestionarioPage",
  components: { FormularioQuestionario },
};
</script>

<style scoped>
.questionario {
  height: 100%;
}
</style>
