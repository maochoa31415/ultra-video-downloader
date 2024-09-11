<template>
  <v-form class="url-setter" @submit.prevent="fetchVideoInfo">
    <v-text-field
      v-model.trim="urlToDownload"
      autofocus
      class="input-url position-relative mx-auto border-thin rounded-pill"
      clearable
      density="comfortable"
      :disabled="loading"
      flat
      hide-details
      :loading="loading"
      placeholder="Put the video URL here"
      rounded
      type="url"
      variant="solo"
      @keydown.enter="fetchVideoInfo"
      @keydown.esc="clearUrl"
    >
      <template #append-inner>
        <v-slide-y-transition>
          <v-btn
            v-show="showDownload"
            class="btn-get-info"
            rounded
            variant="text"
            @click="fetchVideoInfo"
          >
            Get info
          </v-btn>
        </v-slide-y-transition>
      </template>
    </v-text-field>
  </v-form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'

  import { useAppStore } from '@/stores/app'
  import { storeToRefs } from 'pinia'

  const store = useAppStore()
  const { loading } = storeToRefs(store)
  const router = useRouter()

  // State
  const urlToDownload = ref<string>('')
  const showDownloader = ref<boolean>(false)

  // Computed
  const showDownload = computed(() => {
    if (urlToDownload.value) {
      return !!urlToDownload.value.length || !loading.value
    }

    return false
  })

  // Methods
  async function fetchVideoInfo (): Promise<void> {
    if (urlToDownload.value) {
      try {
        store.setUrl(urlToDownload.value)
        store.setLoading(true)
        await store.fetchVideoInfo()
        showDownloader.value = true
        store.setLoading(false)
        await router.push('/download')
      } catch (e) {
        store.setLoading(false)
      }
    }
  }

  function clearUrl () {
    urlToDownload.value = ''
    store.setUrl('')
  }
</script>

<style scoped lang="scss">
.input-url {
  .btn-get-info {
    transform: translateX(6px);
  }
}
</style>
