<template>
  <v-row>
    <v-col>
      <page-custom title="Sıkça Sorulan Sorular(SSS)" :create="true" :full="false">
        <div v-if="!sss" class="pa-5 d-flex justify-center">
          <v-skeleton-loader
            class="mx-auto"
            width="90%"
            type="table-heading, list-item-two-line, table-tfoot"
          ></v-skeleton-loader>
        </div>
        <list-table v-else :headers="headers" :items="sss" @delete-action="deleteAction"/>
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
        { text: 'Kategori', value: 'sTypeName', sortable: false },
        {
          text: 'Soru',
          align: 'start',
          value: 'question',
        },
        { text: 'Cevap', value: 'answer' },
        { text: 'Durum', value: 'status' },
        { text: 'İşlemler', value: 'operations', sortable: false, align: 'right' },
      ],
    }
  },
  computed: {
    ...mapState({
      sss: (state) => state.sss,
    }),
  },
  async mounted() {
    await this.getListSSS();
  },
  methods: {
    ...mapActions({
      getListSSS: 'getListSSS',
      deleteSSS: 'deleteSSS',
    }),
    async deleteAction(id){
      await this.deleteSSS(id)
    },
  }
}
</script>
