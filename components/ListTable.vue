<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      no-data-text="Herhangi bir veri bulunamadı."
    >
      <template v-slot:item.question="{ item }">
        <div :title="item.question">
          {{ redesignText(item.question, 50) }}
        </div>
      </template>
      <template v-slot:item.answer="{ item }">
        <div :title="item.answer">
          {{ redesignText(item.answer, 100) }}
        </div>
      </template>
      <template v-slot:item.title="{ item }">
        <div :title="item.title">
          {{ redesignText(item.title, 50) }}
        </div>
      </template>
      <template v-slot:item.contentHtml="{ item }">
        <div :title="item.contentHtml">
          {{ redesignText(item.contentHtml, 100) }}
        </div>
      </template>
      <template v-slot:item.operations="{ item }">
        <div class="d-flex justify-end">
          <slot name="operations" v-bind:item="item"></slot>
          <v-btn class="mr-2" color="success" small :to="$route.name + '/edit/' + item.id">
            Düzenle
          </v-btn>
          <v-btn color="error" @click="openModal(item)" small>
            Sil
          </v-btn>
        </div>
      </template>
      <template v-slot:item.status="{ item }">
      <span class="d-flex align-center">
        <v-icon
          :color="item.status ? 'success' : 'dark'"
          class="mr-1"
        >
          {{item.status ? 'mdi-checkbox-marked-circle' : 'mdi-minus-circle'}}
        </v-icon>
        {{item.status ? 'Aktif' : 'Pasif'}}
      </span>
      </template>
      <template v-slot:item.sTypeName="{ item }">
        <v-chip color="primary" small class="font-weight-bold">
          {{ setStypeName(item.sTypeId) }}
        </v-chip>
      </template>
      <template v-slot:item.sentDate="{ item }">
      <span class="d-flex align-center">
        <v-icon
          :color="item.sentDate ? 'success' : 'dark'"
          class="mr-1"
        >
          {{item.sentDate ? 'mdi-checkbox-marked-circle' : 'mdi-minus-circle'}}
        </v-icon>
        {{item.sentDate ? item.sentDate : 'Henüz Gönderilmemiş'}}
      </span>
      </template>
    </v-data-table>
    <v-dialog
      v-model="modalData.show"
      max-width="300"
    >
      <v-card>
        <v-card-title class="text-h5">
          Sil
        </v-card-title>

        <v-card-text>
          Bu veriyi silmek istediğinize emin misiniz?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue darken-1"
            text
            @click.stop="modalData.show = false"
          >
            İptal
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click.stop="postDelete(modalData.item.id)"
          >
            Sil
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ['headers', 'items'],
  data() {
    return {
      modalData: {
        item: {
          id: null,
        },
        show: false
      }
    }
  },
  computed: {
    ...mapState({
      sTypes: (state) => state.sTypes,
    }),
  },
  async beforeMount() {
    await this.getSTypes();
  },
  methods: {
    ...mapActions({
      getSTypes: 'getSTypes',
    }),
    redesignText (text, lenght) {
      if (text.length > lenght){
        return text.slice(0, lenght) + '...'
      }
      return text
    },
    async postDelete(id){
      await this.$emit('delete-action', id)
      this.modalData.show = false
      this.modalData.item.id = null
    },
    openModal(item){
      this.modalData.item.id = item.id
      this.modalData.show = true
    },
    setStypeName(sTypeId){
      if (!this.sTypes) return false
      let sName = '';
      this.sTypes.map(item => {
        if (item.id == sTypeId){
          sName = item.sTypeName
        }
      })
      return sName
    }
  }
}
</script>
<style scoped>
</style>
