<template>
  <v-container
    class="home-utl-setter d-flex flex-column"
    height="100%"
    width="720"
  >
    <div class="my-auto">
      <url-setter />
      <p class="home-description text-body-1 w-75 text-center mx-auto mt-3">
        🤯 Download videos from any page: Youtube, Facebook, Instagram, Pinterest, TikTok, and more...
      </p>
    </div>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home-utl-setter {
  .home-description {
    user-select: none;
  }
}
</style>
