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
import { ref } from "vue";
const emitEvents = defineEmits(["searchLocation"]);
const searchResults = ref([]);
const searchLocation = async (str, cb) => {
  const local = new BMapGL.LocalSearch(map.value, {
    onSearchComplete: function (res) {
      var arr = [];
      if (local.getStatus() == BMAP_STATUS_SUCCESS) {
        for (var i = 0; i < res.getCurrentNumPois(); i++) {
          arr.push(res.getPoi(i));
        }
        cb(arr);
      } else {
        ElMessage.error("未找到相关地点，请尝试其他关键字。");
      }
    },
  });
  local.search(str);
};
const handleSelect = (item) => {
  searchResults.value = item.title;
  point.value = new BMapGL.Point(item.point.lng, item.point.lat);
  map.value.centerAndZoom(point.value, 14);
  if (marker.value) {
    marker.value.setPosition(point.value); // 更新位置
  } else {
    marker.value = new BMapGL.Marker(point.value);
    map.value.addOverlay(marker.value);
  }
  marker.value.setAnimation(BMAP_ANIMATION_BOUNCE);
  marker.value.addEventListener("click", function (e: any) {
    var opts = {
      width: 300,
      height: 70,
      title: item.title, // 使用选中项的标题
      message: item.address || "地址信息未提供", // 使用选中项的地址
    };
    var sContent = `<h4 style='margin:0 0 5px 0;'>${item.title}</h4>
      <p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>
      地址：${item.address}
      </p></div> 
      <div><button id="saveBtn" style='margin-top: 10px;display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: center;cursor:pointer'>收藏</button></div>`;
    var infoWindow = new BMapGL.InfoWindow(sContent); // 创建信息窗口对象
    map.value.openInfoWindow(infoWindow, point.value);
    infoWindow.addEventListener("open", () => {
      document.getElementById("saveBtn")?.addEventListener("click", function () {
        save();
      });
    });
  });
};
const save = () => {
  console.log("保存成功！");
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
