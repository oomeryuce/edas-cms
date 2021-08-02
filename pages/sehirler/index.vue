<template>
  <v-row>
    <v-col>
      <page-custom title="Şehirler" :create="true" :full="true">
        <div v-if="!cities" class="pa-5 d-flex justify-center">
          <v-skeleton-loader
            class="mx-auto"
            width="90%"
            type="table-heading, list-item-two-line, table-tfoot"
          ></v-skeleton-loader>
        </div>
        <list-table v-else type="iller" :headers="headers" :items="cities" @delete-action="deleteAction"/>
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
          value: 'cityName',
        },
        { text: 'Resim', value: 'picture' },
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
  },
  methods: {
    ...mapActions({
      getListCity: 'getListCity',
      deleteCity: 'deleteCity',
    }),
    async deleteAction(id){
      await this.deleteCity(id)
    }
  }
}
</script>
