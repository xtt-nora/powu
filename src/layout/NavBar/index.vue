<template>
  <div class="h-50px p-5px pr-15px flex justify-between">
    <div class="w-30%">
      <el-autocomplete
        popper-class="autoAddressClass"
        v-model="searchResults"
        :fetch-suggestions="searchLocation"
        :trigger-on-focus="false"
        placeholder="请输入详细地址"
        @select="handleSelect"
        clearable
        class="inline-input"
      >
        <template #default="{ item }">
          <div class="autoAddressClass_item">
            <ElIcon :size="20" color="black">
              <Search />
            </ElIcon>
            <div>
              <div class="title">{{ item.title }}</div>
              <span class="address ellipsis">{{ item.address }}</span>
            </div>
          </div>
        </template>
      </el-autocomplete>
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
import { ElMessage } from "element-plus";
import { ref } from "vue";
const emit = defineEmits(["locationSelected"]);
const searchResults = ref([]);
const searchLocation = async (str, cb) => {
  const local = new BMapGL.LocalSearch("北京市", {
    onSearchComplete: function (res) {
      var arr = [];
      if (local.getStatus() == BMAP_STATUS_SUCCESS) {
        for (var i = 0; i < res.getCurrentNumPois(); i++) {
          arr.push(res.getPoi(i));
        }
        cb(arr);
        console.log(arr)
      } else {
        ElMessage.error("未找到相关地点，请尝试其他关键字。");
      }
    },
  });
  local.search(str);
};
const handleSelect = (item) => {
  searchResults.value = item.title;
  console.log(searchResults.value )
  emit("locationSelected", item)
};
</script>
<style lang="scss" scoped>
:deep(.el-input) {
  width: 100%;
  height: 40px;
  border-radius: 200px;
}
:deep(.el-input__wrapper) {
  border-radius: 200px;
}
.inline-input {
  border-radius: 200px;
}
.autoAddressClass li .title {
  line-height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.autoAddressClass li .address {
  line-height: 1;
  font-size: 12px;
  color: #b4b4b4;
  margin-bottom: 5px;
}

.autoAddressClass li .autoAddressClass_item {
  overflow: hidden;
  display: flex;
  align-items: center;
}

.autoAddressClass li .autoAddressClass_item .el-icon {
  margin-right: 20px;
}
</style>
