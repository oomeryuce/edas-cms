<template>
  <v-row>
    <v-col>
      <page-custom title="Şehirler" :create="true">
        <list-table :headers="headers" :items="cities" />
      </page-custom>
    </v-col>
  </v-row>
</template>
<script>
import PageCustom from "@/components/PageCustom";
import ListTable from "@/components/ListTable";
import { mapActions, mapState } from 'vuex'
export default {
  components: { PageCustom, ListTable },
  data () {
    return {
      headers: [
        {
          text: 'Şehir Adı',
          align: 'start',
          value: 'title',
        },
        { text: 'Resim', value: 'image' },
        { text: 'Durum', value: 'status' },
        { text: 'İşlemler', value: 'operations', sortable: false, align: 'right' },
      ],
    }
  },
  computed: {
    ...mapState({
      cities: (state) => state.cities,
    }),
  },
  async beforeMount() {
    await this.getListCity();
    console.log(this.cities);
  },
  methods: {
    ...mapActions({
      getListCity: 'getListCity',
    }),
  }
}
</script>
