<template>
  <div class="flex flex-row w-full h-full">
    <div class="w-270px h-full">
      <RoutePlan :item="mapData" />
    </div>
    <div class="w-[calc(100%-271px)] position-relative">
      <div class="position-absolute top-10px left-10px z-9999 w-30%">
        <Search @locationSelected="handleLocationSelected" />
      </div>
      <ComMap ref="mapRef" />
      <!-- <OpenMap :center="[116.397428, 39.90923]" :zoom="10" ref="mapRef" /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import Search from "@/components/comSearch/index.vue";
// import OpenMap from "@/components/Map/openMap.vue";
import ComMap from "@/components/comMap.vue";
import RoutePlan from "./routePlan.vue";
import { useCreateWindow } from "@/utils/composables/handleSelected";
const mapRef = ref();
onMounted(() => {
  init();
});
const mapData = ref<any>(null);
let marker: any = null;
const init = async () => {
  await nextTick();
  if (mapRef.value && mapRef.value.map) {
    const scaleControl = new BMapGL.ScaleControl();
    mapRef.value.map.addControl(scaleControl);
  } else {
    console.error("Map instance is not available.");
  }
};
const handleLocationSelected = (item: { point: { lng: any; lat: any }; address: any; title: any }) => {
  if (mapRef.value?.map) {
    const mapInstance = mapRef.value.map;
    const point = new BMapGL.Point(item.point.lng, item.point.lat);
    mapInstance.centerAndZoom(point, 14);
    if (mapRef.value.marker) {
      mapRef.value.marker.setPosition(point);
    } else {
      marker = new BMapGL.Marker(point);
      mapInstance.addOverlay(marker);
      mapRef.value.marker = marker;
    }

    marker = mapRef.value.marker;

    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    marker.addEventListener("click", () => {
      mapInstance.openInfoWindow(infoWindow, point);
    });
    const infoWindow = useCreateWindow(item, "route", mapData);
    infoWindow.redraw();
  } else {
    console.error("Map instance is not available.");
  }
};
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  display: block;
  width: 1px;
  height: 100%;
  margin: 0;
}
</style>
