<template>
  <v-app-bar class="main-bar px-6" color="#263238">
    <template #prepend>
      <img
        alt="Ultra Video Downloader"
        height="32"
        src="/img/icon-64.png"
        width="32"
      >
    </template>

    <v-app-bar-title>
      Ultra Video Downloader
    </v-app-bar-title>
    <url-setter v-if="isDownloadPage" />
    <template #append>
      <btn-set-theme />
    </template>
    <v-spacer />
  </v-app-bar>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import { useAppStore } from '@/stores/app'
  import { storeToRefs } from 'pinia'

  const ROUTE_NAME = '/download'
  const store = useAppStore()
  const { url } = storeToRefs(store)
  const route = useRoute()

  const urlValue = ref<string>('')
  const isDownloadPage = ref<boolean>(false)

  onMounted(() => {
    if (route.name === ROUTE_NAME) {
      isDownloadPage.value = true
      urlValue.value = url.value
    }
  })
</script>

<style scoped lang="scss">
.main-bar {
  .url-setter {
    min-width: 560px;
  }
}
</style>
