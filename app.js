import Util from './utils/util.js';

/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat.js')

/**
 * Douban API 模块
 * @type {Object}
 */
const douban = require('./utils/douban.js')

/**
 * Baidu API 模块
 * @type {Object}
 */
const baidu = require('./utils/baidu.js')

/**
 * 版本号
 */
const version = {
  versionName: '1.0.0'
};

App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: 'Douban Movie',
    version: '0.1.0',
    currentCity: '呼和浩特'
  },

  globalData: {
    version,
    userInfo: null,
    setting: {},
    windowWidth: 0,
    windowHeight: 0,
    doubanBase: "https://douban.uieee.com",
    inTheaters: "/v2/movie/in_theaters",
    comingSoon: "/v2/movie/coming_soon",
    top250: "/v2/movie/top250",
    weekly: "/v2/movie/weekly",
    usBox: "/v2/movie/us_box",
    newMovies: "/v2/movie/new_movies",
    subject: "/v2/movie/subject/",
    celebrity: "/v2/movie/celebrity/",
    search: "/v2/movie/search?q=",
    setting: {}
  },

  /**
   * WeChat API
   */
  wechat: wechat,

  /**
   * Douban API
   */
  douban: douban,

  /**
   * Baidu API
   */
  baidu: baidu,

  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch() {
    wechat
      .getLocation()
      .then(res => {
        const {
          latitude,
          longitude
        } = res
        return baidu.getCityName(latitude, longitude)
      })
      .then(name => {
        this.data.currentCity = name.replace('市', '')
        console.log(`currentCity : ${this.data.currentCity}`)
      })
      .catch(err => {
        this.data.currentCity = '北京'
        console.error(err)
      })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // demo获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    var that = this;
    // 使用设备可视宽高
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.windowWidth = res.windowWidth;
        that.globalData.windowHeight = res.windowHeight;
      }
    });
    // this.getSetting();
  },

  /**
   * mark获取用户信息
   */
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  /**
   * 退出登录
   */
  logout(callback) {
    this.globalData.userInfo = null
    callback && callback(this.globalData)
  },

  /**
   * 获取本地设置
   */
  getSetting(callback) {
    const that = this;
    const {
      setting
    } = this.globalData
    if (setting && (!Util.isEmpty(setting))) {
      typeof callback == "function" && callback(setting)
    } else {
      wx.getStorage({
        key: 'setting',
        success: function(res) {
          that.globalData.setting = res.data
          typeof callback == "function" && callback(res.data)
        }
      })
    }
  },

})