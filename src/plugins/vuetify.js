import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        /* eslint-disable */
        se_gray: "#D9D9D9",
        se_green_light: "#00C693",
        se_green: "#00C693",
        se_blue_light: "#3983FC",
        se_blue_: "#2759AC",
        se_blue_dark: "#0D2346",
      },
    },
  },
});
