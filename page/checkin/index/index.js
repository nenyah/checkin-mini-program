Page({
  data: {
    longitude: "120.126293",
    latitude: "30.274653",
    name: "黄龙万科中心",
    address: "宁波市公安局北仑分局交通警察大队",
    markers: [
      {
        iconPath: "/assets/images/location.png",
        id: 10,
        latitude: 30.279383,
        longitude: 120.131441,
        width: 50,
        height: 50
      }
    ]
  },
  onDmTap(e, comp) {
    dd.openLocation({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      name: this.data.name,
      address: this.data.address
    });
  },
  openLocation() {
    dd.openLocation({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      name: this.data.name,
      address: this.data.address
    });
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    my.getLocation({
      success: res => {
        console.log(res);
        this.setData({
          hasLocation: true,
          longitude: res.longitude,
          latitude: res.latitude,
          address: res.address,
          markers: [
            {
              iconPath: "/assets/images/location.png",
              id: 10,
              latitude: res.latitude,
              longitude: res.longitude,
              width: 26,
              height: 26
            }
          ]
        });
      },
      fail: () => {
        dd.alert({ title: "定位失败" });
      }
    });
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: "My App",
      desc: "My App description",
      path: "pages/index/index"
    };
  }
});
