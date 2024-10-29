<template>
  <div ref="mapElement" class="map-container"></div>
</template>
<script setup lang="ts">
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ.js";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";

interface MapProps {
  center?: [number, number]; // [经度, 纬度]
  zoom?: number;
}
// 使用 withDefaults 提供默认值
const props = withDefaults(defineProps<MapProps>(), {
  center: () => [0, 0] as [number, number],
  zoom: 2,
});
const mapElement = ref<HTMLElement | null>(null);
let map: Map | null = null;
const initMap = () => {
  if (!mapElement.value) return;
  const olCenter = fromLonLat(props.center);
  const marker = new Feature({
    geometry: new Point(fromLonLat(props.center)),
  });
  marker.setStyle(
    new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: "https://openlayers.org/en/latest/examples/data/icon.png", // 标记图标的 URL
      }),
    })
  );
  //底图
  const osmLayer = new TileLayer({
    source: new OSM(),
  });
  // 标记图层
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [marker],
    }),
  });

  map = new Map({
    target: mapElement.value,
    layers: [osmLayer, vectorLayer],
    view: new View({
      center: olCenter,
      zoom: props.zoom,
    }),
  });

  // 添加点击事件监听器
  map.on("click", handleMapClick);
};
const handleMapClick = (evt: any) => {
  console.log(map, evt, "map");
  if (!map) return;
  const feature = map.forEachFeatureAtPixel(evt.pixel, (feat) => feat);
  if (feature) {
    // @ts-ignore
    const coordinates = feature.getGeometry()?.getCoordinates();
    if (coordinates) {
      const lonLat = toLonLat(coordinates);
      const featureId = feature.get("id");
      alert(`点击标记 ID: ${featureId}\n经纬度：${lonLat[0].toFixed(6)}, ${lonLat[1].toFixed(6)}`);
    }
  }
};

onMounted(() => {
  initMap();
});
onBeforeUnmount(() => {
  if (map) {
    // @ts-ignore
    map.setTarget(null);
    map = null;
  }
});
</script>
<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%; /* 根据需要调整高度 */
}
</style>
