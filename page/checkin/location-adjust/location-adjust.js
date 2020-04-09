
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
  },
  onLoad() {
    if (my.getLocation) {
      this._getLocation();
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样提示
      my.alert({
        title: "提示",
        content: "当前支付宝版本过低，无法使用此功能，请升级最新版本支付宝"
      });
    }
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
  }
});
