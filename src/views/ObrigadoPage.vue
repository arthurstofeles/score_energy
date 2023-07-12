<template>
  <div class="obrigado se_blue_dark">
    <v-container>
      <router-link to="/">
        <img
          class="mb-4"
          src="@/assets/logo-score-energy.svg"
          alt="Logo ScoreEnergy"
      /></router-link>
      <v-container>
        <v-row no-gutters>
          <v-col :sm="12" :md="6" class="mx-auto">
            <div class="rounded-xl pa-6 white card">
              <h2 class="se_blue_dark--text mb-4">
                Obrigado, entraremos em contato com mais informações, ok?
              </h2>
              <p class="se_blue_dark--text">
                Norem ipsum dolor sit amet, consectetur adipiscing elit. Norem
                ipsum dolor sit amet, consectetur adipiscing elit. Norem ipsum
                dolor sit amet, consectetur adipiscing elit.
              </p>
              <v-btn
                x-large
                rounded
                class="enviar se_green_light--text mt-6"
                color="se_blue_dark"
                block
                >Ok</v-btn
              >
            </div>
          </v-col></v-row
        ></v-container
      >
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ObrigadoPage",
    beforeCreate() {
    if (this.$store.state.loggedIn === "deslogado" || !this.$store.state.thanks) {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style scoped>
.obrigado {
  height: 100%;
}
.card {
  box-shadow: 0px 15px 0px 0px rgba(0, 198, 149, 1);
}
</style>
