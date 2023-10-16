<template>
  <div class="footer se_blue_dark pt-8 pb-4">
    <v-container>
      <div>
        <h2 class="se_green_light--text mb-4">Fale com a gente</h2>
        <p class="se_green_light--text mb-1">(15) 99118-6998</p>
        <a
          href="mailto:contato@energyc.com.br"
          class="se_green_light--text mb-1"
          >contato@energyc.com.br</a
        >
      </div>
      <div class="logo">
        <p>
          Uma startup da
        </p>
        <img src="@/assets/eletrobras.png" />
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "FooterHome",
};
</script>

<style scoped>
.footer .container {
  border-top: 2px solid #00c693;
  background-color: #0d2346;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: flex-end;
  gap: 16px;
}
.logo p {
  margin-bottom: 0px;
  font-style: italic;
  color: #fff;
}
.logo img {
  max-width: 150px;
}
@media only screen and (max-width: 768px) {
  .footer .container {
    flex-direction: column;
    text-align: center;
  }
  .logo {
    margin-top: 32px;
  }
}
</style>
