<template>
  <div>
    <header class="header">
      <img
        src="@/assets/logo-score-energy.svg"
        alt="Logo"
        @click="goToRoute('HomePage')"
      />
      <v-icon @click.stop="drawer = !drawer" color="white">mdi-menu</v-icon>
    </header>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      right
      temporary
      class="pa-2 se_green_light"
    >
      <nav class="nav">
        <ul>
          <li v-for="(link, index) in links" :key="index">
            <v-list-group
              v-if="link.children.length"
              :value="true"
              color="se_blue_dark"
            >
              <template v-slot:activator>
                <v-list-item-title>{{ link.title }}</v-list-item-title>
              </template>
              <v-list-item
                v-for="(child, index) in link.children"
                :key="index"
                link
                class="pl-6"
                :disabled="child.route === routeName"
              >
                <v-list-item-title
                  class="se_blue_dark--text"
                  @click="goToRoute(child.route)"
                  >{{ child.title }}</v-list-item-title
                >
              </v-list-item>
            </v-list-group>
            <v-list-item
              class="se_blue_dark--text"
              v-else
              @click="goToRoute(link.route)"
              >{{ link.title }}</v-list-item
            >
          </li>
        </ul>
      </nav>
      <v-btn
        class="ma-2"
        color="se_blue_dark"
        outlined
        solo
        width="220px"
        @click="logout"
      >
        SIGN OUT
      </v-btn>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "HeaderMobile",
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    goToRoute(route) {
      this.$router.push({ name: route });
    },
    logout() {
      this.$emit("logout");
    },
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  padding: 16px;
}
.nav {
  ul {
    list-style: none;
    padding: 0;
  }
}
</style>
