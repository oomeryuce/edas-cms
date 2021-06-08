<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
  >
    <template v-slot:item.operations="{ item }">
      <slot name="operations" v-bind:item="item"></slot>
      <v-btn color="success" small :to="$route.name + '/edit/' + item.id">
        Düzenle
      </v-btn>
      <v-btn color="error" small>
        Sil
      </v-btn>
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
</template>
<script>
export default {
  name: "ListTable",
  props: ['headers', 'items'],
  data() {
    return {}
  }
}
</script>
<style scoped>
</style>
