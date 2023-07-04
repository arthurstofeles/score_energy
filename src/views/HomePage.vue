<template>
  <div>
    <BannerHome />
    <SimulacaoScore />
  </div>
</template>

<script>
import BannerHome from "@/components/home-page/BannerHome.vue";
import SimulacaoScore from "@/components/home-page/SimulacaoScore.vue";
export default {
  name: "HomePage",
  components: { BannerHome, SimulacaoScore },
};
</script>

<style></style>
