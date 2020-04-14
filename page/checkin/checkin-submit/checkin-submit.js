import { getStorage } from "../../../service/storage.js";
import { formatDate } from "/util/utils.js";
Page({
  data: {
    checkinTime: "00:00",
    address:
      "宁波市公安局北仑分局交通警察大队大碶中队，浙江省宁波北仑大碶华东宁波医药公司",
    visitsPerson: "",
    picUrls: [
      "/image/fake1.jpg",
      "/image/fake1.jpg",
      "/image/fake1.jpg",
      "/image/fake1.jpg",
      "/image/fake1.jpg",
      "/image/fake1.jpg",
      "/image/fake1.jpg",
      "/image/fake1.jpg",
      "/image/fake1.jpg"
    ],
  },
  onLoad(query) {
    // 页面加载
    console.info(
      `Checkin-submit Page onLoad with query: ${JSON.stringify(query)}`
    );
    console.log(query);
    getStorage({ key: "checkInDate" })
      .then(res => {
        const ctime = formatDate(new Date(res.data.date), "hh:mm");
        this.setData({
          visitsPerson: query.visitsPerson,
          checkinTime: ctime
        });
      })
      .then(() => {
        getStorage({ key: "location" }).then(res => {
          this.setData({
            address: res.data.address
          });
        });
      });
  },
  useCamera() {
    my.chooseImage({
      count: 1,
      sourceType: ["camera"],
      success: res => {
        console.info(res);
        // 打水印
        // dd.getImageInfo({
        //   src: res.filePaths[0],
        //   success: res => {
        //     console.log(JSON.stringify(res));
        //   }
        // });
        let picUrls = this.data.picUrls;
        picUrls.push(res.filePaths[0]);
        this.setData({
          picUrls
        });
      }
    });
  },
  // 移除图片
  removePic(e) {
    const index = e.target.dataset.index
    let picUrls = this.data.picUrls
    picUrls.splice(index,1)

    this.setData({
      picUrls
    });
  },
  // 预览图片
  previewPic(e){
    console.log(e)
    const src = e.target.dataset.src
    my.previewImage({
      urls: [src]
    });
  },
});
