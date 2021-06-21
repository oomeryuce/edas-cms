<template>
  <v-row>
    <v-col>
      <page-custom title="Enerjini Yönet" :create="true" :full="false">
        <div v-if="!energyManagement" class="pa-5 d-flex justify-center">
          <v-skeleton-loader
            class="mx-auto"
            width="90%"
            type="table-heading, list-item-two-line, table-tfoot"
          ></v-skeleton-loader>
        </div>
        <list-table v-else :headers="headers" :items="energyManagement" @delete-action="deleteAction"/>
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
          text: 'Başlık',
          align: 'start',
          value: 'name',
        },
        { text: 'İkon', value: 'iconUri', sortable: false },
        { text: 'Tüketim(W)', value: 'tuketimW' },
        { text: 'Saatlik(kWh)', value: 'saatlikTuketim' },
        { text: 'Saatlik(₺)', value: 'saatlikTuketimTL' },
        { text: 'Günde Kaç Saat', value: 'calismaSuresiSaat' },
        { text: 'Haftada Kaç Gün', value: 'haftalikKullanilanGun' },
        { text: 'Yılda Kaç Ay', value: 'yildaKullanilanAy' },
        { text: 'Durum', value: 'status' },
        { text: 'İşlemler', value: 'operations', sortable: false, align: 'right' },
      ],
    }
  },
  computed: {
    ...mapState({
      energyManagement: (state) => state.energyManagement,
    }),
  },
  async beforeMount() {
    await this.getEnergyItems();
  },
  methods: {
    ...mapActions({
      getEnergyItems: 'getEnergyItems',
      deleteEnergyItem: 'deleteEnergyItem',
    }),
    async deleteAction(id){
      await this.deleteEnergyItem(id)
    }
  }
}
</script>
