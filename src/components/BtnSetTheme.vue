<template>
  <v-btn
    v-tooltip="'Set theme'"
    class="rounded-circle"
    icon
    variant="text"
    @click="toggleTheme"
  >
    <v-icon :icon="icon" />
  </v-btn>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  // Computed
  const icon = computed<string>(() => {
    return theme.global.name.value === 'dark'
      ? 'mdi-moon-waxing-crescent'
      : 'mdi-white-balance-sunny'
  })

  // Actions
  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark
      ? 'light'
      : 'dark'
  }
</script>

<style scoped lang="scss"></style>
