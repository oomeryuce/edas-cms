<template>
  <main>
    <v-row>
      <v-col cols="12" :lg="full ? 12 : 10" :md="full ? 12 : 10" sm="12">
        <v-card elevation="2" class="mx-10 my-10">
          <v-card-title class="d-flex justify-space-between blue darken-3 white--text">
            <span>
              {{ title }}
            </span>
            <v-btn v-if="create && create === true" class="primary--text" :to="$route.name + '/create'">
              Yeni Ekle
            </v-btn>
          </v-card-title>
          <slot />
        </v-card>
      </v-col>
    </v-row>
  </main>
</template>
<script>
export default {
  props: ['title', 'create', 'full'],
  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
    ],
  }),
  beforeMount() {
    this.crumbs()
  },
  methods: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          crumbs.push({
            title: param.replace(/-/g, ' '),
            ...match,
          })
        }
      })
      return crumbs
    }
  }
}
</script>
<style scoped>
</style>
