/**
 *
 *转码url
 * @param {*} param 将要转为URL参数字符串的对象
 * @param {string} key URL参数字符串的前缀
 * @param {string} encode true/false 是否进行URL编码,默认为true
 * @returns {string} 转码后url
 */
function urlEncode(param, key, encode) {
  if (param == null) return ""
  let paramStr = ""
  let t = typeof param
  if (t === "string" || t === "number" || t === "boolean") {
    paramStr +=
      "&" +
      key +
      "=" +
      (encode == null || encode ? encodeURIComponent(param) : param)
  } else {
    for (let i in param) {
      let k =
        key == null
          ? i
          : `${key}${param instanceof Array ? `[${i}]` : `.${i}`}`
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}

/**
 *合并url和query参数
 *
 * @param {string} url url地址
 * @param {object} params 参数
 * @returns {string} url地址
 */
function formatUrl(url, params) {
  if (!params) {
    return url
  }
  let _url = url + "?"
  for (let key in params) {
    _url += `${key}=${params[key]}&`
  }
  return _url.substr(0, _url.length - 1)
}

/**
 *暂停函数
 *
 * @param {number} duration 停顿时间
 * @returns
 */
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

/**
 *获取系统信息
 *
 * @returns {Promise}
 */
function getSysteminfo() {
  return new Promise((resolve, reject) => {
    my.getSystemInfo({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * 根据比例计算压缩后的图片宽高
 *
 * @param {object} e 图片原始宽高
 * @returns {object} 图片转换后宽高
 */
async function imageUtil(e) {
  let imageSize = {}
  let originalWidth = e.width //图片原始宽
  let originalHeight = e.height //图片原始高
  let originalScale = originalHeight / originalWidth //图片高宽比

  console.log("原始宽: " + originalWidth)
  console.log("原始高: " + originalHeight)
  console.log("宽高比" + originalScale)
  let res = await getSysteminfo()
  let windowWidth = res.windowWidth * 0.6
  let windowHeight = res.windowHeight * 0.6
  let windowscale = windowHeight / windowWidth //屏幕高宽比
  // 图片尺寸大于设备
  if (originalWidth > res.windowWidth || originalHeight > res.windowHeight) {
    if (originalScale < windowscale) {
      //图片高宽比小于屏幕高宽比
      //图片缩放后的宽为屏幕宽
      imageSize.imageWidth = windowWidth
      imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth
    } else {
      //图片高宽比大于屏幕高宽比
      //图片缩放后的高为屏幕高
      imageSize.imageHeight = windowHeight
      imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight
    }
  } else {
    imageSize.imageHeight = originalHeight
    imageSize.imageWidth = originalWidth
  }
  console.log("缩放后的宽: " + imageSize.imageWidth)
  console.log("缩放后的高: " + imageSize.imageHeight)

  return imageSize
}

/**
 *保留浮点数小数位
 *
 * @param {number} num 要转换的浮点数
 * @param {number} digits 要保留的小数位
 * @returns {number} 转换后的浮点数
 */
function round(num, digits) {
  return Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits)
}

/**
 *全局toast
 *
 * @param {{type:string,text:string,interval:number}} { type, text, interval }
 */
function ddToast({type, text, interval}) {
  my.showToast({
    type: type,
    content: text,
    duration: interval,
  })
}

/**
 *
 *判断为空
 * @param {*} v 任意参数
 * @returns {boolean} true/false
 */
function isEmpty(v) {
  switch (typeof v) {
    case "undefined":
      return true
    case "string":
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0) return true
      break
    case "boolean":
      if (!v) return true
      break
    case "number":
      if (0 === v || isNaN(v)) return true
      break
    case "object":
      if (null === v || v.length === 0) return true
      for (var i in v) {
        return false
      }
      return true
  }
  return false
}

/**
 * 去抖函数
 */
function debounce(func, delay) {
  let timer
  return function () {
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay || 1000)
  }
}

module.exports = {
  urlEncode,
  imageUtil,
  round,
  ddToast,
  isEmpty,
  debounce,
}
