<template>
  <div class="w-full h-full">
    <div class="position-fixed top-10 z-999 left-90px w-[calc(100%-90px)]">
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
    </div>
    <div class="bbox" id="map"></div>
  </div>
</template>
<script lang="ts" setup>
import NavBar from "@/layout/NavBar/index.vue";
import { onMounted, onUnmounted } from "vue";
import { useMapStore } from "@/store/modules/map";
import { ref } from "vue";
const map = ref();
const point = ref();
const marker = ref();
onMounted(() => {
  getLocation();
});
const getLocation = () => {
  initMap(113.456941, 23.161843);
};
const initMap = (longitude: number, latitude: number) => {
  map.value = new BMapGL.Map("map");

  point.value = new BMapGL.Point(longitude, latitude);
  marker.value = new BMapGL.Marker(point.value);
  map.value.centerAndZoom(point.value, 14);
  map.value.enableScrollWheelZoom();
  map.value.addOverlay(marker.value); // 添加地图标注
};
const searchResults = ref([]);
const searchLocation = async (str: any, cb: (arg0: any[]) => void) => {
  // 使用百度地图的地点搜索服务
  console.log(str, "str");
  const local = new BMapGL.LocalSearch(map.value, {
    onSearchComplete: function (res: { getCurrentNumPois: () => number; getPoi: (arg0: number) => any }) {
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
  console.log(searchResults.value);
};
const handleSelect = (item: { title: never[]; point: { lng: any; lat: any }; address: any }) => {
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
    var infoWindow = new BMapGL.InfoWindow("地址：" + opts.message, opts); // 创建信息窗口对象
    map.value.openInfoWindow(infoWindow, point.value);
  });
};
</script>
<style scoped lang="scss">
.boxmain {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  box-shadow: 0 0 1.5vw #1f69b9b9 inset;
  background:
    linear-gradient(#33cdfa, #33cdfa) left top,
    linear-gradient(#33cdfa, #33cdfa) left top,
    linear-gradient(#33cdfa, #33cdfa) right top,
    linear-gradient(#33cdfa, #33cdfa) right top,
    linear-gradient(#33cdfa, #33cdfa) left bottom,
    linear-gradient(#33cdfa, #33cdfa) left bottom,
    linear-gradient(#33cdfa, #33cdfa) right bottom,
    linear-gradient(#33cdfa, #33cdfa) right bottom;
  background-repeat: no-repeat;
  background-size:
    0.1vw 1.5vw,
    1.5vw 0.1vw;
}

.box {
  width: 98%;
  height: 96%;
}

.bbox {
  width: 100%;
  height: 100%;
}

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
