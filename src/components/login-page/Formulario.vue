<template>
  <div class="formulario">
    <v-container>
      <v-row no-gutters>
        <v-col :sm="12" :md="6" class="mx-auto">
          <div class="rounded-xl pa-6 white card">
            <h2 class="se_blue_dark--text mb-4">Entrar</h2>
            <p class="se_blue_dark--text">
              Norem ipsum dolor sit amet, consectetur adipiscing elit. Norem
              ipsum dolor sit amet, consectetur adipiscing elit. Norem ipsum
              dolor sit amet, consectetur adipiscing elit.
            </p>
            <v-form ref="form" v-model="valid" lazy-validation class="mt-6">
              <v-text-field
                v-model="formData.email"
                label="E-mail"
                required
                :rules="emailRules"
                color="se_green_light"
              ></v-text-field>
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                v-model="formData.password"
                label="Senha"
                required
                :rules="genericRules"
                color="se_green_light"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <p class="my-4">
                Esqueceu a sua senha?
                <a
                  class="text-decoration-none se_green_light--text"
                  @click="$emit('recuperar')"
                  >Recuperar senha.</a
                >
              </p>
              <p class="my-4">
                Não tem conta ainda?
                <router-link
                  class="text-decoration-none se_green_light--text"
                  to="/cadastro"
                  >Cadastrar.</router-link
                >
              </p>
              <v-btn
                x-large
                rounded
                class="enviar se_green_light--text mt-6"
                color="se_blue"
                @click="send"
                block
                :loading="loading"
                >Entrar</v-btn
              >
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "FormularioLogin",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
    showPassword: false,
    valid: false,
    emailRules: [
      (v) => !!v || "Esse campo é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "Ensira um e-mail valido",
    ],
    genericRules: [(v) => !!v || "Esse campo é obrigatório"],
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    send() {
      if (this.formValid) {
        this.$emit("login", this.formData);
      }
    },
  },
  computed: {
    formValid() {
      return this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0px 15px 0px 0px rgba(0, 198, 149, 1);
}
</style>
