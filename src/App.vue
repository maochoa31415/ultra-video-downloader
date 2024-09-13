<template>
  <v-app>
    <v-main>
      <v-scroll-y-transition>
        <router-view />
      </v-scroll-y-transition>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

  onMounted(() => {
    store.fetchToken()
  })
</script>
