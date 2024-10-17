<template>
  <div class="w-100% flex-1 flex items-start h-[calc(100%-71px)] p-10px">
    <ComCard :list="list" @updateLocked="updateLocked" />
  </div>
</template>

<script setup lang="ts">
import ComCard from "@/components/comCard/index.vue";
const list = reactive([
  {
    id: 1,
    imgUrl: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    name: "世界",
    createTime: "2023-12-16",
    isLocked: false,
  },
  {
    id: 2,
    imgUrl: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    name: "世界",
    createTime: "2023-12-16",
    isLocked: false,
  },
  {
    id: 3,
    imgUrl: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    name: "世界",
    createTime: "2023-12-16",
    isLocked: false,
  },
]);
const updateLocked = (item: any) => {
  console.log(item, "item");
};
onMounted(() => {});
onUnmounted(() => {});
</script>
