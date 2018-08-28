/**
 * logs.js
 * 定义了logs数组，并在onLoad方法中从本地缓存中获取程序启动时间数据，
 * 之后调用数组map方法来将时间格式化为字符串
 */
const util = require('../../utils/util.js')


Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})


