<template>
  <div>
    <v-container class="py-8">
      <v-row class="justify-center">
        <v-col cols="12" sm="8" md="8">
          <div class="d-flex justify-space-between align-end mb-8">
            <v-text-field
              v-model="formData.nome"
              label="Nome do Estabelecimento"
              required
              :rules="genericRules"
              color="se_green_light"
              item-color="se_green_light"
              dark
            ></v-text-field>
            <div class="text-center rounded-circle score" elevation="2">
              <p class="mb-0 display-1 font-weight-medium white--text">
                {{ calculateSocre() }}
              </p>
              <p class="mb-0 caption se_green_light--text">score</p>
            </div>
          </div>
          <h2 class="white--text">
            Responda as
            <span class="se_green_light--text">perguntas abaixo</span> para
            avaliar o seu consumo de energia
          </h2>
          <v-form class="pt-8 pb-4" ref="form" v-model="valid" lazy-validation>
            <div v-for="(question, index) in questions" :key="question.id">
              <div class="mb-8" v-if="checkConditional(question, index)">
                <div class="white pa-4 rounded-lg input-card">
                  <h3 class="se_blue_dark--text mb-4">
                    {{ question.title }}
                  </h3>
                  <v-select
                    v-if="question.input_type === 'select_box'"
                    v-model="formData.respostas[index].answer"
                    :items="question.answers"
                    :rules="genericRules"
                    label="Resposta"
                    placeholder="Resposta"
                    color="se_green_light"
                    item-color="se_green_light"
                    item-text="title"
                    item-value="id"
                    return-object
                  ></v-select>
                  <v-radio-group
                    :rules="genericRules"
                    required
                    v-model="formData.respostas[index].answer"
                    v-if="question.input_type === 'radio_button'"
                  >
                    <v-radio
                      v-for="option in question.answers"
                      :key="option.id"
                      :label="option.title"
                      :value="option"
                    ></v-radio>
                  </v-radio-group>
                </div>
                <div class="dica" v-if="formData.respostas[index].answer.tip">
                  <h4 class="text-uppercase">Dica</h4>
                  <p class="caption">
                    {{ formData.respostas[index].answer.tip }}
                  </p>
                </div>
              </div>
            </div>
            <v-btn
              x-large
              rounded
              class="se_blue_dark--text mt-6"
              color="se_green_light"
              @click="send"
              block
              :loading="loading"
              >FINALIZAR A ANÁLISE</v-btn
            >
          </v-form>
        </v-col>
      </v-row></v-container
    >
  </div>
</template>

<script>
export default {
  name: "FormularioQuestionario",
  props: {
    questions: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    score: 0,
    formData: {
      nome: null,
      respostas: [],
    },
    genericRules: [(v) => !!v || "Esse campo é obrigatório"],
    valid: false,
  }),
  created() {
    this.questions.forEach((question) => {
      this.formData.respostas.push({
        id: question.id,
        title: question.title,
        answer: "",
      });
    });
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    send() {
      if (this.formValid) {
        const payload = this.formatPayload();
        this.$emit("calcular", payload);
      }
    },
    checkConditional(question, index) {
      if (question.is_conditional) {
        const conditionalQuestion = this.questions.findIndex(
          (e) => e.id === question.question_conditional.id
        );
        const sameAnswer =
          this.formData.respostas[conditionalQuestion].answer.id ===
          question.answer_conditional.id;
        if (sameAnswer) {
          return true;
        } else {
          this.formData.respostas[index].answer = "";
          return false;
        }
      } else {
        return true;
      }
    },
    calculateSocre() {
      let total = 0;
      for (let i = 0; i < this.formData.respostas.length; i++) {
        if (this.formData.respostas[i].answer.weight) {
          total += this.formData.respostas[i].answer.weight;
        }
      }
      return total;
    },
    formatPayload() {
      const result = [];
      this.formData.respostas.forEach((resposta) => {
        if (resposta.answer) {
          result.push(`${resposta.title}: ${resposta.answer.title}`);
        }
      });
      const stringResult = result.join('; ');
      return {
        score: this.calculateSocre(),
        result: stringResult,
      };
    },
  },
  computed: {
    formValid() {
      return this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.score {
  padding: 10px 20px;
  border: 4px solid #00c693;
  margin-bottom: 10px;
}
.input-card {
  box-shadow: -15px 15px 0px 0px rgba(0, 198, 149, 1);
  position: relative;
  z-index: 1;
}
.dica {
  background: #3983fc;
  padding: 8px;
  padding-top: 32px;
  border-radius: 0px 8px 8px 0px;
  margin-right: 16px;
  box-shadow: -15px 0px 0px 0px rgba(57, 131, 252, 1);
  position: relative;
  z-index: 0;
}
@media (max-width: 600px) {
  .container {
    padding: 0px !important;
  }
}
</style>
