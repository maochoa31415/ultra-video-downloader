<template>
  <v-btn-toggle
    v-model="optionSelected"
    class="format-filter"
    color="primary"
    rounded="xl"
  >
    <v-tooltip
      v-for="(option, index) in options"
      :key="index"
      location="bottom"
      :text="option.tooltip"
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          @click="setFilterType(option.type)"
        >
          <v-icon :icon="option.icon" />
        </v-btn>
      </template>
    </v-tooltip>
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
      tooltip: 'Only video',
    },
    {
      type: 'audio',
      icon: 'mdi-volume-high',
      tooltip: 'Only audio',
    },
    {
      type: 'full',
      icon: 'mdi-television-speaker',
      tooltip: 'Video and audio',
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
.format-filter {
  &.v-theme--light {
    border: solid 1px #eeeeee;
  }

  &.v-theme--dark {
    border: solid 1px rgba(66, 66, 66, .8);
  }
}
</style>
