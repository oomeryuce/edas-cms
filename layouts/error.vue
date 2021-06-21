<template>
  <v-app dark>
    <v-row class="d-flex flex-column text-center align-center justify-center" style="background-color: #1665c0">
      <h1 class="display-1 white--text" v-if="error.statusCode === 404">
        <strong>{{ pageNotFound }}</strong>
      </h1>
      <h1 v-else class="display-1 white--text">
        <strong>{{ otherError }}</strong>
      </h1>
      <v-btn x-large to="/" color="white" class="mt-3" style="width: 20%">
        Anasayfa'ya Dön
      </v-btn>
    </v-row>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Sayfa Bulunamadı!',
      otherError: 'Bir hata oluştu.'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
