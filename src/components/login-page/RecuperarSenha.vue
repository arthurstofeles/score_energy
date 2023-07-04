<template>
  <v-dialog :value="dialog" width="auto" persistent>
    <v-card>
      <v-card-title class="d-flex justify-center flex-column">
        <p class="mb-2 text-center">Insira seu email para recuperar a senha</p>
        <v-col cols="12">
          <v-form ref="formModal" v-model="valid" lazy-validation>
            <v-text-field
              v-model="formData.email"
              label="E-mail"
              required
              :rules="emailRules"
              color="se_green_light"
              block
              dense
            ></v-text-field>
          </v-form>
        </v-col>
      </v-card-title>
      <v-card-actions class="d-flex justify-center">
        <v-btn rounded outlined class="px-8" color="red" @click="$emit('close')">Cancelar</v-btn>
        <v-btn
          rounded
          class="enviar se_green_light--text px-8"
          color="se_blue"
          @click="send"
          :loading="loading"
          >Recupear</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RecuperarSenha",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    formData: {
      email: "",
      redirect: window.location.protocol + "//" + window.location.host + "/nova-senha",
    },
    valid: false,
    emailRules: [
      (v) => !!v || "Esse campo é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "Ensira um e-mail valido",
    ],
  }),
  methods: {
    validate() {
      this.$refs.formModal.validate();
    },
    send() {
      if (this.formValid) {
        this.$emit("recuperar", this.formData);
      }
    },
  },
  computed: {
    formValid() {
      return this.$refs.formModal.validate();
    },
  },
};
</script>
