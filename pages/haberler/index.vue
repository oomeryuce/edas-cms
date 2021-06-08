<template>
  <v-row>
    <v-col>
      <page-custom title="Sıkça Sorulan Sorular(SSS)" :create="true">
        <list-table :headers="headers" :items="sss" />
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
        { text: 'İçerik', value: 'content' },
        { text: 'İşlemler', value: 'operations', sortable: false, align: 'right' },
      ],
    }
  },
  computed: {
    ...mapState({
      sss: (state) => state.sss,
    }),
  },
  async beforeMount() {
    await this.getListSSS();
    console.log(this.sss);
  },
  methods: {
    ...mapActions({
      getListSSS: 'getListSSS',
    }),
  }
}
</script>
