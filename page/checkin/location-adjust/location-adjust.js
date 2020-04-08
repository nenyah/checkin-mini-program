import formatLocation from "/page/API/get-location/format-location.js";
Page({
  data: {
    items: [
      {
        index: 0,
        title: "华东宁波医药有限公司",
        brief: "浙江省宁波市北仑区大碶镇庐山西路16号",
        selected: true
      },
      {
        index: 1,
        title: "生工多肽生物工程(宁波)有限公司",
        brief: "浙江省宁波市北仑区大碶镇庐山西路16号5号楼",
        selected: false
      },
      {
        index: 2,
        title: "大浦河北路与庐山西路交叉口",
        brief: "浙江省宁波市北仑区",
        selected: false
      }
    ],
    hasLocation: false,
    location: [],
    markers: [],
    setting: {
      // 手势
      gestureEnable: 1,
      // 比例尺
      showScale: 1,
      // 指南针
      showCompass: 0,
      //双手下滑
      tiltGesturesEnabled: 1,
      // 交通路况展示
      trafficEnabled: 0,
      // 地图 POI 信息
      showMapText: 0,
      // 高德地图 logo 位置
      logoPosition: {
        centerX: 150,
        centerY: 90
      }
    },
    controls: [
      {
        id: 5,
        iconPath: "/assets/images/fix_location.svg",
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }
    ]
  },
  onReady() {
    if (!my.canIUse("createMapContext")) {
      my.alert({
        title: "客户端版本过低",
        content: "this.mapCtx.updateComponents 需要 10.1.35 及以上版本"
      });
      return;
    }
    this.mapCtx = my.createMapContext("map");
  },
  onLoad() {
    if (!my.canIUse("my.chooseLocation")) {
      my.alert({
        title: "客户端版本过低",
        content: "this.mapCtx.updateComponents 需要 10.1.35 及以上版本"
      });
      return;
    }
    this._chooseLocation();
  },
  onItemClick(e) {
    const index = e.index;
    const items = this.data.items;
    items.forEach(el => {
      if (el.index == index) {
        el.selected = true;
      } else {
        el.selected = false;
      }
    });

    this.setData({
      items
    });
  },
  changeMarkers() {
    this.setData({
      markers: [
        {
          iconPath: "/assets/images/location.png",
          id: 1,
          latitude: 21.21229,
          longitude: 113.32452,
          width: 50,
          height: 50
        }
      ],
      includePoints: [
        {
          latitude: 21.21229,
          longitude: 113.32452
        }
      ]
    });
  },
  controltap(e) {
    console.log("control tap", e);
    this._getLocation();
  },
  _getLocation() {
    dd.getLocation({
      success: res => {
        const markers = [
          {
            iconPath: "/assets/images/location.png",
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 38,
            height: 38
          }
        ];
        this.setData({
          location: [res.longitude, res.latitude],
          markers: markers
        });
      },
      fail: () => {
        dd.alert({ title: "定位失败" });
      }
    });
  },
  _chooseLocation() {
    my.chooseLocation({
      success: res => {
        console.log(JSON.stringify(res));
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          name: res.name,
          address: res.address
        });
      },
      fail: error => {
        my.alert({ content: "调用失败：" + JSON.stringify(error) });
      }
    });
  }
});
