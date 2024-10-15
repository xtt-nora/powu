<template>
  <div class="flex flex-col flex-nowrap w-full h-full">
    <div class="h-20px w-full flex flex-row flex-nowrap my-10px justify-between">
      <div v-for="item in list" class="mx-10px cursor-pointer" @click="clickEvent(item.title)">
        <svg-icon :icon-class="item.icon" size="18" /><span class="font-size-14px fw-bold">{{ item.title }}</span>
      </div>
    </div>
    <div class="w-full h-[calc(100%-40px)] overflow-auto flex flex-col flex-nowrap flex-items-center">
      <div
        v-for="item in routeList"
        @click="selectItem(item)"
        class="w-250px border-b border-solid b-b-blueGray mb-10px"
      >
        <div
          :class="[
            'card-header flex flex-row flex-nowrap justify-between cursor-pointer mb-10px',
            { selectB: item.isSelected },
          ]"
        >
          <div v-if="!item.isEdit" @click="editName(item)" class="overflow-hidden whitespace-nowrap text-ellipsis">
            <svg-icon icon-class="edit" size="18" />
            <span class="font-size-12px">{{ item.routeName }}</span>
          </div>
          <div class="card-header" v-else>
            <el-input
              autofocus
              v-model="item.routeName"
              ref="inputRef"
              size="small"
              @change="saveName(item)"
              @blur="cancelName(item)"
            />
          </div>
          <el-dropdown placement="bottom" @command="(command) => handleCommand(command, item)">
            <span> <svg-icon icon-class="morey" size="18" class="cursor-pointer" /></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="create">形成路线</el-dropdown-item>
                <el-dropdown-item command="del">删除路线</el-dropdown-item>
                <!-- <el-dropdown-item>The Action 3st</el-dropdown-item> -->
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div
          v-for="o in item.routerGroup"
          :key="o.order"
          class="font-size-12px h-20px line-height-20px pb-5px mx-20px hover:bg-[#F1F1F1] focus-visible:bg-[#F1F1F1] mb-1px"
        >
          {{ o.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  item: Object,
});
watch(
  () => props.item,
  (newVal) => {
    console.log(newVal, "new");
    routeList.value.forEach((item) => {
      if (item.isSelected) {
        newVal &&
          item.routerGroup.push({ name: newVal.title, point: newVal.point, order: item.routerGroup.length + 1 });
      }
    });
  },
  {
    deep: true,
  }
);
const inputRef = ref<any>(null);
const id = ref(0);
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
const routeList = ref([
  {
    routeName: "未知路线",
    id: 0,
    isEdit: false,
    isSelected: true,
    routerGroup: [
      {
        name: "TravelNote",
        point: {},
        order: 1,
      },
      {
        name: "镰仓",
        point: {},
        order: 2,
      },
      {
        name: "秋叶原",
        point: {},
        order: 3,
      },
      {
        name: "银座",
        point: {},
        order: 4,
      },
    ],
  },
]);
const editName = (item: { isEdit: boolean }) => {
  item.isEdit = true;
  nextTick(() => {
    inputRef.value?.focus();
  });
};
const saveName = (item: { isEdit: boolean }) => {
  item.isEdit = false;
};
const cancelName = (item: { isEdit: boolean }) => {
  item.isEdit = false; // 取消编辑模式
};
//保存数据和添加路线
const clickEvent = (item: string) => {
  item === "保存数据"
    ? save()
    : routeList.value.push({
        routeName: "未知路线",
        id: id.value++,
        isEdit: false,
        isSelected: false,
        routerGroup: [],
      });
};
//保存所有路线
const save = () => {
  console.log("保存数据");
};
const handleCommand = (command: string, item: any) => {
  command === "del" ? del(item) : create();
};
const del = (item: any) => {
  console.log("删除", item);
};
const create = () => {
  console.log("创建成功");
};
const selectItem = (item: { isSelected: boolean }) => {
  // 取消其他项的选中状态
  routeList.value.forEach((route) => {
    route.isSelected = false;
  });
  // 设置当前项为选中状态
  item.isSelected = true;
};
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  display: block;
  width: 100%;
  height: 1px;
  margin: 10px;
}
.selectB {
  border-left: 3px solid seagreen;
}
</style>
