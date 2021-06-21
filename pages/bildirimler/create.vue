<template>
  <v-row>
    <v-col>
      <page-custom title="Yeni Bildirim Ekle" :create="false">
        <v-form ref="form" v-model="valid">
          <v-row class="d-flex flex-column mx-5">
            <v-col cols="12" lg="6" md="8" sm="12">
              <v-text-field
                v-model="form.title"
                :rules="rules.title"
                label="Başlık"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="8" md="10" sm="12">
              <v-textarea
                v-model="form.content"
                :rules="rules.content"
                outlined
                label="İçerik"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="error" class="mx-5" to="/bildirimler" :loading="loading">
                İptal
              </v-btn>
              <v-btn color="primary" @click="submit" :loading="loading">
                Kaydet
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </page-custom>
      <v-snackbar
        v-model="error"
        timeout="5000"
        color="red lighten-2"
        elevation="24"
      >
        <span class="font-weight-bold">Lütfen zorunlu alanları doldurunuz.</span>
      </v-snackbar>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data () {
    return {
      loading: false,
      valid: false,
      error: false,
      rules: {
        title: [
          v => !!v || 'Başlık alanını doldurunuz.',
          v => v.length >= 5 || 'Başlık alanı en az 5 karakter olmalıdır!',
        ],
        content: [
          v => !!v || 'İçerik alanını doldurunuz.',
          v => v.length >= 5 || 'İçerik alanı en az 5 karakter olmalıdır!',
        ],
      },
      form: {
        title: '',
        content: '',
      }
    }
  },
  async mounted() {
    if (Object.keys(this.$route.query).length > 0 && this.$route.query.title && this.$route.query.content){
      this.form.title = this.$route.query.title
      this.form.content = this.$route.query.content
    }
  },
  methods: {
    ...mapActions({
      addNotf: 'addNotf',
    }),
    async submit(){
      this.loading = true
      if (!this.valid){
        this.$refs.form.validate()
        this.error = true
        this.loading = false
        return false
      }
      await this.addNotf(this.form)
      this.loading = false
      await this.$router.push("/bildirimler")
    }
  }
}
</script>
<style scoped>
</style>
