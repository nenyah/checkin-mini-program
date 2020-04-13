const App = getApp(); //设立顶部栏高度
Page({
  data: {
    navH: ""
  },
  onLoad(options) {
    //自定义头部方法
    this.setData({
      navH: App.globalData.navHeight
    });
  },
  choosePerson() {
    dd.complexChoose({
      title: "选择查看对象", //标题
      multiple: true, //是否多选
      limitTips: "超出了", //超过限定人数返回提示
      maxUsers: 1000, //最大可选人数
      pickedUsers: [], //已选用户
      pickedDepartments: [], //已选部门
      disabledUsers: [], //不可选用户
      disabledDepartments: [], //不可选部门
      requiredUsers: [], //必选用户（不可取消选中状态）
      requiredDepartments: [], //必选部门（不可取消选中状态）
      permissionType: "xxx", //可添加权限校验，选人权限，目前只有GLOBAL这个参数
      responseUserOnly: false, //返回人，或者返回人和部门
      success: function(res) {
        console.log(res)
        /**
        {
            "selectedCount":1, //选择人数
            "users":[{"name":"xxx","avatar":"xxx","userId":"xxx"}], //返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），userId（用户工号）三个字段
            "departments":[{"id":123,"name":"xxx","count":1}] //返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
        }
        */
      },
      fail: function(err) {}
    });
  }
});
