<template>
  <div class="card">
    <div class="card-item" ref="fContainerRef">
      <VirtualWaterfall :request="getData" :gap="15" :page-size="20" :column="column" :enter-size="column * 2">
        <template #item="{ item, imageHeight }">
          <fs-card
            :detail="{
              imageHeight,
              title: item.title,
              author: item.author,
              bgColor: item.bgColor,
            }"
          />
        </template>
      </VirtualWaterfall>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import FsCard from "@/components/Card/item.vue";
import VirtualWaterfall from "@/components/Card/index.vue";
import { ICardItem } from "@/components/Card/type";
import list from "./config/index";
const fContainerRef = ref<HTMLDivElement | null>(null);
const column = ref(6);
const fContainerObserver = new ResizeObserver((entries) => {
  changeColumn(entries[0].target.clientWidth);
});

const changeColumn = (width: number) => {
  if (width > 960) {
    column.value = 5;
  } else if (width >= 690 && width < 960) {
    column.value = 4;
  } else if (width > 500 && width < 690) {
    column.value = 3;
  } else {
    column.value = 2;
  }
};

onMounted(() => {
  console.log(fContainerRef, fContainerObserver, "fContainerfContainerObserver");
  fContainerRef.value && fContainerObserver.observe(fContainerRef.value);
});

onUnmounted(() => {
  fContainerRef.value && fContainerObserver.unobserve(fContainerRef.value);
});

const getData = (page: number, pageSize: number) => {
  return new Promise<ICardItem[]>((resolve) => {
    setTimeout(() => {
      resolve(list.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize));
    }, 1000);
  });
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 71px);
  flex: 1;
  .card-item {
    width: 100%;
    height: 100%;
  }
}
</style>
