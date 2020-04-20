import { watermark } from "/util/watermark.js";
import { request } from "../../service/network.js";
import { CheckInRecord } from "../../config/api.js";
const markers = [
  {
    id: 10,
    latitude: 30.279383,
    longitude: 120.131441,
    width: 50,
    height: 50,
    callout: {
      content: "callout",
    },
  },
];

const includePoints = [
  {
    latitude: 30.279383,
    longitude: 120.141461,
  },
];
Page({
  data: {
    scale: 14,
    longitude: 120.131441,
    latitude: 30.279383,
    markers,
    includePoints,

    controls: [
      {
        id: 5,
        iconPath: "/assets/images/fix_location.png",
        position: {
          left: 5,
          top: 300 - 50,
          width: 38,
          height: 38,
        },
        clickable: true,
      },
    ],
  },
  onLoad(options) {
    //自定义头部方法
    watermark("canvas", "/assets/images/fake1.jpg");
    console.log(JSON.stringify({ userid: "NB1466" }));
    
    request({
      url: CheckInRecord,
      method: "POST",
      data: JSON.stringify({ userid: "NB1466" }),
    }).then(res=>{
      console.log('成功返回',res);

      
    }).catch(err=>{
      console.log('失败返回',err);
      
    })
  },
});
