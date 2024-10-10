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
import ComMap from "./comMap.vue";
import Search from "@/layout/NavBar/components/search/index.vue";
import User from "@/layout/NavBar/components/user/index.vue";
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
const handleLocationSelected = (item) => {
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
    const sContent = `
     <div style='width: 100%;height: 100%;display: flex; flex-direction: column;flex-wrap: nowrap;justify-content: space-around; padding: 0 5px;'>
      <p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;word-break: break-all;overflow: hidden;'>
        地址：${item.address || "地址信息未提供"}
      </p>
      <div style='display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-around;'>
        <button id="saveBtn" style='cursor:pointer'>
          分享
        </button>
        <button id="saveBtn" style='cursor:pointer'>
          收藏
        </button>
      </div>
      </div>
    `;
    var opts = {
      width: 350,
      height: 100,
      title: item.title,
    };
    const infoWindow = new BMapGL.InfoWindow(sContent, opts);
    marker.addEventListener("click", () => {
      mapInstance.openInfoWindow(infoWindow, point);
      // 添加按钮点击事件
      infoWindow.addEventListener("open", () => {
        document.getElementById("saveBtn")?.addEventListener("click", () => {
          save();
        });
      });
    });
    mapInstance.openInfoWindow(infoWindow, point);
  } else {
    console.error("Map instance is not available.");
  }
};
const save = () => {
  console.log("保存成功！");
};
</script>
<style scoped lang="scss"></style>
