<template>
  <div class="flex flex-col h-100%">
    <div class="flex flex-row justify-between h-30px m-10px">
      <div>你的列表</div>
      <div class="cursor-pointer">
        <svg-icon icon-class="add" size="18" />
        <span>新建列表</span>
      </div>
    </div>
    <div class="flex-1 overflow-auto">
      <el-descriptions
    :column="1"
    size="small"
  >
  <el-descriptions-item v-for="(item,index) in list" :key="index" :label="item.label">
     <div class="flex flex-row flex-nowrap justify-between m-5px cursor-pointer">
      <span>{{ item.desc }}</span>
      <svg-icon icon-class="more" size="18" />
     </div>
  </el-descriptions-item>
  </el-descriptions>
    </div>
  </div>
</template>
<script setup lang="ts">
const list = reactive([
  {
      label:'收藏列表',
      desc:'想去的地方',
      icon:'fav'
  },
  {
      label:'旅行计划城市地标',
      desc:'近一年的',
      icon:'trip'
  },
  {
      label:'和好友',
      desc:'想去的地方',
      icon:'friend'
  }
])
</script>
<style lang="scss" scoped>
:deep(.el-descriptions__label){
  margin-left: 10px;
}

</style>
