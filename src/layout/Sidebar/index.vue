<template>
  <div ref="container" >
    <!-- 列表/ 地图/足迹 -->
    <el-menu ref="menu"  class="el-menu-vertical-demo" @select="handleSelect">
      <el-menu-item index="1">
        <template #title>
          <svg-icon icon-class="list" size="18" />
          <span>列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="2">
        <svg-icon icon-class="map" size="18" />
        <span>地图</span>
      </el-menu-item>
      <el-menu-item index="3">
        <svg-icon icon-class="footer" size="18" />
        <span>足迹</span>
      </el-menu-item>
    </el-menu>
    <Transition name="slide-fade">
    <div class="w-310px h-400px bg-#fff" v-show="isTool">
      <List v-show="activeMenu === '1'"></List>
      <Map v-show="activeMenu === '2'"></Map>
      <FooterPrint v-show="activeMenu === '3'"></FooterPrint>
    </div>
  </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import List from "./components/list.vue";
import Map from "./components/map.vue";
import FooterPrint from "./components/footerPrint.vue";
const isTool = ref(false);
const lastIndex = ref<any>(null);
const activeMenu = ref('')
const menu = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const handleSelect = (key: string, keyPath: string[]) => {
   activeMenu.value = key
  if (lastIndex.value === key) {
    isTool.value = !isTool.value;
  } else {
    isTool.value = true;
  }
  lastIndex.value = key;
};
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  if (
    isTool.value &&
    container.value &&
    !container.value.contains(target)
  ) {
    isTool.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 80px;
  min-height: 400px;
}
.el-sub-menu__title,
.el-menu-item {
  display: flex;
  align-items: center;
  padding: 0 !important;
  justify-content: center;
}
.el-menu-item > span {
  display: inline-block;
  margin-left: 5px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
