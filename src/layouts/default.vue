<template>
  <v-app>
    <v-main v-if="appIsReady">
      <router-view />
    </v-main>
    <connection-off-info v-else />

    <loading-status />
  </v-app>
</template>

<script lang="ts" setup>
  import ConnectionOffInfo from '@/components/ConnectionOffInfo.vue'
  import { storeToRefs } from 'pinia'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()
  const { appIsReady } = storeToRefs(store)
</script>
