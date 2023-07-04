<template>
  <div>
    <BannerHome />
    <SimulacaoScore />
    <QuemSomos />
    <FooterHome />
  </div>
</template>

<script>
import BannerHome from "@/components/home-page/BannerHome.vue";
import SimulacaoScore from "@/components/home-page/SimulacaoScore.vue";
import QuemSomos from "@/components/home-page/QuemSomos.vue";
import FooterHome from "@/components/home-page/FooterHome.vue";
export default {
  name: "HomePage",
  components: { BannerHome, SimulacaoScore, QuemSomos, FooterHome },
};
</script>

<style></style>
