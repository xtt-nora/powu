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
const mapRef = ref();
onMounted(() => {
  init();
});
const mapData = ref<any>(null);
let infoWindow: BMapGL.InfoWindow | null = null; // 全局 InfoWindow 实例
let marker: BMapGL.Marker | null = null;
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
    const sContent = `
     <div style='width: 100%;height: 100%;display: flex; flex-direction: column;flex-wrap: nowrap;justify-content: space-around; padding: 0 5px;'>
      <p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;word-break: break-all;overflow: hidden;'>
        地址：${item.address || "地址信息未提供"}
      </p>
      <div style='display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-around;'>
        <button id="saveBtn" style='cursor:pointer'>
          分享
        </button>
        <button id="addBtn" style='cursor:pointer'>
          添加
        </button>
      </div>
      </div>
    `;
    var opts = {
      width: 350,
      height: 100,
      title: item.title,
      enableCloseOnClick: true,
    };

    infoWindow = new BMapGL.InfoWindow(sContent, opts);
    marker.addEventListener("click", () => {
      mapInstance.openInfoWindow(infoWindow, point);
    });
    infoWindow.addEventListener("open", () => {
      document.getElementById("saveBtn")?.addEventListener("click", () => {
        save();
      });
      document.getElementById("addBtn")?.addEventListener("click", () => {
        mapData.value = item;
      });
    });
  } else {
    console.error("Map instance is not available.");
  }
};
const save = () => {
  console.log("保存成功！");
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
