<template>
  <div class="flex flex-row w-full h-full">
    <div class="w-270px h-full">
      <RoutePlan :item="mapData" @createRoute="createRoute" />
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
    mapInstance.closeInfoWindow();
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
  } else {
    console.error("Map instance is not available.");
  }
};
const createRoute = (value: any) => {
  //测试
  let lineLayer = new BMapGL.LineLayer({
    enablePicked: true,
    pickWidth: 30,
    pickHeight: 30,
    opacity: 1,
    selectedColor: "red", // 选中项颜色
    minZoom: 4,
    nodeShow: true,
    nodeMask: true,
    linkLine: true,
    nodeStrict: true,
    nodeMinZoom: 4,
    nodeMiddleShow: true,
    nodeBreakpoint: true,
    style: {
      strokeColor: ["case", ["boolean", ["feature-state", "picked"], false], "#6704ff", value.routerColor],
      strokeWeight: 3,
      borderColor: "rgba(0,0,0,0)",
      borderWeight: 1,
      shapeType: 1,
      color: "blue",
      size: 10,
    },
  });
  const lineData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: value.routeName,
        },
        geometry: {
          type: "LineString",
          coordinates: value.routerGroup.map((item: { point: { lng: any; lat: any } }) => {
            return [item.point.lng, item.point.lat];
          }),
        },
      },
    ],
  };
  value.routerGroup.forEach((item: { point: { lng: any; lat: any }; order: any }) => {
    let point = new BMapGL.Point(item.point.lng, item.point.lat);
    let myIcon = new BMapGL.Icon(
      `https://img.icons8.com/?size=40&id=17768&format=png&color=${value.routerColor.replace("#", "")}`,
      new BMapGL.Size(30, 30)
    );
    let marker = new BMapGL.Marker(point, { icon: myIcon });
    let label = new BMapGL.Label(item.order, {
      position: new BMapGL.Point(item.point.lng, item.point.lat),
      offset: new BMapGL.Size(-3, -20),
    });
    label.setStyle({
      backgroundColor: "transparent",
      border: "none",
      fontSize: "14px",
      color: "white",
    });
    marker.setLabel(label);
    mapRef.value.map.addOverlay(marker);
  });
  console.log(lineData, "lineData");
  mapRef.value.map.addNormalLayer(lineLayer);
  lineLayer.setData(lineData);
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
