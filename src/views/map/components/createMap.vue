<template>
  <div class="flex flex-row w-full h-full">
    <div class="w-270px h-full">
      <RoutePlan />
    </div>
    <div class="w-[calc(100%-271px)] position-relative">
      <div class="position-absolute top-10px left-10px z-9999 w-30%">
        <Search @locationSelected="handleLocationSelected" />
      </div>
      <ComMap ref="mapRef" />
    </div>
  </div>
</template>
<script setup lang="ts">
import ComMap from "@/components/comMap.vue";
import RoutePlan from "./routePlan.vue";
const mapRef = ref();
import Search from "@/components/comSearch/index.vue";
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
