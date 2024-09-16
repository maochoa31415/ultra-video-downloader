<template>
  <v-main>
    <v-container class="d-flex" height="100vh" max-width="520px">
      <div class="text-center ma-auto">
        <v-icon class="text-h1" color="error" icon="mdi-antenna" />
        <div class="text-h3 font-weight-light user-select-none">
          Ups, the server is not responding.
        </div>
        <v-btn
          class="mt-4"
          color="primary"
          prepend-icon="mdi-reload"
          rounded="rounded"
          size="x-large"
          text="Reload page"
          variant="tonal"
          @click="reloadPage"
        />
      </div>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
  function reloadPage () {
    window.location.reload()
  }
</script>

<style scoped lang="scss"></style>
