<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title class="font-weight-bold">{{ title }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    v-model="email"
                    :rules="rules.email"
                    prepend-icon="mdi-account"
                    name="login"
                    label="E-mail"
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="password"
                    :rules="rules.password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Şifre"
                    type="password"
                    required
                  ></v-text-field>
                </v-form>
                <v-alert
                  v-if="error"
                  border="left"
                  type="error"
                  color="red lighten-2"
                >
                  {{error}}
                </v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit" :disabled="!valid">Giriş</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      title: '',
      valid: false,
      email: null,
      password: null,
      error: null,
      rules: {
        email: [
          v => !!v || 'E-mail adresinizi giriniz!',
          v => /.+@.+/.test(v) || 'E-mail formatı yanlış.',
        ],
        password:[
          v => !!v || 'Şifrenizi giriniz!',
        ],
      }
    }
  },
  computed: {
    ...mapGetters(['whatBrand'])
  },
  beforeMount() {
    this.title = this.whatBrand + ' İçerik Yönetim Sistemi'
  },
  methods: {
    async submit() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password
          },
        })
        await this.$router.push('/')
      } catch (e) {
        if (e.response) {
          this.error = e.response.data.message
        }else {
          this.error = e
        }
      }
    }
  }
}
</script>
<style scoped>
</style>
