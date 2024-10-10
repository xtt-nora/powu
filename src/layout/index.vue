<template>
  <div class="w-full h-full">
    <Sidebar
      class="position-fixed top-10 bottom-10 left-10px z-999 w-390px flex justify-start flex-row flex-items-center"
    />
    <AppMain class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
import Sidebar from "./Sidebar/index.vue";
import AppMain from "./AppMain/index.vue";
</script>

<style lang="scss" scoped></style>
