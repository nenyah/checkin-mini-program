function request(opt) {
  dd.showLoading({
    title: "数据加载中ing"
  });

  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: opt.url,
      timeout: 5000,
      method: opt.method || "GET",
      data: opt.data || {},
      headers: opt.header,
      success: res => {
        console.log("network success");
        console.log(res);
        resolve(res.data);
      },
      fail: function(err) {
        reject(err);
      },
      complete: res => {
        dd.hideLoading();
      }
    });
  });
}
function getAround(opt) {
  return request({
    url: "https://restapi.amap.com/v3/place/around",
    data: {
      key:"78afced4810e78fef4e60c9be330ca06",
      location: `${opt.longtitude},${opt.latitude}`,
      radius:opt.radius||500,
    },
    method: "GET",
    header: { "content-type": "application/json" }
  })
}

module.exports={
  getAround
}