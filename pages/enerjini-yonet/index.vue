<template>
  <v-row>
    <v-col>
      <page-custom title="Enerjini Yönet" :create="true">
        <list-table :headers="headers" :items="energyManagement" />
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
          value: 'title',
        },
        { text: 'İkon', value: 'icon', sortable: false },
        { text: 'Tüketim', value: 'consumption' },
        { text: 'Günlük', value: 'daily' },
        { text: 'Cihaz Adedi', value: 'qty' },
        { text: 'Çalışma Süresi', value: 'work_time' },
        { text: 'Haftalık Kullanım', value: 'weekly' },
        { text: 'Yılda Kaç Ay', value: 'yearly' },
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
    }),
  }
}
</script>
