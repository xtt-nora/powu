<template>
  <div class="w-full h-full">
    <NavBar class="position-fixed top-10 z-999 left-90px w-[calc(100%-90px)]"></NavBar>
    <ComMap ref="mapRef" />
  </div>
</template>
<script lang="ts" setup>
import NavBar from "@/layout/NavBar/index.vue";
import ComMap from "./comMap.vue";
// type MapType = {
//   map:
// };
const mapRef = ref();
onMounted(() => {
  console.log(mapRef.value);
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

.bbox {
  width: 100%;
  height: 100%;
}
</style>
