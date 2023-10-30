<template>
  <div class="simulacao-score">
    <v-container class="py-8">
      <v-row class="justify-center">
        <v-col cols="12" sm="8" md="8">
          <div class="d-flex justify-space-between">
            <h2>Simule o seu Score</h2>
            <div
              class="text-center rounded-circle se_green_light score"
              elevation="2"
            >
              <p class="mb-0 font-weight-medium se_blue_dark--text">
                {{ impactoNoScore().toFixed(0) }}
              </p>
              <p class="mb-0 caption">score</p>
            </div>
          </div>
          <v-form class="pt-8 pb-4" ref="form" v-model="valid" lazy-validation>
            <v-select
              v-model="formData.tipo"
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
              v-model.lazy="formData.faturamento"
              v-money="money"
            ></v-text-field>
            <v-text-field
              ref="inputRef"
              color="se_green_light"
              required
              :rules="[(v) => !!v || 'Este campo é obrigatório']"
              label="Conta de Luz Média / Mês"
              v-model.lazy="formData.consumo"
              v-money="money"
            ></v-text-field>
            <v-btn
              class="se_green_light--text d-flex mx-auto"
              rounded
              color="se_blue"
              elevation="2"
              large
              :loading="loading"
              @click="simular"
              >Avalie seu consumo</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { VMoney } from "v-money";
export default {
  name: "SimulacaoScore",
  directives: { money: VMoney },
  data: () => ({
    valid: false,
    loading: false,
    formData: {
      tipo: {
        estabelecimento: "Bares e Restaurantes",
        media: 0.15,
        impacto: 75,
      },
      faturamento: "",
      consumo: "",
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
      }
    ],
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      suffix: "",
      precision: 2,
    },
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    impactoNoScore() {
      // if (
      //   this.consumoFaturamento > this.formData.tipo.media * 0.8 &&
      //   this.consumoFaturamento <= this.formData.tipo.media * 1
      // ) {
      //   return 100 - [100 * (this.consumoFaturamento * 0.5)];
      // } else if (
      //   this.consumoFaturamento > this.formData.tipo.media * 1 &&
      //   this.consumoFaturamento <= this.formData.tipo.media * 1.15
      // ) {
      //   return 100 - [100 * (this.consumoFaturamento * 0.75)];
      // } else if (
      //   this.consumoFaturamento > this.formData.tipo.media * 1.15 &&
      //   this.consumoFaturamento <= this.formData.tipo.media * 1.3
      // ) {
      //   return 100 - [100 * (this.consumoFaturamento * 0.9)];
      // } else if (
      //   this.consumoFaturamento > this.formData.tipo.media * 1.3 &&
      //   this.consumoFaturamento <= this.formData.tipo.media * 1.45
      // ) {
      //   return 100 - [100 * (this.consumoFaturamento * 1.1)];
      // } else if (
      //   this.consumoFaturamento > this.formData.tipo.media * 1.45 &&
      //   this.consumoFaturamento <= this.formData.tipo.media * 1.6
      // ) {
      //   return 100 - [100 * (this.consumoFaturamento * 1.3)];
      // } else if (
      //   this.consumoFaturamento > this.formData.tipo.media * 1.6 &&
      //   this.consumoFaturamento <= this.formData.tipo.media * 1.8
      // ) {
      //   return 100 - [100 * (this.consumoFaturamento * 1.45)];
      // } else if (
      //   this.consumoFaturamento > this.formData.tipo.media * 1.8 &&
      //   this.consumoFaturamento <= this.formData.tipo.media * 1.95
      // ) {
      //   return 100 - [100 * (this.consumoFaturamento * 1.6)];
      // } else if (this.consumoFaturamento > this.formData.tipo.media * 1.95) {
      //   return 100 - [100 * (this.consumoFaturamento * 1.8)];
      // } else {
      //   return 100;
      // }

      const E2 = this.formData.tipo.media;
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
    simular() {
      if (this.formValid) {
        this.loading = true;
        this.$store.dispatch("setSimulate", {
          tipo: this.formData.tipo,
          faturamento: this.formData.faturamento,
          consumo: this.formData.consumo,
        });
        this.$router.push({ path: "/cadastro" });
      }
    },
  },
  computed: {
    consumoFaturamento() {
      const consumo = parseFloat(
        this.formData.consumo.replace(/[^0-9,-]/g, "").replace(",", ".")
      );
      const faturamento = parseFloat(
        this.formData.faturamento.replace(/[^0-9,-]/g, "").replace(",", ".")
      );
      return consumo / faturamento;
    },
    formValid() {
      return this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.simulacao-score {
  background-color: #d9d9d9;
  border-top: 8px solid #00c693;
  border-bottom: 8px solid #00c693;
}
.simulacao-score .col-12 {
  position: relative;
}
.score {
  position: absolute;
  top: -60px;
  right: 12px;
  box-shadow: 0px 11px 10px -3px rgba(0, 0, 0, 0.25);
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
</style>
