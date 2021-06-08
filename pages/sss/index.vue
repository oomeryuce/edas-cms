<template>
  <v-row>
    <v-col>
      <page-custom title="Sıkça Sorulan Sorular">
        <list-table :headers="headers" :items="desserts" />
      </page-custom>
    </v-col>
  </v-row>
</template>
<script>
import PageCustom from "@/components/PageCustom";
import ListTable from "@/components/ListTable";
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
      desserts: [
        {
          id: 1,
          title: 'Test 1',
          content: 'Test 1 Content',
        },
        {
          id: 2,
          title: 'Test 2',
          content: 'Test 2 Content',
        },
        {
          id: 3,
          title: 'Test 3',
          content: 'Test 3 Content',
        },
      ]
    }
  }
}
</script>
