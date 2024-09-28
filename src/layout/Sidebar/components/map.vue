<template>
    <div class="flex flex-col h-100%">
      <div class="flex flex-row justify-between h-30px m-10px">
        <el-link>
     <svg-icon icon-class="jump" size="18" /> 打开我的地图 
    </el-link>
      </div>
      <div class="flex-1 overflow-auto">
        <el-descriptions
      :column="1"
      size="small"
    >
    <el-descriptions-item v-for="(item,index) in list" :key="index" :label="item.label">
       <div class="flex flex-row flex-nowrap justify-between ml-10px">
        <span>{{ item.date }}</span>
       </div>
    </el-descriptions-item>
    </el-descriptions>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  const list = reactive([
  {
      label:'东京',
      date:'2023年11月16日',
      icon:'fav'
  },
  {
      label:'东南亚之旅',
      date:'2023年11月16日',
      icon:'trip'
  },
  {
      label:'首尔',
      date:'2023年11月16日',
      icon:'friend'
  }
])
  </script>
  <style lang="scss" scoped>
  </style>
  