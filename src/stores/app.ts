import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { INDEX_NOT_FOUND } from '@/constants'
import { request } from '@/libs/request'
import type { VideoInfo } from '@/interfaces/VideoInfo'
import { type FilterType, FilterTypes } from '@/types/FilterTypes'
import type { Format } from '@/interfaces/Format'

const API_CANCEL_DOWNLOAD = import.meta.env.VITE_API_CANCEL_DOWNLOAD
const API_INFO_URL = import.meta.env.VITE_API_INFO_URL
const API_TOKEN = import.meta.env.VITE_API_TOKEN

export const useAppStore = defineStore('appStore', () => {
  // State
  const url = ref<string>('')
  const history = ref<string[]>([])
  const loading = ref<boolean>(false)
  const downloading = ref<boolean>(false)
  const token = ref<string>('')
  const filterType = ref<FilterType>(null)
  const videoInfo = ref<VideoInfo>({
    formats: [],
    thumbnails: [],
    thumbnail: '',
    title: '[tile]',
    upload_date: '',
    filename: '',
    description: '[description]',
    duration_string: '[00:00]',
  })

  // Getters
  const appIsReady = computed<boolean>(() => token.value !== '')
  const mediaList = computed<Format[]>((): Format[] => {
    if (videoInfo.value.formats) {
      // Only audio
      if (filterType.value === FilterTypes.Audio) {
        return videoInfo.value.formats.filter(
          (media: Format) =>
            media.acodec !== FilterTypes.None &&
            media.vcodec === FilterTypes.None
        )
      }

      // Only video
      if (filterType.value === FilterTypes.Video) {
        return videoInfo.value.formats.filter(
          (media: Format) =>
            media.vcodec !== FilterTypes.None &&
            media.acodec === FilterTypes.None
        )
      }

      // Audio & video
      if (filterType.value === FilterTypes.Full) {
        return videoInfo.value.formats.filter(
          (media: Format) =>
            media.vcodec !== FilterTypes.None &&
            media.acodec !== FilterTypes.None
        )
      }
    }

    return videoInfo.value.formats
  })

  // Mutations
  function setUrl (value: string) {
    url.value = value
  }

  function addToHistory (url: string) {
    const indexUrl = history.value.findIndex(
      item => item.trim() === url.trim()
    )

    if (indexUrl === INDEX_NOT_FOUND) {
      history.value.push(url)
    } else {
      history.value.splice(indexUrl, 1)
    }
  }

  function setLoading (state: boolean) {
    loading.value = state
  }

  function setToken (value: string) {
    token.value = value
  }

  function setDownloading (value: boolean) {
    downloading.value = value
  }

  function setVideoInfo (value: VideoInfo) {
    videoInfo.value = value
  }

  function setFilterType (value: FilterType) {
    filterType.value = value
  }

  // Actions
  async function fetchToken (): Promise<void> {
    const response = (await request({
      verb: 'GET',
      url: API_TOKEN,
    })) as {
      token: string;
    }

    setToken(response.token)
  }

  async function cancelDownload () {
    return await request({
      verb: 'POST',
      url: API_CANCEL_DOWNLOAD,
      headers: {
        token: token.value,
      },
    })
  }

  async function fetchVideoInfo () {
    const data = {
      url: url.value,
    }

    setLoading(true)

    const response = await request({
      verb: 'POST',
      url: API_INFO_URL,
      data,
      headers: {
        token: token.value,
      },
    })

    setVideoInfo(response as VideoInfo)
    setLoading(false)
  }

  return {
    // State
    url,
    history,
    loading,
    token,
    downloading,
    videoInfo,
    filterType,
    // Getters
    appIsReady,
    mediaList,
    // Mutations
    setUrl,
    addToHistory,
    setLoading,
    setDownloading,
    setVideoInfo,
    setFilterType,
    // Actions
    fetchToken,
    cancelDownload,
    fetchVideoInfo,
  }
})
