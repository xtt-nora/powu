<template>
  <div class="flex flex-col flex-nowrap w-full h-full">
    <div class="h-20px w-full flex flex-row flex-nowrap my-10px justify-between">
      <div v-for="item in list" class="mx-10px">
        <svg-icon :icon-class="item.icon" size="18" /><span class="font-size-12px">{{ item.title }}</span>
      </div>
    </div>
    <div class="h-[calc(100%-40px)]">luxian</div>
  </div>
</template>
<script setup lang="ts">
const list = reactive([
  {
    icon: "routePoint",
    title: "添加路线",
  },
  {
    icon: "save",
    title: "保存数据",
  },
]);
</script>
