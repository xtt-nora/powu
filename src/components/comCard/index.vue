<template>
  <div v-for="(item, index) in props.list" :key="index" class="m-10px">
    <el-card style="width: 200px" body-style="padding:9px" shadow="hover">
      <div class="h-70px">
        <img :src="item.imgUrl" style="width: 100%; height: 100%" />
      </div>
      <el-divider />
      <div class="position-relative">
        <div class="font-size-12px overflow-hidden whitespace-nowrap text-ellipsis">名称: {{ item.name }}</div>
        <div class="font-size-12px overflow-hidden whitespace-nowrap text-ellipsis">
          创建时间: {{ item.createTime }}
        </div>
        <div class="position-absolute bottom-5px right-5px cursor-pointer" @click="updateLocked(item)">
          <svg-icon v-if="!item.isLocked" icon-class="jiesuo" />
          <svg-icon v-else icon-class="suoding" />
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
interface Item {
  id: number;
  imgUrl: string;
  name: string;
  createTime: string;
  isLocked: boolean;
}
interface Props {
  list: Item[];
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [
    {
      id: 1,
      imgUrl: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      name: "世界",
      createTime: "2023-12-16",
      isLocked: false,
    },
  ],
});
const emits = defineEmits(["updateLocked"]);
const updateLocked = (item: { isLocked: boolean }) => {
  item.isLocked = !item.isLocked;
  emits("updateLocked", item);
};
</script>
<style scoped lang="scss">
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 6px 0;
}
</style>
