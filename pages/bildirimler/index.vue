<template>
  <v-row>
    <v-col>
      <page-custom title="Bildirimler" :create="true">
        <list-table :headers="headers" :items="notifications" @delete-action="deleteAction">
          <template v-slot:operations="{ item }">
            <v-btn color="primary" @click="openModal(item)" small :disabled="item.sentDate && item.sentDate.length > 0" class="mr-2">
              Gönder
            </v-btn>
            <v-btn color="purple" class="white--text mr-2" @click="duplicate(item)" small>
              Çoğalt
            </v-btn>
          </template>
        </list-table>
      </page-custom>
      <v-dialog
        v-model="modalData.show"
        max-width="300"
      >
        <v-card>
          <v-card-title class="text-h5">
            Bildirim Gönder
          </v-card-title>

          <v-card-text>
            "{{ modalData.item.name }}" başlıklı bildirimi göndermek istediğinize emin misiniz?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="red darken-1"
              text
              @click.stop="modalData.show = false"
            >
              İptal
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click.stop="modalData.show = false"
            >
              Gönder
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
        { text: 'Gönderilme Tarihi', value: 'sentDate' },
        { text: 'İşlemler', value: 'operations', sortable: false, align: 'right' },
      ],
      modalData: {
        item: {
          id: null,
          name: '',
        },
        show: false
      }
    }
  },
  computed: {
    ...mapState({
      notifications: (state) => state.notifications,
    }),
  },
  async beforeMount() {
    await this.getListNotf();
  },
  methods: {
    ...mapActions({
      getListNotf: 'getListNotf',
      deleteNotf: 'deleteNotf',
    }),
    openModal(item){
      this.modalData.item.name = item.title
      this.modalData.item.id = item.id
      this.modalData.show = true
    },
    duplicate(item){
      this.$router.push({
        path: '/bildirimler/create',
        query: {
          title: item.title,
          content: item.content,
        },
      })
    },
    async deleteAction(id){
      await this.deleteNotf(id)
    }
  }
}
</script>
