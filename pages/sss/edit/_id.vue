<template>
  <v-row>
    <v-col>
      <page-custom title="SSS Düzenle" :create="false">
        <v-form ref="form" v-model="valid">
          <v-row class="mx-5 d-flex flex-column">
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
        sType: null
      }
    }
  },
  computed: {
    ...mapState({
      updateData: (state) => state.updateData,
      sTypes: (state) => state.sTypes,
    }),
  },
  async beforeMount() {
    await this.getSTypes()
    await this.getSSSById(this.$route.params.id)
    console.log(this.updateData)
    this.form.question = await this.updateData.question
    this.form.answer = await this.updateData.answer
    this.form.status = await this.updateData.status
    this.form.sType = await this.updateData.sTypeId
  },
  methods: {
    ...mapActions({
      getSSSById: 'getSSSById',
      updateSSS: 'updateSSS',
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
        id: this.$route.params.id,
        question: this.form.question,
        answer: this.form.answer,
        sTypeId: this.form.sType,
        status: this.form.status,
        company: process.env.NUXT_ENV_COMPANY
      }
      await this.updateSSS(payload)
      this.loading = false
      await this.$router.push("/sss")
    }
  }
}
</script>
<style scoped>
</style>
