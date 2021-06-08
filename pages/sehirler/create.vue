<template>
  <v-row>
    <v-col>
      <page-custom title="Yeni SSS Ekle" :create="false">
        <v-form v-model="valid">
          <v-row class="mx-5">
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
              <v-btn color="error" class="mx-5" to="/sss">
                İptal
              </v-btn>
              <v-btn color="primary" @click="submit" :disabled="!valid">
                Kaydet
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </page-custom>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data () {
    return {
      valid: false,
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
        content: ''
      }
    }
  },
  methods: {
    ...mapActions({
      addSSS: 'addSSS',
    }),
    async submit(){
      if (!this.valid) return false
      // await this.addSSS(this.form)
      await this.$router.push("/sss")
    }
  }
}
</script>
<style scoped>
</style>
