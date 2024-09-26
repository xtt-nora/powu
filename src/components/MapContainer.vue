<template>
  <div class=" w-full h-full">
     <div  class="position-fixed top-10 z-999 left-90px w-[calc(100%-90px)]" >
      <div class="h-50px p-5px pr-15px flex justify-between">
  <div class="w-30%">
    <el-autocomplete popper-class="autoAddressClass" v-model="searchResults" :fetch-suggestions="searchLocation"
        :trigger-on-focus="false" placeholder="请输入详细地址" @select="handleSelect" clearable  class="inline-input">
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
const addName = ref("");

onMounted(() => {
// 调用获取用户位置的函数
getLocation();
});

const getLocation = () => {
initMap(113.456941, 23.161843);
};
const initMap = (longitude, latitude) => {
map.value = new BMapGL.Map('map');

const point = new BMapGL.Point(longitude, latitude);
const marker = new BMapGL.Marker(point, { icon: null });
map.value.centerAndZoom(point, 14);
map.value.enableScrollWheelZoom();
map.value.addOverlay(marker);// 添加地图标注
openInfosub(marker, point);

// 添加缩放控件
const navigationControl = new BMapGL.NavigationControl();
map.value.addControl(navigationControl);

// 添加比例尺控件
const scaleControl = new BMapGL.ScaleControl();
map.value.addControl(scaleControl);

// 地图卫星切换
const mapTypeControl = new BMapGL.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP] });
map.value.addControl(mapTypeControl);



// 点击标注监听事件
marker.addEventListener('click', function (e) {
  console.log(e);
});
};

const openInfosub = (marker, point) => {
const opts = {
  width: 250,
  height: 100,
  title: '信息窗口',
  enableAutoPan: false
};

const infoWindow = new BMapGL.InfoWindow('世界你好', opts);

// map.value.openInfoWindow(infoWindow, point);//这个是进入界面就直接出弹窗，点击事件没写，可参考下面坐标集合的另外一种触发点击方法
};

const showMarkers = (coordinates) => {//图像标注
console.log(coordinates, 'coordinates');
coordinates.forEach(coord => {
  const points = new BMapGL.Point(coord.longitude, coord.latitude);
  const markers = new BMapGL.Marker(points);
  map.value.addOverlay(markers);
  openInfoWins(markers, coord, points);
});
};

const openInfoWins = (markers, data, points) => {
const opts = {
  width: 250,
  height: 100,
  padding: 2,
  enableAutoPan: true
};

let { latitude, longitude, name } = data;
const sContent = ` <div style="margin-top:-15px;"><p>设备名字:&nbsp;${name}</p><p>GPS经度:&nbsp;${longitude}</p>
                          <p>GPS纬度:&nbsp;${latitude}</p>
                          </div> `;

const infoWindow = new BMapGL.InfoWindow(sContent, opts);
markers.addEventListener('click', function (e) {
  openInfo(infoWindow, points, e);
});
};

const openInfo = (infoWindow, points, e) => {
map.value.openInfoWindow(infoWindow, points); //开启信息窗口
};
const searchResults = ref([]);

const searchLocation = async (str, cb) => {// 使用百度地图的地点搜索服务
console.log(str, 'str');
const local = new BMapGL.LocalSearch(map.value, {
  onSearchComplete: function (res) {
    var arr = [];
    if (local.getStatus() == BMAP_STATUS_SUCCESS) {
      for (var i = 0; i < res.getCurrentNumPois(); i++) {
        arr.push(res.getPoi(i));
      }
      cb(arr)
    } else {
      ElMessage.error('未找到相关地点，请尝试其他关键字。');
    }
  }
});
local.search(str);
console.log(searchResults.value);
};

const handleSelect = (item) => {//点击搜索的点位并地图跳转到该坐标
console.log(item)
searchResults.value = item.address
const point = new BMapGL.Point(item.point.lng, item.point.lat);
map.value.centerAndZoom(point, 14);
// var marker = new BMapGL.Marker(point);  // 创建标注
// map.value.addOverlay(marker);               // 将标注添加到地图中
// marker.setAnimation(BMAP_ANIMATION_BOUNCE); //坐标跳动的动画
}
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
background: linear-gradient(#33cdfa, #33cdfa) left top,
  linear-gradient(#33cdfa, #33cdfa) left top,
  linear-gradient(#33cdfa, #33cdfa) right top,
  linear-gradient(#33cdfa, #33cdfa) right top,
  linear-gradient(#33cdfa, #33cdfa) left bottom,
  linear-gradient(#33cdfa, #33cdfa) left bottom,
  linear-gradient(#33cdfa, #33cdfa) right bottom,
  linear-gradient(#33cdfa, #33cdfa) right bottom;
background-repeat: no-repeat;
background-size: 0.1vw 1.5vw, 1.5vw 0.1vw;
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
.inline-input{
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
