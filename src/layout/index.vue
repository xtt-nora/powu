<template>
  <div class="w-full h-full">
    <Sidebar class="position-fixed top-10 bottom-10 left-10px z-999 w-80px bg-#E9E4F0" />
    <!-- <div class="position-relative h-full ml-40"> -->
    <NavBar class="position-fixed top-10 z-999 left-90px w-[calc(100%-90px)]" />
    <!-- </div> -->
    <AppMain class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
import Sidebar from "./Sidebar/index.vue";
import NavBar from "./NavBar/index.vue";
import AppMain from "./AppMain/index.vue";
</script>

<style lang="scss" scoped></style>