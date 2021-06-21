<template>
  <v-row>
    <v-col>
      <page-custom title="Yeni SSS Ekle" :create="false">
        <v-form ref="form" v-model="valid">
          <v-row class="d-flex flex-column mx-5">
            <v-col cols="12" lg="6" md="8" sm="12">
              <v-text-field
                v-model="form.question"
                :rules="rules.question"
                label="Soru"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="8" md="10" sm="12">
              <v-textarea
                v-model="form.answer"
                :rules="rules.answer"
                outlined
                label="Cevap"
              ></v-textarea>
            </v-col>
            <v-col cols="12" lg="6" md="8" sm="12">
              <v-select
                v-model="form.sType"
                :items="sTypes"
                :rules="rules.sType"
                no-data-text="Data bulunamadı"
                item-value="id"
                item-text="sTypeName"
                label="Soru Kategorisi"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="3" md="4" sm="6">
              <v-switch
                v-model="form.status"
                inset
                label="Yayımlanma Durumu"
              ></v-switch>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="error" class="mx-5" to="/sss" :loading="loading">
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
        question: [
          v => !!v || 'Soru alanını doldurunuz.',
          v => v.length >= 5 || 'Soru alanı en az 5 karakter olmalıdır!',
        ],
        answer: [
          v => !!v || 'Cevap alanını doldurunuz.',
          v => v.length >= 5 || 'Cevap alanı en az 5 karakter olmalıdır!',
        ],
        sType: [
          v => !!v || 'Bir kategori seçiniz.',
        ],
      },
      form: {
        question: '',
        answer: '',
        status: false,
        sType: null,
      }
    }
  },
  async beforeMount() {
    await this.getSTypes()
  },
  computed: {
    ...mapState({
      sTypes: (state) => state.sTypes,
    }),
  },
  methods: {
    ...mapActions({
      addSSS: 'addSSS',
      getSTypes: 'getSTypes',
    }),
    async submit(){
      this.loading = true
      if (!this.valid){
        this.$refs.form.validate()
        this.error = true
        this.loading = false
        return false
      }
      let payload= {
        question: this.form.question,
        answer: this.form.answer,
        sTypeId: this.form.sType,
        company: process.env.NUXT_ENV_COMPANY
      }
      await this.addSSS(payload)
      this.loading = false
      await this.$router.push("/sss")
    },
  }
}
</script>
<style scoped>
</style>
