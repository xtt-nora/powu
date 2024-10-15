<template>
  <div class="w-full h-full">
    <div class="position-fixed top-10 z-999 left-90px w-[calc(100%-90px)]">
      <div class="h-50px p-5px pr-15px flex justify-between w-full">
        <Search @locationSelected="handleLocationSelected" class="w-30%" />
        <User />
      </div>
    </div>
    <ComMap ref="mapRef" />
  </div>
</template>
<script lang="ts" setup>
import ComMap from "@/components/comMap.vue";
import Search from "@/components/comSearch/index.vue";
import User from "@/components/comUser/index.vue";
import { useCreateWindow } from "@/utils/composables/handleSelected";
const mapRef = ref();
onMounted(() => {
  init();
});
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
      const marker = new BMapGL.Marker(point);
      mapInstance.addOverlay(marker);
      mapRef.value.marker = marker;
    }

    const marker = mapRef.value.marker;

    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    const infoWindow = useCreateWindow(item, "default");
    marker.addEventListener("click", () => {
      mapInstance.openInfoWindow(infoWindow, point);
    });
  } else {
    console.error("Map instance is not available.");
  }
};
</script>
<style scoped lang="scss"></style>
