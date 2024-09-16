<template>
  <v-container
    class="home-utl-setter d-flex flex-column"
    height="100%"
    width="720"
  >
    <div class="d-flex flex-column my-auto user-select-none">
      <img alt="App logo" class="mx-auto" src="/img/icon-128.png">
      <div class="text-h5 font-weight-light text-center mb-2">
        Ultra Video Downloader
      </div>
      <url-setter />
      <p class="home-description text-body-1 w-75 text-center mx-auto mt-3">
        🤯 Download videos from any page: Youtube, Facebook, Instagram, Pinterest, TikTok, and more...
      </p>
      <v-alert
        v-model="showAlert"
        class="mx-auto mt-3"
        closable
        density="compact"
        icon="mdi-alert"
        rounded="lg"
        type="warning"
        variant="tonal"
      >
        If you have using VPN or proxy, please disconnected it.
      </v-alert>
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const showAlert = ref<boolean>(true)
</script>

<style scoped lang="scss"></style>
