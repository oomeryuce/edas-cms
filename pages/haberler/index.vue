<template>
  <v-row>
    <v-col>
      <page-custom title="Haberler" :create="true" :full="false">
        <div v-if="!news" class="pa-5 d-flex justify-center">
          <v-skeleton-loader
            class="mx-auto"
            width="90%"
            type="table-heading, list-item-two-line, table-tfoot"
          ></v-skeleton-loader>
        </div>
        <list-table v-else :headers="headers" :items="news" @delete-action="deleteAction"/>
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
        { text: 'İçerik', value: 'contentHtml' },
        { text: 'Dış Link', value: 'link' },
        { text: 'Resim', value: 'pictureUri' },
        { text: 'Durum', value: 'status' },
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
    await console.log(this.news);
  },
  methods: {
    ...mapActions({
      getListNews: 'getListNews',
      deleteNews: 'deleteNews',
    }),
    async deleteAction(id){
      await this.deleteNews(id)
    }
  }
}
</script>
