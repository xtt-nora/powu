<template>
  <div class="h-50px p-5px pr-15px flex justify-between">
    <div class="w-30%">
      <input
        type="text"
        id="name"
        name="name"
        class="w-100% h-40px border-rd-50 pl-15px"
        placeholder="搜索"
        :value="searchValue"
        @input="onInput"
      />
    </div>

    <div>
      <el-dropdown>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const searchValue = ref("");
const onInput = (event: Event) => {
  searchValue.value = (event.target as HTMLInputElement).value;
};
</script>