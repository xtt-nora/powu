export function useCreateWindow(item: any, type: any, mapTranRef?: Ref<any>) {
  const sContent = `
  <div style='width: 100%; height: 100%; display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: space-around; padding: 0 5px;'>
    <p style='margin:0; line-height:1.5; font-size:13px; text-indent:2em; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; word-break: break-all; overflow: hidden;'>
      地址：${item.address || "地址信息未提供"}
    </p>
    <div style='display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around;'>
      <button id="shareBtn" style='cursor:pointer'>
        分享
      </button>
      <button id=${type === "default" ? "saveBtn" : "addBtn"} style='cursor:pointer'>
        ${type === "default" ? "保存" : "添加"}
      </button>
    </div>
  </div>
`;
  var opts = {
    width: 350,
    height: 100,
    title: item.title,
  };
  const infoWindow = new BMapGL.InfoWindow(sContent, opts);
  infoWindow.addEventListener("open", () => {
    const shareBtn = document.getElementById("shareBtn");
    if (shareBtn) {
      shareBtn.addEventListener("click", share);
    }
    document.getElementById("saveBtn")?.addEventListener("click", () => {
      save();
    });
    document.getElementById("addBtn")?.addEventListener("click", () => {
      add();
    });
  });
  const share = () => {
    console.log("share");
    // 这里可以添加分享的逻辑
  };
  const save = () => {
    // 这里可以添加保存的逻辑
    console.log("保存成功！");
  };
  const add = () => {
    // 这里可以添加添加的逻辑
    if (mapTranRef) {
      mapTranRef.value = { ...item, timestamp: Date.now() };
    }
    console.log("添加成功！");
  };
  return infoWindow;
}
