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
            <v-col cols="12" lg="3" md="4" sm="6">
              <v-switch
                v-model="form.status"
                inset
                label="Yayımlanma Durumu"
              ></v-switch>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="error" class="mx-5" to="/sss">
                İptal
              </v-btn>
              <v-btn color="primary" @click="submit">
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
      },
      form: {
        question: '',
        answer: '',
        status: false
      }
    }
  },
  computed: {
    ...mapState({
      updateData: (state) => state.updateData,
    }),
  },
  async beforeMount() {
    await this.getSSSById(this.$route.params.id)
    this.form.question = this.updateData.question
    this.form.answer = this.updateData.answer
    this.form.status = this.updateData.status
  },
  methods: {
    ...mapActions({
      getSSSById: 'getSSSById',
    }),
    async submit(){
      if (!this.valid){
        this.$refs.form.validate()
        this.error = true
        return false
      }
      // await this.addSSS(this.form)
      await this.$router.push("/sss")
    }
  }
}
</script>
<style scoped>
</style>
