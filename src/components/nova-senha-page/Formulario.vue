<template>
  <div class="formulario">
    <v-container>
      <v-row no-gutters>
        <v-col :sm="12" :md="6" class="mx-auto">
          <div class="rounded-xl pa-6 white card">
            <h2 class="se_blue_dark--text mb-4">Nova Senha</h2>
            <p class="se_blue_dark--text">Você solicitou troca de senha para acessar o SEDig. Cadastre a nova senha abaixo.</p>
            <v-form ref="form" v-model="valid" lazy-validation class="mt-6">
              <v-text-field
                v-model="formData.email"
                label="E-mail"
                required
                :rules="emailRules"
                color="#370ea3"
              ></v-text-field>
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                v-model="formData.password"
                label="Nova Senha"
                required
                :rules="genericRules"
                color="#370ea3"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-btn
                x-large
                rounded
                class="enviar se_green_light--text mt-6"
                color="#370EA3"
                @click="send"
                block
                :loading="loading"
                >Cadastrar nova senha</v-btn
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
  name: "FormularioNovaSenha",
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
      token: "",
    },
    showPassword: false,
    valid: false,
    emailRules: [
      (v) => !!v || "Esse campo é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "Ensira um e-mail valido",
    ],
    genericRules: [(v) => !!v || "Esse campo é obrigatório"],
  }),
  created() {
    this.formData.token = this.$route.query.token;
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    send() {
      if (this.formValid) {
        this.$emit("criar", this.formData);
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
