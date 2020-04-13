import { getAround } from "/libs/amap-dd.js";

Page({
  data: {
    items: [],
    hasLocation: false,
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
        iconPath: "/assets/images/fix_location.png",
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
        // console.log("获取缓存", res.data);
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
    // console.log({ longitude, latitude });
    this._getAround({ longitude, latitude });
  },

  regionchange(e) {
    // console.log("regionchange", e);
    this.setData({
      "markers[0].latitude": e.latitude,
      "markers[0].longitude": e.longitude
    });
  },
  // 确认选择
  comfirm() {
    const selectItem = this.data.items.filter(el => el.selected === true)[0];
    
    const address = selectItem.title;
    const location = selectItem.location.split(',');
    console.log('location',location)
    dd.setStorage({
      key: "location",
      data: {
        longitude: Number(location[0]),
        latitude: Number(location[1]),
        address: address
      },
      success: function() {
        // console.log("写入成功");
      }
    });
    my.redirectTo({
      url: `../index/index`
    });
  },

  // 选择地址
  onItemClick(e) {
    const index = e.index;
    const items = this.data.items;
    const [longitude, latitude] = items[index].location.split(",");
    items.forEach(el => {
      if (el.index == index) {
        el.selected = true;
      } else {
        el.selected = false;
      }
    });

    this.setData({
      items,
      "markers[0].longitude": longitude,
      "markers[0].latitude": latitude
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
  // _getLocation() {
  //   dd.getLocation({
  //     success: res => {
  //       console.log("调用获取定位", res);
  //       this.setData({
  //         location: [res.longitude, res.latitude]
  //       });
  //     },
  //     fail: () => {
  //       dd.alert({ title: "定位失败" });
  //     }
  //   });
  // },
  _getAround(opt) {
    getAround(opt)
      .then(res => {
        // console.log("获得地址", res.regeocode);
        let regeocode = res.regeocode;
        let addressComponent = regeocode.addressComponent;
        let town = `${addressComponent.province}${addressComponent.city}${addressComponent.district}${addressComponent.township}`;
        // console.log(town);
        const items = regeocode.pois.map((item, index) => {
          return {
            index: index,
            title: item.name,
            brief: `${town}${item.address}`,
            location: item.location,
            selected: index === 0 ? true : false
          };
        });
        // items.forEach(el => console.log(el));
        this.setData({
          items
        });
      })
      .catch(err => console.log(err));
  }
});
