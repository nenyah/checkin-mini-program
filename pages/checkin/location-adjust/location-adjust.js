import {getAround} from "/libs/amap-dd"
import utils from "/util/utils"

let app = getApp()
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
  onLoad(query) {
    let location = JSON.parse(query.location)
    console.log("地点微调页面", JSON.parse(query.location))
    location.longitude = utils.round(location.longitude, 6)
    location.latitude = utils.round(location.latitude, 6)
    let {longitude, latitude} = location
    const radius = app.globalData.limitRange

    this.setData({
      originLocation: location,
    })
    this._getCurrentLocation()
    this._getAround({longitude, latitude, radius})
  },
  onReady() {
  },

  /**
   * 确认选择
   */
  comfirm() {
    const selectItem = this.data.items.filter((el) => el.selected === true)[0]
    console.log("选择地址：", selectItem)

    const address = selectItem.brief,
      location = selectItem.location.split(","),
      name = selectItem.title
    app.globalData.selectedLocation = {
      longitude: Number(location[0]),
      latitude: Number(location[1]),
      name,
      address,
    }
    app.emitter.emit("refresh", {type: "showLocation"})
    my.navigateBack()
  },
  /**
   * 选择搜索项目
   * @param e
   */
  onSearchItemClick(e) {
    // console.log(e);
    let items = [e.target.dataset.item]
    items[0].selected = true
    this.setData({
      items,
      search: !this.data.search,
    })
  },
  /**
   * 选择地址
   * @param e
   */
  onItemClick(e) {
    const index = e.index
    this._chooseItem(index)
  },

  /**
   *回到初始点
   *
   * @param {*} e
   */
  controltap(e) {
    if (this.data.items.length < this.data.searchItems.length) {
      this.setData({
        items: this.data.searchItems,
      })
    }
    this._getCurrentLocation()
    this._chooseItem(0)
  },
  /**
   * 搜索
   */
  changeToSearch() {
    const search = !this.data.search
    console.log(search)
    this.setData({
      search,
    })
  },
  /**
   *确定搜索地址
   *
   * @param {*} e
   */
  handleSubmit(e) {
    console.log("submit", e)
    const searchItems = this.data.items.filter((el) => {
      if (el.title) {
        return el.title.includes(e)
      }
      return false
    })
    this.setData({
      searchItems,
    })
  },
  /**
   *获取钉钉定位周边地址
   *
   * @param {*} opt
   */
  _getAround(opt) {
    getAround(opt)
      .then((res) => {
        console.log("获取周边", res)
        const items = res.pois
          .filter((el) => typeof el.name !== "undefined")
          .map((item, index) => {
            return {
              index,
              title: item.name,
              brief: item.pname + item.cityname + item.adname + item.address,
              location: item.location,
              selected: index === 0,
            }
          })
        this.setData({
          items,
        })
      })
      .catch((err) => console.error(err))
  },
  /**
   *回到初始位置
   *
   * @returns
   */
  _getCurrentLocation() {
    const oriLocation = this.data.originLocation
    this.setData({
      "markers[0].longitude": oriLocation.longitude,
      "markers[0].latitude": oriLocation.latitude,
      location: [oriLocation.longitude, oriLocation.latitude],
    })
  },
  /**
   *选择地址
   *
   * @param {*} index
   */
  _chooseItem(index) {
    const items = this.data.items
    const [longitude, latitude] = items[index].location.split(",")
    items.forEach((el) => {
      el.selected = el.index === index
    })
    this.setData({
      items,
      "markers[0].longitude": longitude,
      "markers[0].latitude": latitude,
    })
  },
})
