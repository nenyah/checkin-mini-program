import { getClients, getClientslabels } from "../../../service/clients.js";
const itemsMine = [
  {
    id: 0,
    thumbContent: "未激活",
    extraText: "邬顶立 负责",
    name: "宁波第一医院-系统测试",
  },
  {
    id: 1,
    thumbContent: "未激活",
    extraText: " 李丽 负责",
    name: "宁波第一医院-系统测试",
  },
  {
    id: 2,
    thumbContent: "未激活",
    extraText: "李丽 负责",
    name: "宁波第二医院-系统测试",
  },
];
const custCate = [itemsMine];
Page({
  data: {
    tabs: [
      {
        title: "我负责的",
        subTitle: "",
        number: "0",
      },
      {
        title: "共享给我的",
        subTitle: "",
        number: "1",
      },
      {
        title: "全公司的",
        subTitle: "",
        number: "2",
      },
      {
        title: "无人负责的",
        subTitle: "",
        number: "3",
      },
    ],
    activeIndex: 0,
    items: [],
    numClients: 0,
    hasContentHeight: false,
    show: true,
    current: 0,
    pages: 1,
    noMore: false,
    loadingFailed: false,
    orgName: "",
  },
  onLoad() {
    this._getClients();
  },

  goToCate() {
    my.navigateTo({
      url: "/page/checkin/customer-cate/customer-cate",
    });
  },
  handleTabClick({ index, tabsName }) {
    console.log("handleTabeClick", { index, tabsName });
    const items = custCate[index];
    const numClients = items.length;
    this.setData({
      activeIndex: index,
      items,
      numClients,
    });
  },
  handleTabChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  onItemClick(e) {
    console.log("客户页面选择客户", e);
    // 把选择的客户传回首页
    const item = e.target.dataset.item;
    my.setStorage({
      key: "selectedClient",
      data: item,
      success: () => {
        my.navigateBack({
          delta: 1,
        });
      },
    });
  },

  handleClear(e) {
    console.log("clear", e);
  },
  handleFocus(e) {
    this.setData({
      show: !this.data.show,
    });
  },
  handleBlur(e) {
    this.setData({
      show: !this.data.show,
    });
  },
  handleCancel(e) {},
  handleSubmit(e) {
    this.setData({
      orgName: e,
      current: 0,
      items: [],
    });

    this._getClients();
  },
  upper(e) {
    console.log("向上", e);
  },
  lower(e) {
    console.log("向下", e);
    this._getClients();
  },
  scroll(e) {
    if (e.detail.scrollTop > 100) {
      this.setData({
        navShow: true,
      });
    } else {
      this.setData({
        navShow: false,
      });
    }
  },

  _getClients() {
    const current = this.data.current + 1;
    const pages = this.data.pages;
    const orgName = this.data.orgName;
    if (current > pages) {
      this.setData({
        noMore: true,
      });
    }
    getClients({ current, orgName })
      .then((res) => {
        console.log("获取客户信息", res);
        let oldItems = this.data.items;
        const items = oldItems.concat(res.records);
        const numClients = res.total;
        const pages = res.pages;
        this.setData({
          items,
          current: current,
          numClients,
          pages,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setData({
          loadingFailed: true,
        });
      });
  },
});
