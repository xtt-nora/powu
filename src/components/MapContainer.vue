<script setup>
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useMapStore } from "@/store/modules/map";
const mapStore = useMapStore()
let map = null;

onMounted(() => {
  initMap()
});
const specify = computed(()=>mapStore.specify)
const initMap = ()=>{
  AMapLoader.load({
    key: "	69d49ea9fd6d6c0aa1b976d1a822ca51", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.PlaceSearch','AMap.AutoComplete'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
        resizeEnable: true
      });
      var autoOptions = {
        input: specify
    };
      var auto = new AMap.AutoComplete(autoOptions);
      console.log(auto)
      var placeSearch = new AMap.PlaceSearch({
            map: map
        }); 
      auto.on("select", select);//注册监听，当选中某条记录时会触发
        function select(e) {
            placeSearch.setCity(e.poi.adcode);
            placeSearch.search(e.poi.name);  //关键字查询查询
        }
    })
    .catch((e) => {
      console.log(e);
    });
}
onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 800px;
}
</style>
