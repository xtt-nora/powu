<script setup lang="ts">
import { ref } from "vue";
import variables from "@/styles/variables.module.scss";
console.log(variables.bgColor);

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <div class="box"></div>
  <div style="width: 100px; height: 100px" :style="{ 'background-color': variables.bgColor }" />
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
    <el-button type="info"><i-ep-InfoFilled />Info</el-button>
    <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
    <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>
    <el-button type="info"><svg-icon icon-class="block" />SVG 本地图标</el-button>
  </div>
  <el-card class="text-left text-white border-white border-1 border-solid mt-10 bg-[#242424]">
    <template #header> 子组件 HelloWorld.vue</template>
  </el-card>
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
}

.box {
  width: 100px;
  height: 100px;
  background-color: $bg-color;
}
</style>
