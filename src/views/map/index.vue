<template>
  <div class="flex flex-col flex-nowrap h-100%">
    <div class="h-50px p-5px pr-15px flex justify-between mt-10px mb-10px">
      <div class="flex">
        <div>
          <router-link :to="{ name: '/' }"><svg-icon icon-class="Traveling" size="40" /> </router-link>
        </div>
        <div><el-button size="large" round text @click="isCreateMap(false)">全部</el-button></div>
        <div><el-button size="large" round color="#000000" @click="isCreateMap(true)">创建</el-button></div>
      </div>
      <User />
    </div>
    <el-divider />
    <CreatMap v-if="isCreate" />
    <MapCard v-else />
  </div>
</template>
<script setup lang="ts">
import User from "@/components/comUser/index.vue";
import MapCard from "./components/mapCard.vue";
import CreatMap from "./components/createMap.vue";
const isCreate = ref(false);
const isCreateMap = (value: boolean) => {
  isCreate.value = value;
};
</script>
<style lang="scss" scoped>
.el-button.is-text:not(.is-disabled):hover {
  background-color: transparent;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0;
}
</style>
