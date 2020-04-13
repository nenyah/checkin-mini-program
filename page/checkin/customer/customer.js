const itemsMine = [
  {
    thumbContent: "未激活", extraText: "邬顶立 负责", mainTitle: "宁波第一医院-系统测试"
  },

]
const itemsShare = [
  {
    thumbContent: "未激活", extraText: " 李丽 负责", mainTitle: "宁波第一医院-系统测试"
  },
  {
    thumbContent: "未激活", extraText: "李丽 负责", mainTitle: "宁波第二医院-系统测试"
  },
  {
    thumbContent: "未激活", extraText: "李丽 负责", mainTitle: "宁波第三医院-系统测试"
  },
]
const itemsAll = [
  {
    thumbContent: "未激活", extraText: " 陈世明 负责", mainTitle: "宁波第一医院-系统测试"
  },
  {
    thumbContent: "未激活", extraText: "陈世明 负责", mainTitle: "宁波第二医院-系统测试"
  },
  {
    thumbContent: "未激活", extraText: "陈世明 负责", mainTitle: "宁波第三医院-系统测试"
  },
]
const itemsFree = [
]
const custCate = [itemsMine, itemsShare, itemsAll, itemsFree]
Page({
  data: {
    tabs: [
      {
        title: '我负责的',
        subTitle: '',
        number: '0',
      },
      {
        title: '共享给我的',
        subTitle: '',
        number: '1',
      },
      {
        title: '全公司的',
        subTitle: '',
        number: '2',
      },
      {
        title: '无人负责的',
        subTitle: '',
        number: '3',
      },
    ],
    activeIndex: 0,
    items: itemsMine,
    numClients: 0,
    hasContentHeight: false,
  },
  onLoad() {
    let numClients = custCate[this.data.activeIndex].length
    this.setData({
      numClients
    })
  },
  goToCate(){
    my.navigateTo({
      url: '/page/checkin/customer-cate/customer-cate'
    });
  },
  handleTabClick({ index, tabsName }) {
    console.log('handleTabeClick',{index,tabsName})
    const items = custCate[index]
    const numClients = items.length
    this.setData({
      activeIndex: index,
      items,
      numClients
    });
  },
  handleTabChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  onItemClick(e){
    console.log('客户页面选择客户',e)
    // 把选择的客户传回首页
    const item = e.target.dataset.item
    my.redirectTo({
      url: `../index/index?visitsPerson=${item.mainTitle}`
    });
  }

});
