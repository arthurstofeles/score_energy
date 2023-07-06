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
              <p class="mb-0 display-1 font-weight-medium white--text">50</p>
              <p class="mb-0 caption se_green_light--text">score</p>
            </div>
          </div>
          <h2 class="white--text">
            Responda as
            <span class="se_green_light--text">perguntas abaixo</span> para
            avaliar o seu consumo de energia
          </h2>
          <v-form class="pt-8 pb-4" ref="form" v-model="valid" lazy-validation>
            <div>
              <div class="white pa-4 rounded-lg input-card">
                <h3 class="se_blue_dark--text mb-4">
                  Você tem ar-condicionado na sua empresa?
                </h3>
                <v-select
                  v-model="formData.resposta"
                  :items="listaTipos"
                  :rules="[(v) => !!v || 'Este campo é obrigatório']"
                  label="Resposta"
                  placeholder="Resposta"
                  required
                  color="se_green_light"
                  item-color="se_green_light"
                ></v-select>
              </div>
              <div class="dica">
                <h4 class="text-uppercase">Dica</h4>
                <p class="caption">
                  DICA Norem ipsum dolor sit amet, consectetur adipiscing elit.
                  Norem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
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
  data: () => ({
    formData: {
      nome: null,
      resposta: null,
    },
    listaTipos: ["Padaria", "Mercado", "Farmacia"],
    genericRules: [(v) => !!v || "Esse campo é obrigatório"],
  }),
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
  z-index: 9;
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
