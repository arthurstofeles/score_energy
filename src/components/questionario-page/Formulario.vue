<template>
  <div>
    <div v-if="scoreBar" class="pa-4 se_blue_dark score-bar">
      <p class="mb-0 se_green_light--text">Score:</p>
      <h6 class="mb-0 display-1 font-weight-medium white--text">
        {{
          calculateSocre().toFixed(0) === "NaN"
            ? 0
            : calculateSocre().toFixed(0)
        }}
      </h6>
    </div>
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
              <p class="mb-0 font-weight-medium white--text">
                {{
                  calculateSocre().toFixed(0) === "NaN"
                    ? 0
                    : calculateSocre().toFixed(0)
                }}
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
            <div class="mb-8 white pa-4 rounded-lg input-card">
              <div class="mb-4">
                <v-select
                  v-model="simuladoData.tipo"
                  :items="listaTipos"
                  :rules="[(v) => !!v || 'Este campo é obrigatório']"
                  item-text="estabelecimento"
                  item-value="media"
                  label="Categoria"
                  placeholder="Selecione o tipo de comércio"
                  required
                  color="se_green_light"
                  item-color="se_green_light"
                  @click="impactoNoScore()"
                  return-object
                ></v-select>
                <v-text-field
                  ref="inputRef"
                  color="se_green_light"
                  required
                  :rules="[(v) => !!v || 'Este campo é obrigatório']"
                  label="Faturamento Médio / Mês"
                  v-model.lazy="simuladoData.faturamento"
                  v-money="money"
                ></v-text-field>
                <v-text-field
                  ref="inputRef"
                  color="se_green_light"
                  required
                  :rules="[(v) => !!v || 'Este campo é obrigatório']"
                  label="Conta de Luz Média / Mês"
                  v-model.lazy="simuladoData.consumo"
                  v-money="money"
                ></v-text-field>
              </div>
            </div>
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
import { VMoney } from "v-money";
export default {
  name: "FormularioQuestionario",
  directives: { money: VMoney },
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
    simuladoData: {
      tipo: {},
      faturamento: "0",
      consumo: "0",
    },
    listaTipos: [
      {
        estabelecimento: "Bares e Restaurantes",
        media: 0.15,
        impacto: 75,
      },
      {
        estabelecimento: "Mercados",
        media: 0.1,
        impacto: 53,
      },
      {
        estabelecimento: "Lojas e Comércio Varejista",
        media: 0.08,
        impacto: 32,
      },
      {
        estabelecimento: "Escritório",
        media: 0.03,
        impacto: 10,
      },
      {
        estabelecimento: "Outros",
        media: 0.09,
        impacto: 32,
      },
    ],
    scoreBar: false,
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      suffix: "",
      precision: 2,
    },
  }),
  created() {
    this.questions.forEach((question) => {
      this.formData.respostas.push({
        id: question.id,
        title: question.title,
        answer: "",
        maxScore: question.max_score,
      });
    });
    if (this.$store.state.simulate) {
      this.simuladoData.tipo = this.$store.state.simulate.tipo;
      this.simuladoData.faturamento = this.$store.state.simulate.faturamento;
      this.simuladoData.consumo = this.$store.state.simulate.consumo;
    }
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
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
      if (question.is_conditional && question.question_conditional) {
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
      let max = this.simuladoData.tipo.impacto
        ? this.simuladoData.tipo.impacto
        : 0;
      let respondido = this.consumoFaturamento
        ? (this.simuladoData.tipo.impacto * this.impactoNoScore()) / 100
        : 0;
      for (let i = 0; i < this.formData.respostas.length; i++) {
        if (this.formData.respostas[i].answer.weight !== undefined) {
          respondido += this.formData.respostas[i].answer.weight;
          max += this.formData.respostas[i].maxScore;
        }
      }
      return (respondido / max) * 100;
    },
    formatPayload() {
      const result = [
        `Categoria: ${this.simuladoData.tipo.estabelecimento}`,
        `Faturamento Médio / Mês: ${this.simuladoData.faturamento}`,
        `Conta de Luz Média / Mês: ${this.simuladoData.consumo}`,
      ];
      this.formData.respostas.forEach((resposta) => {
        if (resposta.answer && resposta.answer.tip) {
          result.push(
            `${resposta.title}: ${resposta.answer.title} - Dica: ${resposta.answer.tip}`
          );
        } else if (resposta.answer) {
          result.push(`${resposta.title}: ${resposta.answer.title}`);
        }
      });
      const stringResult = result.join("; ");
      return {
        score: this.calculateSocre().toFixed(2),
        result: stringResult,
        company: this.formData.nome,
      };
    },
    impactoNoScore() {
      // if (
      //   this.consumoFaturamento > this.simuladoData.tipo.media * 0.8 &&
      //   this.consumoFaturamento <= this.simuladoData.tipo.media * 1
      // ) {
      //   return 100 - [100 * (this.consumoFaturamento * 0.5)];
      // } else if (
      //   this.consumoFaturamento > this.simuladoData.tipo.media * 1 &&
      //   this.consumoFaturamento <= this.simuladoData.tipo.media * 1.15
      // ) {
      //   return 100 - [100 * (this.consumoFaturamento * 0.75)];
      // } else if (
      //   this.consumoFaturamento > this.simuladoData.tipo.media * 1.15 &&
      //   this.consumoFaturamento <= this.simuladoData.tipo.media * 1.3
      // ) {
      //   return 100 - [100 * (this.consumoFaturamento * 0.9)];
      // } else if (this.consumoFaturamento > this.simuladoData.tipo.media * 1.3) {
      //   return 100 - [100 * (this.consumoFaturamento * 1.1)];
      // } else {
      //   return 100;
      // }

      const E2 = this.simuladoData.tipo.media;
      const D5 = this.consumoFaturamento;

      let resultado = 100;

      if (D5 <= E2 * 0.8) {
        resultado = 100;
      } else if (D5 <= E2) {
        resultado = 100 - 100 * D5 * 0.9;
      } else if (D5 > E2 && D5 < E2 * 1.15) {
        resultado = 100 - 100 * D5 * 1.15;
      } else if (D5 >= E2 * 1.15 && D5 < E2 * 1.4) {
        resultado = 100 - 100 * (D5 * 1.15);
      } else if (D5 >= E2 * 1.4 && D5 < E2 * 1.65) {
        resultado = 100 - 100 * (D5 * 1.4);
      } else if (D5 >= E2 * 1.65 && D5 < E2 * 1.9) {
        resultado = 100 - 100 * (D5 * 1.65);
      } else if (D5 >= E2 * 1.9 && D5 < E2 * 2.15) {
        resultado = 100 - 100 * (D5 * 1.9);
      } else if (D5 >= E2 * 2.15 && D5 < E2 * 2.4) {
        resultado = 100 - 100 * (D5 * 2.15);
      } else if (D5 >= E2 * 2.4 && D5 < E2 * 2.65) {
        resultado = 100 - 100 * (D5 * 2.4);
      } else if (D5 >= E2 * 2.65 && D5 < E2 * 2.9) {
        resultado = 100 - 100 * (D5 * 2.65);
      } else if (D5 >= E2 * 2.9 && D5 < E2 * 3.15) {
        resultado = 100 - 100 * (D5 * 2.9);
      } else if (D5 >= E2 * 3.15 && D5 < E2 * 3.4) {
        resultado = 100 - 100 * (D5 * 3.15);
      } else if (D5 >= E2 * 3.4 && D5 < E2 * 3.65) {
        resultado = 100 - 100 * (D5 * 3.4);
      } else if (D5 >= E2 * 3.65 && D5 < E2 * 3.9) {
        resultado = 100 - 100 * (D5 * 3.65);
      } else if (D5 >= E2 * 3.9) {
        resultado = 100 - 100 * (D5 * 3.9);
      }
      return resultado;
    },
    onScroll() {
      if (window.top.scrollY > 350) {
        this.scoreBar = true;
      } else {
        this.scoreBar = false;
      }
    },
  },
  computed: {
    formValid() {
      return this.$refs.form.validate();
    },
    consumoFaturamento() {
      const consumo = parseFloat(
        this.simuladoData.consumo.replace(/[^0-9,-]/g, "").replace(",", ".")
      );
      const faturamento = parseFloat(
        this.simuladoData.faturamento.replace(/[^0-9,-]/g, "").replace(",", ".")
      );
      return consumo / faturamento;
    },
  },
};
</script>

<style scoped>
.score {
  border: 4px solid #00c693;
  margin-bottom: 10px;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0px;
}
.score > p {
  font-size: 30px;
  line-height: 1;
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
.score-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.score-bar > h6 {
  font-size: 30px;
  line-height: 1;
}
</style>
