<template>
  <v-row>
    <v-col>
      <page-custom title="Yeni Şehir Ekle" :create="false">
        <v-form ref="form" v-model="valid">
          <v-row class="mx-5 d-flex flex-column">
            <v-col cols="12" lg="6" md="8" sm="12">
              <v-text-field
                v-model="form.title"
                :rules="rules.title"
                label="Şehir Adı"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="8" sm="12" class="row">
              <v-col cols="12" lg="8" md="10" sm="12" class="d-flex flex-column">
                <v-file-input
                  v-model="form.image"
                  :rules="rules.image"
                  show-size
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Bir Resim Seçin"
                  prepend-icon="mdi-camera"
                  @change="createUrl"
                  label="Resim"
                ></v-file-input>
                <small class="text--secondary">*Resim boyutu 70x70 72 dpi olmalıdır.</small>
                <small class="text--secondary">*Maksimum resim boyutu 10MB.</small>
              </v-col>
              <v-col cols="12" lg="4" md="2" sm="12">
                <v-img max-width="150" max-height="200" v-show="form.image" id="image" :src="url" contain transition="scale-transition"></v-img>
              </v-col>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="error" class="mx-5" to="/sehirler" :loading="loading">
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
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          Resim Ölçü Uyarısı
        </v-card-title>

        <v-card-text>
          Bu resmin ölçüleri standartların dışındadır, devam etmek istediğinize emin misiniz? <br>
          Standart ölçüler: <br>
          *Resim ölçüleri 70x70(kare) 72 dpi olmalıdır.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click.stop="cancelImage()"
          >
            İptal
          </v-btn>

          <v-btn
            color="primary"
            text
            @click.stop="uploadFile(image)"
          >
            Devam Et
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data () {
    return {
      loading: false,
      valid: false,
      dialog: false,
      url: null,
      image: null,
      error: false,
      rules: {
        title: [
          v => !!v || 'Başlık alanını doldurunuz.',
          v => v.length >= 5 || 'Başlık alanı en az 5 karakter olmalıdır.',
        ],
        image: [
          v => v || 'Lütfen Resim alanını doldurunuz.',
          v => !v || v.size < 10000000 || 'Resim 10MB dan büyük olamaz.',
        ],
      },
      form: {
        title: '',
        image: null,
      }
    }
  },
  computed: {
    ...mapState({
      uploadedImage: (state) => state.uploadedImage,
    }),
  },
  methods: {
    ...mapActions({
      addCity: 'addCity',
      uploadImage: 'uploadImage',
    }),
    cancelImage(){
      this.dialog = false
      this.url = null
      this.file = null
      this.form.image = null
    },
    async uploadFile(file){
      this.url = URL.createObjectURL(file)
      let data = new FormData();
      data.append('uploadType', "2");
      data.append('file', file);
      await this.uploadImage(data)
      this.dialog = false
    },
    createUrl(file){
      if (file) {
        let img = new Image()
        img.src = URL.createObjectURL(file)
        img.onload = () => {
          if (img.width / img.height === 1) {
            this.url = URL.createObjectURL(file)
            this.uploadFile(file)
            return true;
          }else {
            this.image = file
            this.dialog = true
          }
          return true;
        }
      }
    },
    async submit(){
      this.loading = true
      this.$refs.form.validate()
      if (!this.valid){
        this.error = true
        this.loading = false
        return false
      }
      let payload = {
        cityName: this.form.title,
        picture: this.uploadedImage
      }
      await this.addCity(payload)
      this.loading = false
      await this.$router.push("/sehirler")
    },
  }
}
</script>
<style scoped>
</style>
