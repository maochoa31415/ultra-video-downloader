<template>
  <v-card
    class="format-item rounded-lg overflow-hidden position-relative user-select-none"
    :class="classes"
    elevation="0"
  >
    <div class="d-flex">
      <div class="d-flex flex-column flex-grow-1 ma-3 justify-space-between">
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center">
            <v-icon class="me-2" icon="mdi mdi-monitor-screenshot" />
            {{ props.resolution }}
          </div>
          <v-chip size="small">
            {{ props.extension }}
          </v-chip>
        </div>
        <v-divider />
        <div class="d-flex align-center">
          <div class="d-flex user-select-none">
            <!-- If have audio -->
            <v-icon v-if="hasAudio" color="#198754" icon="mdi-headphones" />
            <!-- If no have audio -->
            <v-icon v-if="!hasAudio" color="#dc3545" icon="mdi-headphones-off" />
            <!-- If have video -->
            <v-icon v-if="hasVideo" color="#198754" icon="mdi-video" />
            <!-- If no have video -->
            <v-icon v-if="!hasVideo" color="#dc3545" icon="mdi-video-off" />
          </div>
          <span class="ms-auto">
            {{ fileSize || "" }}
          </span>
        </div>
      </div>

      <v-btn
        class="rounded-0"
        color="primary"
        height="120px"
        variant="flat"
        width="120px"
        @click="download"
      >
        <svg fill="currentColor" height="48" viewBox="0 0 24 24" width="48">
          <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
        </svg>
      </v-btn>
    </div>

    <v-scroll-y-transition>
      <div
        v-if="downloading"
        class="download-progress position-absolute d-flex flex-column align-items-center justify-center ga-3 pa-3"
      >
        <h4 v-if="!progress" class="user-select-none text-subtitle-1 mx-auto">
          Downloading...
        </h4>
        <v-progress-linear
          v-if="progress"
          class="w-75 mx-auto"
          color="primary"
          :model-value="progress"
          rounded
        />
        <v-btn
          v-if="downloading"
          class="mx-auto"
          color="error"
          rounded="xl"
          variant="flat"
          width="120px"
          @click="cancelDownload"
        >
          Cancel
        </v-btn>
      </div>
    </v-scroll-y-transition>
  </v-card>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useTheme } from 'vuetify'

  import { API_DOWNLOAD, ENV_DEVELOP, THEME_LIGHT } from '@/constants'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()
  const { url: videoUrl } = storeToRefs(store)
  const theme = useTheme()

  interface Props {
    id: string | number;
    resolution?: string;
    formatNote?: string;
    extension?: string;
    vcodec?: string;
    acodec?: string;
    fileName?: string;
    fileSize: string | number;
  }

  const props = withDefaults(defineProps<Props>(), {
    resolution: '', // [1280x720]
    formatNote: '', // [format_note]
    extension: '', // webm
    vcodec: 'none',
    acodec: 'none',
  })

  // State
  const downloading = ref<boolean>(false)
  const loaded = ref<number>(0)
  const progress = ref<number>(0)

  // Computed
  const fileSize = computed((): string | boolean => {
    if (props.fileSize) {
      const fileSize = +props.fileSize

      if (fileSize < 1024) {
        return `${fileSize} bytes`
      }

      if (fileSize >= 1024 && fileSize < 1024 ** 2) {
        return `${fileSize / 1024} Kb`
      }

      if (fileSize >= 1024 ** 2 && fileSize < 1073741824) {
        return `~${(fileSize / 1024 ** 2).toFixed(2)} Mb`
      }

      if (fileSize >= 1073741824) {
        return `~${(fileSize / 1073741824).toFixed(2)} Gb`
      }
    }

    return false
  })
  const hasVideoAudio = computed((): boolean => {
    return (
      props.acodec !== 'none' && props.vcodec !== 'none' && !downloading.value
    )
  })
  const hasAudio = computed<boolean>(() => {
    return props.acodec !== 'none'
  })
  const hasVideo = computed<boolean>(() => {
    return props.vcodec !== 'none'
  })
  const classes = computed(() => {
    return {
      'video-audio': hasVideoAudio.value,
      'light-theme': theme.global.name.value === THEME_LIGHT,
    }
  })

  // Methods
  async function download (): Promise<void> {
    downloading.value = true
    store.setDownloading(true)

    const url = `${API_DOWNLOAD}/${props.id}`
    const raw = JSON.stringify({
      url: videoUrl.value,
    })
    const total = props.fileSize as number

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: raw,
        redirect: 'follow',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          token: store.token,
        },
      })

      const res = new Response(
        new ReadableStream({
          async start (controller): Promise<void> {
            const reader = (response as any).body.getReader()

            for (;;) {
              const { done, value } = await reader.read()

              if (done) break

              loaded.value += value.byteLength
              progress.value = total
                ? Math.round((loaded.value / total) * 100)
                : 0
              controller.enqueue(value)
            }

            downloading.value = false
            store.setDownloading(false)
            controller.close()
          },
        })
      )

      const blob = await res.blob()
      const downloadLink = document.createElement('a')
      const fileName = props.fileName?.split('.')[0]

      document.body.appendChild(downloadLink)
      downloadLink.setAttribute('href', URL.createObjectURL(blob))
      downloadLink.setAttribute('download', `${fileName}.${props.extension}`)
      downloadLink.click()
      downloadLink.remove()
    } catch (e) {
      ENV_DEVELOP && console.log(e)
      alert('Download error')
      downloading.value = false
    }
  }

  function cancelDownload () {
    downloading.value = false
    store.cancelDownload()
  }
</script>

<style scoped lang="scss">
.format-item {
  &.video-audio {
    border: solid 1px #009688;

    &.light-theme {
      background-color: #e0f2f1;
    }
  }

  &.light-theme {
    background-color: #eee;
  }

  .download-progress {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #424242;
  }
}
</style>
