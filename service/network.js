import {
  timeout,
  Adminuserpermission
} from '/config/api.js'

function request(options) {
  dd.showLoading({
    title: '数据加载中ing',
  })

  return new Promise((resolve, reject) => {
    dd.httpRequest({
      url: options.url,
      timeout: timeout,
      method: options.method || 'GET',
      data: options.data || {},
      headers: options.headers,
      success: (res) => {
        console.log("network success")
        console.log(res)
        if (res.status == 200) {
          if (res.data.code == 401) {
            console.log("没有登录")
            // 检查是否登录,没有登录跳转到登录页
            dd.redirectTo({
              url: '/pages/auth/login/login',
              success() {
                dd.showToast({
                  content: '没有登录，请登录'
                })
              }
            })
          }
          else {
            resolve(res.data)
          }

        }

      },
      fail: function(err) {
        reject(err)
      },
      complete: res => {
        dd.hideLoading()
      }
    })
  })
}

export default request;