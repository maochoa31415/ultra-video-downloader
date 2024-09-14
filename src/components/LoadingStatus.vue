<template>
  <v-dialog
    v-model="open"
    class="loading-status"
    :close-on-back="false"
    :close-on-content-click="false"
    max-width="220"
    persistent
  >
    <v-card rounded="xl">
      <div class="d-flex flex-column align-items-center justify-center pa-8">
        <div class="text-body-2 text-center mb-2 user-select-none">
          Loading...
        </div>
        <v-progress-linear color="primary" indeterminate rounded />
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'

  import { useAppStore } from '@/stores/app'

  const store = useAppStore()
  const { loading } = storeToRefs(store)

  //  State
  const open = ref<boolean>(false)

  //  Watch
  watch(loading, value => {
    open.value = value
  })
</script>

<style scoped lang="scss">
.loading-status {
  backdrop-filter: blur(40px);
}
</style>
