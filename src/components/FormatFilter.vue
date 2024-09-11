<template>
  <v-btn-toggle v-model="optionSelected" color="primary" rounded="xl">
    <v-btn
      v-for="(option, index) in options"
      :key="index"
      @click="setFilterType(option.type)"
    >
      <v-icon :icon="option.icon" />
    </v-btn>
  </v-btn-toggle>
</template>

<script setup lang="ts">
  import { onMounted, watch } from 'vue'
  import { storeToRefs } from 'pinia'

  import { FilterType } from '@/types/FilterTypes'
  import { Option } from '@/interfaces/Option'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()
  const { filterType } = storeToRefs(store)

  const options = ref<Option[]>([
    {
      type: 'video',
      icon: 'mdi-video',
    },
    {
      type: 'audio',
      icon: 'mdi-volume-high',
    },
    {
      type: 'full',
      icon: 'mdi-television-speaker',
    },
  ])

  // Props
  const props = defineProps(['modelValue'])

  //  State
  const optionSelected = ref<number | null>(null)

  // Lifecycle
  onMounted(() => {
    store.setFilterType(props.modelValue)
  })

  // Watch
  watch(props.modelValue, (value: FilterType) => {
    store.setFilterType(value)
  })

  // Emits
  const emit = defineEmits(['update:modelValue'])

  // Actions
  function setFilterType (type: FilterType) {
    if (filterType.value === type) {
      store.setFilterType(null)
    } else {
      store.setFilterType(type)
    }

    emit('update:modelValue', type)
  }
</script>

<style scoped lang="scss">

</style>
