// var amapFile = require('/libs/amap-wx.js');
// import { AMapWX } from "/libs/amap-wx.js";
import { getAround } from "/libs/amap-dd.js";
var markersData = [];
Page({
  data: {
    markers: [],
    latitude: "",
    longitude: "",
    textData: {}
  },
  onLoad() {
    getAround({longtitude:121.811961,latitude:29.907517})
  },
  showMarkerInfo: (data, i)=> {
    this.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  }
});
