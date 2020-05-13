import { getAround } from "/libs/amap-dd";
var app = getApp();
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
        height: 38,
      },
    ],
    controls: [
      {
        id: 5,
        iconPath: "/assets/images/fix_location.png",
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50,
        },
        clickable: true,
      },
    ],
    search: false,
  },
  onLoad() {
    const { longitude, latitude } = this._getCurrentLocation(),
      radius = app.globalData.limitRange;
    this._getAround({ longitude, latitude, radius });
  },
  onReady() {},
  // 移动地图，获取地图中心坐标，并重新获取周边地址
  regionchange(e) {
    console.log("移动地图操作了", e);
    this.setData({
      "markers[0].latitude": e.latitude,
      "markers[0].longitude": e.longitude,
    });
    const longitude = e.longitude;
    const latitude = e.latitude;
    if (e.longitude) {
      this._getAround({ longitude, latitude });
    }
  },
  // 确认选择
  comfirm() {
    const selectItem = this.data.items.filter((el) => el.selected === true)[0];
    console.log("选择地址：", selectItem);

    const address = selectItem.brief,
      location = selectItem.location.split(","),
      name = selectItem.title;
    app.globalData.selectedLocation = {
      longitude: Number(location[0]),
      latitude: Number(location[1]),
      name,
      address,
    };

    my.navigateBack();
  },
  onSearchItemClick(e) {
    // console.log(e);
    let items = [e.target.dataset.item];
    items[0].selected = true;
    this.setData({
      items,
      search: !this.data.search,
    });
  },
  // 选择地址
  onItemClick(e) {
    const index = e.index;
    this._chooseItem(index);
  },
  // 控制点
  /**
   *@function 回到初始点
   *
   * @param {*} e
   */
  controltap(e) {
    if (this.data.items.length < this.data.searchItems.length) {
      this.setData({
        items: this.data.searchItems,
      });
    }
    this._getCurrentLocation();
    this._chooseItem(0);
  },
  changeToSearch() {
    const search = !this.data.search;
    console.log(search);
    this.setData({
      search,
    });
  },
  /**
   *@function 确定搜索地址
   *
   * @param {*} e
   */
  handleSubmit(e) {
    console.log("submit", e);
    const searchItems = this.data.items.filter((el) => el.title.includes(e));
    this.setData({
      searchItems,
    });
  },
  /**
   *@function 获取钉钉定位周边地址
   *
   * @param {*} opt
   */
  _getAround(opt) {
    getAround(opt)
      .then((res) => {
        const regeocode = res.regeocode;
        const addressComponent = regeocode.addressComponent;
        const town = `${addressComponent.province}${addressComponent.city}${addressComponent.district}${addressComponent.township}`;
        const items = regeocode.pois.map((item, index) => {
          return {
            index: index,
            title: item.name,
            brief: `${town}${item.address}`,
            location: item.location,
            selected: index === 0 ? true : false,
          };
        });
        this.setData({
          items,
        });
      })
      .catch((err) => console.error(err));
  },
  /**
   *@function 回到初始位置
   *
   * @returns
   */
  _getCurrentLocation() {
    const longitude = app.globalData.location.longitude;
    const latitude = app.globalData.location.latitude;
    this.setData({
      "markers[0].longitude": longitude,
      "markers[0].latitude": latitude,
      location: [longitude, latitude],
    });
    return { longitude, latitude };
  },
  /**
   *@function 选择地址
   *
   * @param {*} index
   */
  _chooseItem(index) {
    const items = this.data.items;
    const [longitude, latitude] = items[index].location.split(",");
    items.forEach((el) => {
      if (el.index == index) {
        el.selected = true;
      } else {
        el.selected = false;
      }
    });
    this.setData({
      items,
      "markers[0].longitude": longitude,
      "markers[0].latitude": latitude,
    });
  },
});
