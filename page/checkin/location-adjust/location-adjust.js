import { getAround } from "/libs/amap-dd.js";

Page({
  data: {
    items: [
      {
        index: 0,
        title: "华东宁波医药有限公司",
        brief: "浙江省宁波市北仑区大碶镇庐山西路16号",
        location: "",
        selected: true
      },
      {
        index: 1,
        title: "生工多肽生物工程(宁波)有限公司",
        brief: "浙江省宁波市北仑区大碶镇庐山西路16号5号楼",
        location: "",
        selected: false
      },
      {
        index: 2,
        title: "大浦河北路与庐山西路交叉口",
        brief: "浙江省宁波市北仑区",
        location: "",
        selected: false
      }
    ],
    hasLocation: true,
    location: [],
    markers: [
      {
        iconPath: "/assets/images/location.png",
        id: 1,
        latitude: "",
        longitude: "",
        width: 38,
        height: 38
      }
    ],
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
  onLoad() {
    dd.getStorage({
      key: "location",
      success: res => {
        console.log("获取缓存", res.data);
        const location = [res.data.longitude, res.data.latitude];
        this.setData({
          location,
          "markers[0].longitude": location[0],
          "markers[0].latitude": location[1]
        });
      },
      fail: res => {
        dd.alert({ content: res.errorMessage });
      }
    });
  },
  onReady() {
    this.mapCtx = my.createMapContext("map");
    const longitude = this.data.location[0];
    const latitude = this.data.location[1];
    console.log({ longitude, latitude });
    this._getAround({ longitude, latitude });
  },

  regionchange(e) {
    console.log("regionchange", e);
    this.setData({
      "markers[0].latitude": e.latitude,
      "markers[0].longitude": e.longitude
    });
  },
  getCenterLocation() {
    this.mapCtx.getCenterLocation(function(res) {
      console.log(res.longitude);
      console.log(res.latitude);
    });
  },

  moveToLocation() {
    this.mapCtx.moveToLocation();
  },
  // 选择地址
  onItemClick(e) {
    const index = e.index;
    const items = this.data.items;
    const [longitude, latitude] = items[index].location.split(",");
    // console.log("切换", [longitude, latitude]);
    items.forEach(el => {
      if (el.index == index) {
        el.selected = true;
      } else {
        el.selected = false;
      }
    });

    this.setData({
      items,
      'markers[0].longitude':longitude,
      'markers[0].latitude':latitude
    });
  },
  // 改变标记
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
    this.mapCtx.moveToLocation();
  },
  _getLocation() {
    dd.getLocation({
      success: res => {
        console.log("调用获取定位", res);
        this.setData({
          location: [res.longitude, res.latitude],
          // markers: markers,
          hasLocation: true
        });
      },
      fail: () => {
        dd.alert({ title: "定位失败" });
      }
    });
  },
  _getAround(opt) {
    getAround(opt)
      .then(res => {
        // console.log("获得地址", res.pois);
        let oldItems = this.data.items;
        const items = res.pois.map((item, index) => {
          return {
            index: index,
            title: item.name,
            brief: item.address,
            location: item.location,
            selected: false
          };
        });
        items.forEach(el => console.log(el));
        this.setData({
          items
        });
      })
      .catch(err => console.log(err));
  }
});
