<template>
  <div class="flex flex-col flex-nowrap w-full h-full">
    <div class="h-20px w-full flex flex-row flex-nowrap my-10px justify-between">
      <div v-for="item in list" class="mx-10px">
        <svg-icon :icon-class="item.icon" size="18" /><span class="font-size-12px">{{ item.title }}</span>
      </div>
    </div>
    <div class="w-full h-[calc(100%-40px)] overflow-auto flex flex-col flex-nowrap flex-items-center">
      <el-card style="width: 250px">
        <div class="card-header">
          <div v-if="!isEdit" @click="editName">
            <svg-icon icon-class="edit" size="18" />
            <span class="font-size-12px">{{ routeName }}</span>
          </div>
          <div class="card-header" v-else>
            <el-input autofocus v-model="routeName"  ref="inputRef"  size="small" @input="saveName" @blur="cancelName" />
          </div>
        </div>

        <p v-for="o in 10" :key="o" class="text item">{{ "List item " + o }}</p>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
const inputRef = ref(null);
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
const isEdit = ref(false);
const routeName = ref<string>("未知路线");
const editName = () => {
  isEdit.value = !isEdit.value;
  nextTick(() => {
    inputRef.value?.focus();  // 在下一个 DOM 更新周期中手动聚焦
  });
};
const saveName = (value: string) => {
  console.log(value, "saveName");
  if (value.trim() !== "") {
    routeName.value = value;
  }
};
const cancelName = () => {
  isEdit.value = false;  // 取消编辑模式
};
</script>
