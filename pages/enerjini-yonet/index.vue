<template>
  <v-row>
    <v-col>
      <page-custom title="Haberler" :create="true">
        <list-table :headers="headers" :items="news" />
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
        { text: 'Dış Link', value: 'link' },
        { text: 'Resim', value: 'image' },
        { text: 'İşlemler', value: 'operations', sortable: false, align: 'right' },
      ],
    }
  },
  computed: {
    ...mapState({
      news: (state) => state.news,
    }),
  },
  async beforeMount() {
    await this.getListNews();
    console.log(this.news);
  },
  methods: {
    ...mapActions({
      getListNews: 'getListNews',
    }),
  }
}
</script>
