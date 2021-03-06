<template>
  <v-row>
    <v-col>
      <page-custom title="Yeni Haber Ekle" :create="false">{{  }}
        <v-form ref="form" v-model="valid">
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
                <small class="text--secondary">*Resim boyutu 400x100 72 dpi olmalıdır.</small>
                <small class="text--secondary">*Maksimum resim boyutu 10MB.</small>
              </v-col>
              <v-col cols="12" lg="4" md="2" sm="12">
                <v-img max-width="150" max-height="200" v-show="form.image" :src="url" contain transition="scale-transition"></v-img>
              </v-col>
            </v-col>
            <v-col cols="12" lg="3" md="4" sm="6">
              <v-switch
                v-model="form.status"
                inset
                label="Yayımlanma Durumu"
              ></v-switch>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="error" class="mx-5" to="/haberler" :loading="loading">
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
            *Resim ölçüleri 400x100(4 e 1) olmalıdır.
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
      dialog: false,
      url: null,
      image: null,
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
        link: [
          v => !!v || 'Dış Link alanını doldurunuz.',
          v => v.length >= 5 || 'Dış Link alanı en az 5 karakter olmalıdır!',
        ],
        image: [
          v => v || 'Lütfen Resim alanını doldurunuz.',
          v => !v || v.size < 10000000 || 'Resim 10MB dan büyük olamaz.',
        ],
      },
      form: {
        title: '',
        content: '',
        link: '',
        image: '',
        status: false
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
      addNews: 'addNews',
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
          if (img.width / img.height === 4) {
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
      if (!this.valid){
        this.$refs.form.validate()
        this.error = true
        this.loading = false
        return false
      }
      let payload = {
        title: this.form.title,
        contentHtml: this.form.content,
        pictureUri: this.uploadedImage,
        link: this.form.link,
        createDate: new Date().toISOString(),
        status: this.form.status
      }
      await this.addNews(payload)
      this.loading = false
      await this.$router.push("/haberler")
    }
  }
}
</script>
<style scoped>
</style>
