import { getAround } from "/libs/amap-dd.js";
import { getStorage } from "/service/storage.js";

Page({
  data: {
    items: [],
    searchItems: [],
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
    ],
    search: false
  },
  onLoad() {
    this._getStroge("location"); 
  },
  onReady() {
    this.mapCtx = my.createMapContext("map");
    const longitude = this.data.location[0];
    const latitude = this.data.location[1];
    this._getAround({ longitude, latitude });
  },
  // 移动地图，获取地图中心坐标，并重新获取周边地址
  regionchange(e) {
    this.setData({
      "markers[0].latitude": e.latitude,
      "markers[0].longitude": e.longitude
    });
    const longitude = e.longitude;
    const latitude = e.latitude;
    this._getAround({ longitude, latitude });
  },
  // 确认选择
  comfirm() {
    const selectItem = this.data.items.filter(el => el.selected === true)[0];

    const address = selectItem.title;
    const location = selectItem.location.split(",");
    // console.log("location", location);
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
    my.switchTab({
      url: `../index/index`
    });
  },
  onSearchItemClick(e) {
    // console.log(e);
    let items = [e.target.dataset.item];
    items[0].selected = true;
    this.setData({
      items,
      search: !this.data.search
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

  controltap(e) {
    console.log("control tap", e);
    this.mapCtx.moveToLocation();
  },
  changeToSearch() {
    let search = !this.data.search;
    console.log(search);
    this.setData({
      search
    });
  },
  handleSubmit(e) {
    console.log("submit", e);
    const searchItems = this.data.items.filter(el => el.title.indexOf(e) > 0);
    this.setData({
      searchItems
    });
  },
  _getAround(opt) {
    getAround(opt)
      .then(res => {
        let regeocode = res.regeocode;
        let addressComponent = regeocode.addressComponent;
        let town = `${addressComponent.province}${addressComponent.city}${addressComponent.district}${addressComponent.township}`;
        const items = regeocode.pois.map((item, index) => {
          return {
            index: index,
            title: item.name,
            brief: `${town}${item.address}`,
            location: item.location,
            selected: index === 0 ? true : false
          };
        });
        this.setData({
          items
        });
      })
      .catch(err => console.log(err));
  },
  _getStroge(key) {
    getStorage(key).then(res => {
      const location = [res.data.longitude, res.data.latitude];
      this.setData({
        location,
        "markers[0].longitude": location[0],
        "markers[0].latitude": location[1]
      });
    });
  }
});
