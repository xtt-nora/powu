<template>
  <div class="w-full h-full">
    <div class="bbox" :id="id" ref="mapRef" :style="mapStyle"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { ref } from "vue";
const map = ref();
const point = ref();
const marker = ref();
interface Props {
  id?: string;
  width?: number | string;
  height?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  id: "map",
});
const mapStyle = computed(() => {
  return props.width || props.height
    ? { height: props.height + "px", width: props.width + "px" }
    : { height: "100%", width: "100%" };
});

onMounted(() => {
  initMap(113.456941, 23.161843);
});

const initMap = (longitude: number, latitude: number) => {
  map.value = new BMapGL.Map("map");
  console.log(map.value);
  point.value = new BMapGL.Point(longitude, latitude);
  marker.value = new BMapGL.Marker(point.value);
  map.value.centerAndZoom(point.value, 14);
  map.value.enableScrollWheelZoom();
  map.value.addOverlay(marker.value); // 添加地图标注
};
defineExpose({
  map,
  marker,
  point
});
</script>
<style scoped lang="scss">
.boxmain {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  box-shadow: 0 0 1.5vw #1f69b9b9 inset;
  background:
    linear-gradient(#33cdfa, #33cdfa) left top,
    linear-gradient(#33cdfa, #33cdfa) left top,
    linear-gradient(#33cdfa, #33cdfa) right top,
    linear-gradient(#33cdfa, #33cdfa) right top,
    linear-gradient(#33cdfa, #33cdfa) left bottom,
    linear-gradient(#33cdfa, #33cdfa) left bottom,
    linear-gradient(#33cdfa, #33cdfa) right bottom,
    linear-gradient(#33cdfa, #33cdfa) right bottom;
  background-repeat: no-repeat;
  background-size:
    0.1vw 1.5vw,
    1.5vw 0.1vw;
}

.box {
  width: 98%;
  height: 96%;
}
</style>
