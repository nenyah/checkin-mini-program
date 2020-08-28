import {companyName, markers} from "/config/api"
import {getConfig} from "/service/config"
import {getLocation} from "/service/location"
import {getRecord} from "/service/record"
import {handleError} from "/service/network"
import utils from "/util/utils"

let app = getApp()

Page({
  data: {
    markers: markers,
    client: "",
    ctime: "",
    company: companyName,
    checkTimes: 0,
    location: "",
    selectLocation: "",
  },

  onLoad() {
    console.log("首页加载")
    // 初始化事件监听器
    this.initEventListener()
    this._getOriLocation()
    if (
      dd.canIUse("createMapContext") &&
      dd.canIUse("createMapContext.object.showsCompass")
    ) {
      console.log("createMapContext 可用")
      this.mapCtx = dd.createMapContext("map")
      this.mapCtx.showsCompass({isShowsCompass: 0})
    } else {
      console.log("createMapContext 不可用")
    }
  },
  onReady() {
  },
  onShow() {
    // 页面显示
    console.log("首页显示")
    // 获取当前时间
    this._getCurrentTime()
    this._getOriLocation()
    this._showLocation()
    this._getClient()
  },
  onUnload() {
    console.log("首页卸载")
    app.emitter.removeListener("refresh", this.handleEvent, this)
  },
  /**
   * 显示版本号
   */
  onTitleClick() {
    // 标题被点击
    utils.ddToast({text: `当前版本号为 v${app.globalData.version}`})
  },
  /**
   * 初始化事件监听器
   */
  initEventListener() {
    app.emitter.on("refresh", this.handleEvent, this)
  },
  /**
   * 事件处理
   * @param {Object} event
   */
  handleEvent(event) {
    switch (event.type) {
      case "refresh":
        this.refresh()
        break
      case "showClient":
        this._getClient()
        break
      case "showLocation":
        this._showLocation()
        break
      default:
        break
    }
  },
  /**
   * 刷新方法
   * @author Steven
   * @date 2020-06-22
   */
  refresh() {
    console.log("触发刷新")
    // 获取签到数
    this._checkRecordTimes()
    this._getCurrentTime()
  },
  /**
   * 跳转到地点微调
   *
   * @author Steven
   * @date 2020-06-22
   */
  async adjustLocation() {
    let {value} = await this._getConfig({name: "limitRange"})
    app.globalData.limitRange = 1 * value
    if (!this.data.location) {
      utils.ddToast({
        type: "fail",
        text: "请稍等，钉钉定位信息还没有获取成功！",
      })
      return
    }
    my.navigateTo({
      url:
        "../location-adjust/location-adjust?location=" +
        JSON.stringify(this.data.location),
    })
  },
  /**
   * 跳转到签到提交
   * @description 判断是否需要选择拜访对象
   * @author Steven
   * @date 2020-06-22
   * @return undefined
   */
  onSubmit() {
    const params = {
      location: this.data.location,
      client: this.data.client,
    }

    const userInfo = app.globalData.userInfo
    if (utils.isEmpty(userInfo)) {
      utils.ddToast({
        type: "fail",
        text: "请稍等，用户信息还没有获取成功！",
      })
      return
    }
    if (utils.isEmpty(this.data.location)) {
      utils.ddToast({
        type: "fail",
        text: "请稍等，位置信息还没有获取成功！",
      })
      this._getOriLocation()
      return
    }
    // 需要选择
    if (!utils.isEmpty(userInfo.selectOrg) && utils.isEmpty(this.data.client)) {
      // 没有拜访对象
      utils.ddToast({
        type: "fail",
        text: "还没有选择拜访对象哦！",
      })
      return
    }
    // 有拜访对象
    my.navigateTo({
      url: "../checkin-submit/checkin-submit?params=" + JSON.stringify(params),
    })
  },

  /**
   * 获取当日签到次数
   * @return {Promise<void>}
   * @private
   */
  async _checkRecordTimes() {
    /**
     * 1. 没有签到时，返回data为空
     * 2. 有签到时，data列表里有值
     */
    const {data, ...rest} = await getRecord({}).catch((err) => console.error(err))
    let checkTimes = data.length > 0 ? data[0].userSignCount : 0
    this.setData({
      checkTimes,
    })
  },

  /**
   * 初始定位
   * @return {Promise<void>}
   * @private
   */
  async _getOriLocation() {
    /**
     * 1. 判断app中有没有location
     * 2. 有就直接取location的值
     * 3. 无再调用api获取location并且设置app中的location
     */
    let location = app.globalData.location
    let longitude, latitude
    if (utils.isEmpty(location)) {
      location = await getLocation().catch((err) => {
        console.error(err)
        handleError(err)
      })
      // 设置globalData中location
      app.globalData.location = {
        longitude: location.longitude,
        latitude: location.latitude,
        name: location.address,
        address: location.address,
      }
    }
    longitude = utils.round(location.longitude, 6)
    latitude = utils.round(location.latitude, 6)
    this._renderLocation(location)
  },
  /**
   * 显示微调后定位信息
   * @private
   */
  _showLocation() {

    // FIXME 选择新的地址后地图图标应该改变
    let selectLocation = app.globalData.selectedLocation
    this.setData({
      selectLocation,
    })
  },

  /**
   * 获取当前时间
   * @private
   */
  _getCurrentTime() {
    const checkInDate = app.globalData.currentTime
    if (utils.isEmpty(checkInDate)) {
      return
    }
    const ctime = checkInDate.format("HH:mm")
    this.setData({
      ctime,
      checkInDate,
    })
  },

  /**
   * 从全局中获取拜访对象
   * @private
   */
  _getClient() {
    const client = app.globalData.selectedClient
    if (!client) {
      return
    }
    this.setData({
      client,
    })
  },
  /**
   * 获取配置信息
   * @param name
   * @return {Promise<unknown>}
   * @private
   */
  _getConfig({name}) {
    return getConfig({name})
  },
  /**
   * 渲染位置数据
   * @param location
   * @private
   */
  _renderLocation(location) {
    this.setData({
      location,
      "markers[0].longitude": location.longitude,
      "markers[0].latitude": location.latitude,
    })
  },
})
