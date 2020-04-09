const ApiRootUrl = 'http://www2.huadongbio.com:8093/api/'

module.exports = {

  Adminuserpermission: ApiRootUrl + 'admin/user/permission', //获取用户菜单列表和权限
  Userinfo: ApiRootUrl + 'admin/info', //获取用户信息和授权

  timeout: 5000, // 超时

};
