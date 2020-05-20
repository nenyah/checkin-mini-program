/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return URL参数字符串
 */
function urlEncode(param, key, encode) {
  if (param == null) return "";
  let paramStr = "";
  let t = typeof param;
  if (t == "string" || t == "number" || t == "boolean") {
    paramStr +=
      "&" +
      key +
      "=" +
      (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (let i in param) {
      let k =
        key == null
          ? i
          : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
}

function getSysteminfo() {
  return new Promise((resolve, reject) => {
    my.getSystemInfo({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
async function imageUtil(e) {
  let imageSize = {};
  let originalWidth = e.width; //图片原始宽
  let originalHeight = e.height; //图片原始高
  let originalScale = originalHeight / originalWidth; //图片高宽比

  console.log("原始宽: " + originalWidth);
  console.log("原始高: " + originalHeight);
  console.log("宽高比" + originalScale);
  let res = await getSysteminfo();
  let windowWidth = res.windowWidth * 1.1;
  let windowHeight = res.windowHeight * 1.1;
  let windowscale = windowHeight / windowWidth; //屏幕高宽比
  // 图片尺寸大于设备
  if (originalWidth > res.windowWidth || originalHeight > res.windowHeight) {
    if (originalScale < windowscale) {
      //图片高宽比小于屏幕高宽比
      //图片缩放后的宽为屏幕宽
      imageSize.imageWidth = windowWidth;
      imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
    } else {
      //图片高宽比大于屏幕高宽比
      //图片缩放后的高为屏幕高
      imageSize.imageHeight = windowHeight;
      imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
    }
  } else {
    imageSize.imageHeight = originalHeight;
    imageSize.imageWidth = originalWidth;
  }
  console.log("缩放后的宽: " + imageSize.imageWidth);
  console.log("缩放后的高: " + imageSize.imageHeight);

  return imageSize;
}

function round(num,digits) {
  return Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits);
}
module.exports = {
  urlEncode,
  imageUtil,
  round,
};
