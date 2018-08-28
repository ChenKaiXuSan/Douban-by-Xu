// 个人中心

//获取应用实例
var app = getApp()

Page({

  data: {
    version: app.globalData.version,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 进入个人资料
   */
  bindViewTap: function() {
    const that = this;
    const {
      version,
      config
    } = app.globalData;
    if (app.globalData.userInfo) {
      // if (version.versionCode > config.get('newestVersion')) return;
      wx.navigateTo({
        url: '../userinfo/userinfo'
      })
    } 
  },

  onLoad: function() {
    var _this = this

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  // demo方法
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 去设置
   */
  toSetting: function() {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },

  /**
   * 退出登录
   */
  logout: function() {
    wx.showModal({
      content: '确定要退出？',
      success: (res) => {
        res.confirm && app.logout(() => {
          this.setData({
            userInfo: {},
            hasUserInfo: false,
          })
        })
      }
    })
  },

  /**
   * 关于
   */
  toAbout: function() {
    const {
      version,
      config
    } = app.globalData;
    if (version.versionCode <= config.get('newestVersion'))
      wx.navigateTo({
        url: './../about/index',
      })
  },

  /**
   * 转发
   */
  onShareAppMessage: function(opt) {
    return {
      title: "好用得不得了",
      path: "/pages/discovery/discovery",
      imageUrl: "http://xpic.588ku.com/figure/00/00/00/08/56/5355a15b1f68dfd.jpg!/fw/800",
      success: res => {
        console.log("成功", res);
      },
      complete: res => {
        console.log("完成", res);
      }
    };
  },


  /**
   * 作出评价
   */
  toEvalute() {
    wx.navigateTo({
      url: './../evaluate/evaluate',
    })
  },

  /**
   * 客服按钮监听
   */
  onContactTap() {
    wx.setClipboardData({
      data: '浪里个儿浪 浪里个儿浪 我要调戏你了',
    })
  },

  /***
   * 启动日志按钮
   */
  toLog: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
})