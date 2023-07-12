<template>
  <div class="banner-home">
    <v-container class="pb-16">
      <v-row>
        <v-col cols="6">
          <img
            class="mb-4"
            src="@/assets/logo-score-energy.svg"
            alt="logo-score-energy"
          />
          <h1 class="se_blue--text mb-8">
            Saiba se você está gastando
            <span class="se_green_light--text">mais do que deveria</span> com
            eletricidade
          </h1>
          <h2 class="white--text caption mb-4">
            Nosso algoritmo exclusivo utiliza um sistema de pontuação para você
            saber na hora se o seu custo com energia está adequado e se dá para
            melhorar.
          </h2>
        </v-col>
      </v-row>
      <v-btn
        class="se_blue_dark--text"
        rounded
        color="se_green_light"
        elevation="2"
        large
        to="/cadastro"
        >Avalie seu consumo</v-btn
      >
    </v-container>
  </div>
</template>

<script>
export default {
  name: "BannerHome",
};
</script>

<style scoped>
.banner-home {
  background: linear-gradient(
      314deg,
      rgba(0, 198, 147, 0.5) 0%,
      rgba(39, 89, 172, 0.5) 100%
    ),
    #0d2346;
  position: relative;
  z-index: 0;
  min-height: 400px;
}
.banner-home::before {
  content: "";
  height: 386px;
  width: 164px;
  background-image: url("../../assets/banner-image.png");
  background-size: auto;
  background-repeat: no-repeat;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
}
@media (max-width: 600px) {
  h1 {
    font-size: 1.6rem;
    line-height: 1.2;
  }
}
</style>
