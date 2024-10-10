<template>
  <div class="flex flex-row w-full h-full">
    <OpenMap />
  </div>
</template>
<script setup lang="ts">
import OpenMap from "./openMap.vue"
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  display: block;
  width: 1px;
  height: 100%;
  margin: 0;
}
</style>
