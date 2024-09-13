<template>
  <v-app>
    <v-main v-if="appIsReady">
      <router-view />
    </v-main>
    <v-main v-else>
      <v-container class="d-flex" height="100vh" max-width="520px">
        <div class="text-center ma-auto">
          <v-icon icon="mdi-antenna" class="text-h1" color="error" />
          <div class="text-h3 font-weight-light user-select-none">
            Ups, the server is not responding.
          </div>
        </div>
      </v-container>
    </v-main>
    <loading-status />
  </v-app>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()
  const { appIsReady } = storeToRefs(store)
</script>
