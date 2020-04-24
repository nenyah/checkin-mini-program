import { getClientslabels } from "../../../service/clients";
Page({
  data: {
    title: "查看指定员工",
    extra: "选择",
    arrow: true,
    labels: [
      {
        cate: "类型",
        tag: ["客户", "渠道商", "供应商", "合作伙伴", "面试人员", "其他类型"],
      },
      { cate: "级别", tag: ["一般", "重要", "核心"] },
      { cate: "状态", tag: ["潜在", "意向", "洽谈", "成交", "流失"] },
    ],
    show: true,
    className: ["color-green", "color-yellow", "color-primary"],
    randomColor: [],
    cates:[],
  },
  onLoad() {
    let cateLen = this.data.labels.length;
    let colorArr = this.data.className;
    let colorLen = colorArr.length;
    let randomColor = [];
    do {
      let random = colorArr[Math.floor(Math.random() * colorLen)];
      randomColor.push(random);
      colorLen--;
    } while (colorLen > 0);

    this.setData({
      randomColor,
    });
    this._getClientsLabel()
  },

  handleCallBack(e) {
    console.log("筛选页面", e);
    // TODO: 筛选客户类型

    // my.navigateTo({
    //   url: `./customer/customer?cateId=${e.id}`,
    // });
    my.navigateBack({
      delta: 1,
    });
  },
  toggleFilter() {
    this.setData({
      show: !this.data.show,
    });
  },
  _getClientsLabel() {
    getClientslabels().then((res) => {
      console.log("获取客户标签信息", res);
      this.setData({
        cates:res
      })
    });
  },
});
