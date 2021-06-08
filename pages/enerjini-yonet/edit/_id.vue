<template>
  <v-row>
    <v-col>
      <page-custom title="Enerji Modeli Düzenle" :create="false">
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
            <v-col cols="12" lg="6" md="8" sm="12" class="d-flex px-0">
              <v-col cols="12" lg="8" md="10" sm="12">
                <v-file-input
                  v-model="form.icon"
                  :rules="rules.icon"
                  show-size
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Bir Resim Seçin"
                  prepend-icon="mdi-camera"
                  @change="createUrl"
                  label="İkon"
                ></v-file-input>
              </v-col>
              <v-col cols="12" lg="4" md="2" sm="12">
                <v-img max-width="150" v-show="form.icon" :src="url" transition="scale-transition"></v-img>
              </v-col>
            </v-col>
            <v-row class="px-3">
              <v-col cols="12" lg="2" md="3" sm="4">
                <v-text-field
                  v-model="form.consumption"
                  :rules="rules.consumption"
                  type="number"
                  min="0"
                  step=".1"
                  label="Tüketim"
                  suffix="kW/s"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="2" md="3" sm="4">
                <v-text-field
                  v-model="form.daily"
                  :rules="rules.daily"
                  type="number"
                  min="0"
                  step=".1"
                  label="Günlük Tüketim"
                  suffix="kW/s"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="2" md="3" sm="4">
                <v-text-field
                  v-model="form.qty"
                  :rules="rules.qty"
                  type="number"
                  min="0"
                  label="Cihaz Adedi"
                  suffix="Adet"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="px-3">
              <v-col cols="12" lg="2" md="3" sm="4">
                <v-text-field
                  v-model="form.work_time"
                  :rules="rules.work_time"
                  type="number"
                  min="0"
                  label="Çalışma Süresi"
                  suffix="Saat"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="2" md="3" sm="4">
                <v-text-field
                  v-model="form.weekly"
                  :rules="rules.weekly"
                  type="number"
                  min="0"
                  label="Haftalık Kullanım"
                  suffix="Gün"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="2" md="3" sm="4">
                <v-text-field
                  v-model="form.yearly"
                  :rules="rules.yearly"
                  type="number"
                  min="0"
                  label="Yılda Kaç Ay"
                  suffix="Ay"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-col cols="12" lg="3" md="4" sm="6">
              <v-switch
                v-model="form.status"
                inset
                label="Yayımlanma Durumu"
              ></v-switch>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="error" class="mx-5" to="/enerjini-yonet">
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
      url: null,
      error: false,
      rules: {
        title: [
          v => !!v || 'Başlık alanını doldurunuz.',
          v => v.length >= 5 || 'Başlık alanı en az 5 karakter olmalıdır!',
        ],
        icon: [
          v => v || 'Lütfen İkon alanını doldurunuz.',
          v => !v || v.size < 10000000 || 'İkon 10MB dan büyük olamaz.',
        ],
        consumption: [
          v => !!v || 'Tüketim alanını doldurunuz.',
          v => v > 0 || 'Tüketim 0 dan büyük olmalıdır.',
        ],
        daily: [
          v => !!v || 'Günlük Tüketim alanını doldurunuz.',
          v => v > 0 || 'Günlük tüketim 0 dan büyük olmalıdır.',
        ],
        qty: [
          v => !!v || 'Cihaz Adedi alanını doldurunuz.',
          v => v > 0 || 'Cihaz Adedi 0 dan büyük olmalıdır.',
        ],
        work_time: [
          v => !!v || 'Çalışma Süresi alanını doldurunuz.',
          v => v > 0 || 'Çalışma Süresi 0 dan büyük olmalıdır.',
        ],
        weekly: [
          v => !!v || 'Haftalık Kullanım alanını doldurunuz.',
          v => v > 0 || 'Haftalık Kullanım 0 dan büyük olmalıdır.',
        ],
        yearly: [
          v => !!v || 'Yılda Kaç Ay alanını doldurunuz.',
          v => v > 0 || 'Yılda Kaç Ay 0 dan büyük olmalıdır.',
        ],
      },
      form: {
        title: '',
        icon: null,
        consumption: null,
        daily: null,
        qty: null,
        work_time: null,
        weekly: null,
        yearly: null,
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
    await this.getEnergyById(this.$route.params.id)
    this.form.title = this.updateData.title
    this.form.icon = this.updateData.icon
    this.form.consumption = this.updateData.consumption
    this.form.daily = this.updateData.daily
    this.form.qty = this.updateData.qty
    this.form.work_time = this.updateData.work_time
    this.form.weekly = this.updateData.weekly
    this.form.yearly = this.updateData.yearly
    this.form.status = this.updateData.status
  },
  methods: {
    ...mapActions({
      getEnergyById: 'getEnergyById',
    }),
    createUrl(file){
      if (file) {
        this.url = URL.createObjectURL(file)
      }
    },
    async submit(){
      if (!this.valid){
        this.$refs.form.validate()
        this.error = true
        return false
      }
      await this.$router.push("/enerjini-yonet")
    }
  }
}
</script>
<style scoped>
</style>
