<template>
  <div>
    <!-- 列表/ 地图/足迹 -->
    <el-menu class="el-menu-vertical-demo" @select="handleSelect">
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
    <div class="tool" v-show="isTool">
      <List></List>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import List from "./components/list.vue";
const isTool = ref(false);
const lastIndex = ref<any>(null);
const handleSelect = (key: string, keyPath: string[]) => {
  if (lastIndex.value === key) {
    isTool.value = !isTool.value;
  } else {
    isTool.value = true;
  }
  lastIndex.value = key;
};
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
.tool {
  width: 310px;
  height: 400px;
  background-color: aqua;
}
.el-menu-item > span {
  display: inline-block;
  margin-left: 5px;
}
</style>
