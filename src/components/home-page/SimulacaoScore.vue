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
                {{ impactoNoScore().toFixed(2) }}
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
            <v-subheader class="pl-0 mb-6">
              Faturamento Médio / Mês
            </v-subheader>
            <v-slider
              persistent-hint
              v-model="formData.faturamento"
              :max="1000"
              :min="0"
              step="10"
              ticks="always"
              tick-size="1"
              color="se_green_light"
              track-color="white"
              thumb-color="se_green_light"
              thumb-label="always"
            >
              <template v-slot:thumb-label>
                <v-icon dark class="caption" large>
                  {{ formData.faturamento }} k
                </v-icon>
              </template>
            </v-slider>
            <v-subheader class="pl-0 mb-6">
              Conta de Luz Média / Mês
            </v-subheader>
            <v-slider
              persistent-hint
              v-model="formData.consumo"
              :max="1000"
              :min="0"
              step="10"
              ticks="always"
              tick-size="1"
              color="se_green_light"
              track-color="white"
              thumb-color="se_green_light"
              thumb-label="always"
            >
              <template v-slot:thumb-label>
                <v-icon dark class="caption"> {{ formData.consumo }} k </v-icon>
              </template>
            </v-slider>
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
export default {
  name: "SimulacaoScore",
  data: () => ({
    valid: false,
    loading: false,
    formData: {
      tipo: {
        estabelecimento: "Bares e Restaurantes",
        media: 0.15,
        impacto: 75,
      },
      faturamento: 1000,
      consumo: 130,
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
    ],
  }),
  methods: {
    impactoNoScore() {
      if (
        this.consumoFaturamento > this.formData.tipo.media * 0.8 &&
        this.consumoFaturamento <= this.formData.tipo.media * 1
      ) {
        return 100 - [100 * (this.consumoFaturamento * 0.5)];
      } else if (
        this.consumoFaturamento > this.formData.tipo.media * 1 &&
        this.consumoFaturamento <= this.formData.tipo.media * 1.15
      ) {
        return 100 - [100 * (this.consumoFaturamento * 0.75)];
      } else if (
        this.consumoFaturamento > this.formData.tipo.media * 1.15 &&
        this.consumoFaturamento <= this.formData.tipo.media * 1.3
      ) {
        return 100 - [100 * (this.consumoFaturamento * 0.9)];
      } else if (this.consumoFaturamento > this.formData.tipo.media * 1.3) {
        return 100 - [100 * (this.consumoFaturamento * 1.1)];
      } else {
        return 100;
      }
    },
    simular() {
      this.loading = true
      this.$store.dispatch("setSimulate", {
        tipo: this.formData.tipo,
        faturamento: this.formData.faturamento,
        consumo: this.formData.consumo,
      });
      this.$router.push({ path: "/cadastro" });
    },
  },
  computed: {
    consumoFaturamento() {
      return this.formData.consumo / this.formData.faturamento;
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
