import {getClients} from "/service/clients"
import {defaltItems} from "/config/api"

let app = getApp()

Page({
  data: {
    activeIndex: 0,
    items: defaltItems,
    searchItems: [],
    numClients: 0,
    hasContentHeight: false,
    show: true,
    current: 0,
    pages: 1,
    noMore: false,
    loadingFailed: false,
    orgName: "",
    timer: null,
  },
  onLoad() {
    this._getClients()
  },

  onItemClick(e) {
    // 把选择的客户传回首页
    app.globalData.selectedClient = e.target.dataset.item
    app.emitter.emit("refresh", {type: "showClient"})
    my.switchTab({
      url: "/pages/checkin/index/index",
    })
  },
  expand(e) {
    const index = e.currentTarget.dataset.index,
      orgId = e.currentTarget.dataset.orgid
    this.setData({
      [`items[${index}].expand`]: !this.data.items[index].expand
    })
  },
  handleClear(e) {
    console.log("clear", e)
  },
  handleFocus(e) {
    this.setData({
      show: !this.data.show,
    })
  },
  handleBlur(e) {
    this.setData({
      show: !this.data.show,
    })
  },
  handleInput(e) {
    console.log(e)
    this.setData({
      orgName: e,
      current: 0,
    })
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => { //箭头函数 注意this
      // 在这里进行我们的操作  这样就不会频繁的进行我们这里面的操作了
      getClients({orgName: e}).then(res => {
        console.log("搜索内容 ", res)
        this.setData({
          searchItems: res.data
        })
      })
    }, 2000)
  },
  handleCancel(e) {
    console.log("取消", e)
  },
  handleSubmit(e) {
    console.log("提交", e)
  },
  upper(e) {
    console.log("向上", e)
  },
  /**
   * 向下
   * @param e
   */
  lower(e) {
    console.log("向下", e)
    let items = this.data.items
    this._setDefalutFalse(items)
    this._getClients()
  },
  /**
   * 滚动
   * @param e
   */
  scroll(e) {
    if (e.detail.scrollTop > 100) {
      this.setData({
        navShow: true,
      })
    } else {
      this.setData({
        navShow: false,
      })
    }
  },
  /**
   * 获取客户
   * @private
   */
  _getClients() {
    const current = this.data.current + 1
    const pages = this.data.pages
    const orgName = this.data.orgName
    if (current > pages) {
      this.setData({
        noMore: true,
      })
    }
    getClients({current})
      .then(({data, total: numClients}) => {
        let items = [...this.data.items, ...(data)]

        this._setDefalutFalse(items)
        let pages = (1 * numClients / 10).toFixed(0)
        this.setData({
          current: current,
          numClients,
          pages,
        })
      })
      .catch((err) => {
        console.error(err)
        this.setData({
          loadingFailed: true,
        })
      })
  },
  /**
   * 设置默认expand
   * @param {array<object>} items 客户项目
   * @private
   */
  _setDefalutFalse(items) {
    items.forEach((element) => {
      element.expand = false
      return element
    })
    this.setData({
      items,
    })
  },
})
