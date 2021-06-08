<template>
  <v-row>
    <v-col>
      <page-custom title="Haber Düzenle" :create="false">
        <v-form v-model="valid">
          <v-row class="mx-5 d-flex flex-column">
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
            <v-col cols="12" lg="6" md="8" sm="12">
              <v-text-field
                v-model="form.link"
                :rules="rules.link"
                label="Dış Link"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="8" sm="12">
              <v-file-input
                v-model="form.image"
                :rules="rules.image"
                show-size
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Bir Resim Seçin"
                prepend-icon="mdi-camera"
                label="Resim"
              ></v-file-input>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="error" class="mx-5" to="/Haberler">
                İptal
              </v-btn>
              <v-btn color="primary" :disabled="!valid">
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
        link: [
          v => !!v || 'Dış Link alanını doldurunuz.',
          v => v.length >= 5 || 'Dış Link alanı en az 5 karakter olmalıdır!',
        ],
        image: [
          value => !value || value.size < 10000000 || 'Resim 10MB dan büyük olamaz!',
        ],
      },
      form: {
        title: '',
        content: '',
        link: '',
        image: null
      }
    }
  },
  methods: {
    ...mapActions({
      addSSS: 'addSSS',
    }),
    async submit(){
      if (this.valid){
        // await this.addSSS(this.form)
        await this.$router.push("/Haberler")
      }
    }
  }
}
</script>
<style scoped>
</style>
