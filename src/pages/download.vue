<template>
  <v-layout class="download-page">
    <main-bar />

    <v-main>
      <v-container class="download-container" max-width="80%">
        <v-row class="h-100" tag="aside">
          <v-col class="d-flex flex-column" cols="4">
            <v-hover>
              <template #default="{ isHovering, props }">
                <div v-bind="props" class="image-container position-relative">
                  <v-img
                    alt="Thumbnail"
                    cover
                    max-height="320"
                    rounded
                    :src="thumbnail"
                  >
                    <template #placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular
                          color="primary"
                          indeterminate
                        />
                      </div>
                    </template>
                  </v-img>
                  <v-scroll-y-transition>
                    <v-btn
                      v-if="isHovering"
                      class="btn-download position-absolute"
                      color="primary"
                      elevation="10"
                      :href="thumbnail"
                      icon="mdi-download"
                      size="x-large"
                      target="_blank"
                    />
                  </v-scroll-y-transition>
                </div>
              </template>
            </v-hover>
            <dl class="d-flex flex-column mb-0 mt-3">
              <dt class="font-weight-bold">Title</dt>
              <dd class="text-body-2 mb-3 pl-3">{{ videoInfo.title }}</dd>
              <dt class="font-weight-bold">Duration</dt>
              <dd class="text-body-2 mb-3 pl-3">{{ videoInfo.duration_string }}</dd>
              <template v-if="videoInfo?.description">
                <dt class="font-weight-bold">Description</dt>
                <dd class="description text-body-2 pl-3">
                  {{ videoInfo.description }}
                </dd>
              </template>
            </dl>
          </v-col>

          <v-col cols="8">
            <v-toolbar class="rounded-lg" color="transparent">
              <div class="d-flex align-center justify-space-between px-3 w-100">
                <v-toolbar-title class="section-title user-select-none">
                  Download list
                </v-toolbar-title>
                <format-filter v-model="filterType" />
                <v-btn icon @click="close">
                  <v-icon icon="mdi-close" />
                </v-btn>
              </div>
            </v-toolbar>

            <div
              class="
                format-items-container
                position-relative
                mt-2
                overflow-y-auto
              "
            >
              <div
                class="
                  position-absolute
                  container-scroll
                  d-flex
                  flex-column
                  ga-2
                  w-100
                "
              >
                <format-item
                  v-for="(format, index) in mediaList"
                  :id="format.format_id"
                  :key="`format-item-${index}`"
                  :acodec="format.acodec"
                  :extension="format.ext"
                  :file-name="videoInfo.filename"
                  :file-size="format.filesize"
                  :format-note="format.format_note"
                  :resolution="format.resolution"
                  :url="url"
                  :vcodec="format.vcodec"
                />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'

  import { useAppStore } from '@/stores/app'
  import type { FilterType } from '@/types/FilterTypes'

  const store = useAppStore()
  const { url, videoInfo, mediaList } = storeToRefs(store)
  const router = useRouter()

  // State
  const filterType = ref<FilterType>(null)

  // Computed
  const hasUrl = computed<boolean>(() => {
    return !!url.value
  })

  const thumbnail = computed((): string => {
    if (!videoInfo.value?.thumbnails) {
      return '/img/img-placeholder.svg'
    }

    return videoInfo.value?.thumbnail
  })

  onMounted(() => {
    if (!hasUrl.value) {
      router.push({ name: '/' })
    }
  })

  // Methods
  function close (): void {
    router.push('/')
  }
</script>

<style scoped lang="scss">
.download-page {
  .download-container {
    height: calc(100vh - 64px) !important;

    .image-container {
      .btn-download {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .description {
    max-height: 320px;
    text-align: justify;
    word-break: break-word;
    overflow-y: auto;
  }

  .section-title {
    flex: none;
  }

  .format-items-container {
    height: calc(100% - 40px);
  }
}
</style>
