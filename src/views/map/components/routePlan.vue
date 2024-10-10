<template>
  <div class="flex flex-col flex-nowrap w-full h-full">
    <div class="h-20px w-full flex flex-row flex-nowrap my-10px justify-between">
      <div v-for="item in list" class="mx-10px cursor-pointer">
        <svg-icon :icon-class="item.icon" size="18" /><span class="font-size-14px fw-bold">{{ item.title }}</span>
      </div>
    </div>
    <div class="w-full h-[calc(100%-40px)] overflow-auto flex flex-col flex-nowrap flex-items-center">
      <div style="width: 250px">
        <div class="card-header flex flex-row flex-nowrap justify-between cursor-pointer">
          <div v-if="!isEdit" @click="editName">
            <svg-icon icon-class="edit" size="18" />
            <span class="font-size-12px">{{ routeName }}</span>
          </div>
          <div class="card-header" v-else>
            <el-input ref="inputRef" autofocus v-model="routeName" size="small" @change="saveName" @blur="cancelName" />
          </div>
          <svg-icon icon-class="morey" size="18" class="cursor-pointer" />
        </div>
        <div v-for="o in 3" :key="o" class="font-size-12px pb-5px mx-20px bg-amber mb-1px">{{ "List item " + o }}</div>
        <el-divider />
      </div>
    </div>
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
const inputRef = ref(null);
const isEdit = ref(false);
const routeName = ref<string>("未知路线");
const editName = () => {
  isEdit.value = true;
  nextTick(() => {
    inputRef.value?.focus(); // 在下一个 DOM 更新周期中手动聚焦
  });
};
const saveName = (value: string) => {
  console.log(value, "saveName");
  if (value.trim() !== "") {
    routeName.value = value;
  }
  isEdit.value = false;
};
const cancelName = () => {
  isEdit.value = false;
};
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  display: block;
  width: 100%;
  height: 1px;
  margin: 0;
}
</style>
