<template>
  <div class="w-100% flex-1 flex items-start h-[calc(100%-71px)] p-10px">
    <ComCard :list="list" @updateLocked="updateLocked" />
  </div>
</template>

<script setup lang="ts">
import ComCard from "@/components/comCard/index.vue";
import { listData } from "./config";

const list = ref<any>();
const updateLocked = (item: any) => {
  console.log(item, "item");
};
onMounted(() => {
  list.value = listData;
});
</script>
