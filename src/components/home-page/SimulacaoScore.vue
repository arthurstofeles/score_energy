<template>
  <div class="simulacao-score">
    <v-container class="py-8">
      <v-row class="justify-center">
        <v-col cols="12" sm="8" md="8">
          <div class="d-flex justify-space-between">
            <h2>Simule o seu Score</h2>
            <div
              class="text-center rounded-circle se_green_light px-6 py-4 score"
              elevation="2"
            >
              <p class="mb-0 display-2 font-weight-medium se_blue_dark--text">
                50
              </p>
              <p class="mb-0 caption">score</p>
            </div>
          </div>
          <v-form class="pt-8 pb-4" ref="form" v-model="valid" lazy-validation>
            <v-select
              v-model="formData.tipo"
              :items="listaTipos"
              :rules="[(v) => !!v || 'Este campo é obrigatório']"
              label="Categoria"
              placeholder="Selecione o tipo de comércio"
              required
              color="se_green_light"
              item-color="se_green_light"
            ></v-select>
            <v-subheader class="pl-0 mb-6">
              Faturamento Médio / Mês
            </v-subheader>
            <v-slider
              persistent-hint
              v-model="formData.faturamento"
              :max="20"
              :min="0"
              step="0.5"
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
              :max="20"
              :min="0"
              step="0.5"
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
    formData: {
      tipo: null,
      faturamento: null,
      consumo: null,
    },
    listaTipos: ["Padaria", "Mercado", "Farmacia"],
  }),
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
  top: -40px;
  right: 12px;
  box-shadow: 0px 11px 10px -3px rgba(0, 0, 0, 0.25);
}
</style>
