<template>
  <div>
    <div>
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
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";
const emit = defineEmits(["locationSelected"]);
const searchResults = ref<any>([]);
const searchLocation = async (str: any, cb: (arg0: any[]) => void) => {
  const local = new BMapGL.LocalSearch("北京市", {
    onSearchComplete: function (res: { getCurrentNumPois: () => number; getPoi: (arg0: number) => any }) {
      var arr = [];
      if (local.getStatus() == BMAP_STATUS_SUCCESS) {
        for (var i = 0; i < res.getCurrentNumPois(); i++) {
          arr.push(res.getPoi(i));
        }
        cb(arr);
        console.log(arr);
      } else {
        ElMessage.error("未找到相关地点，请尝试其他关键字。");
      }
    },
  });
  local.search(str);
};
const handleSelect = (item: any) => {
  searchResults.value = item.title;
  emit("locationSelected", item);
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
