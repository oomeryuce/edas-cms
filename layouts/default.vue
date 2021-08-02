<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list class="fill-height">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-tooltip
            v-if="miniVariant"
            color="primary"
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-action>
                  <v-icon v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>
              </v-list-item-action>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
          <v-list-item-action v-else>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2 py-5">
          <v-btn block color="error" to="/login">
            <v-tooltip
              v-if="miniVariant"
              color="error"
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-logout</v-icon>
              </template>
              <span>Çıkış Yap</span>
            </v-tooltip>
            <v-icon v-else>mdi-logout</v-icon>
            <span v-show="!miniVariant" @click="logout">Çıkış Yap</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      class="blue darken-3 text"
      fixed
      app
    >
      <v-btn icon @click="drawer = !drawer">
        <v-icon color="white">mdi-menu</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon color="white">mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" class="white--text font-weight-bold" />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}<a href="https://www.pikselmutfak.com" target="_blank" class="ml-2">Piksel Mutfak</a></span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-help',
          title: 'Sıkça Sorulan Sorular',
          to: '/sss'
        },
        {
          icon: 'mdi-newspaper-variant',
          title: 'Haberler',
          to: '/haberler'
        },
        {
          icon: 'mdi-flash',
          title: 'Enerjini Yönet',
          to: '/enerjini-yonet'
        },
        {
          icon: 'mdi-city',
          title: 'Şehirler',
          to: '/sehirler'
        },
        {
          icon: 'mdi-bell-ring',
          title: 'Bildirimler',
          to: '/bildirimler'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: null
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'whatBrand'])
  },
  beforeMount() {
    this.title = this.whatBrand + ' İçerik Yönetim Sistemi'
    if (this.whatBrand === 'Çoruh Edaş'){
      this.getBrand('coruh')
    } else {
      this.getBrand('firat')
    }
  },
  methods: {
    ...mapActions({
      getBrand: 'getBrand',
    }),
    async logout() {
      await this.$auth.logout();
    },
  }
}
</script>
