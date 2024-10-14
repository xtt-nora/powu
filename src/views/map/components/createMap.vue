<template>
  <div class="flex flex-row w-full h-full">
    <div class="w-270px h-full">
      <RoutePlan />
    </div>
    <div class="w-[calc(100%-271px)] position-relative">
      <OpenMap ref="mapRef" />
    </div>
  </div>
</template>
<script setup lang="ts">
import OpenMap from "@/components/Map/openMap.vue";
import RoutePlan from "./routePlan.vue";
const mapRef = ref();
onMounted(() => {});
const handleLocationSelected = () => {};
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  display: block;
  width: 1px;
  height: 100%;
  margin: 0;
}
</style>
