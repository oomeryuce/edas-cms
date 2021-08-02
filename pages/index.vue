<template>
  <v-row>
    <v-col>
      <v-card elevation="2" class="mx-10 my-10 pa-5">
        <h2>Hoş Geldiniz!</h2>
        <p class="my-5">İşlem yapmak istediğiniz içerik türünü aşağıdan seçerek ilgili sayfaya gidebilirsiniz.</p>
        <p></p>
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.order"
            cols="12"
            md="3"
          >
            <v-item v-slot="{ active, toggle }">
              <v-card
                color="primary"
                class="d-flex flex-column align-center justify-center"
                dark
                height="200"
                :to="item.to"
              >
                <v-scroll-y-transition>
                  <v-icon x-large>{{item.icon}}</v-icon>
                </v-scroll-y-transition>
                <h2>{{item.title}}</h2>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data(){
    return{
      items: [
        {
          order: 0,
          icon: 'mdi-help',
          title: 'Sıkça Sorulan Sorular',
          to: '/sss'
        },
        {
          order: 1,
          icon: 'mdi-newspaper-variant',
          title: 'Haberler',
          to: '/haberler'
        },
        {
          order: 2,
          icon: 'mdi-flash',
          title: 'Enerjini Yönet',
          to: '/enerjini-yonet'
        },
        {
          order: 3,
          icon: 'mdi-city',
          title: 'Şehirler',
          to: '/sehirler'
        },
        {
          order: 4,
          icon: 'mdi-bell-ring',
          title: 'Bildirimler',
          to: '/bildirimler'
        }
      ],
    }
  }
}
</script>
