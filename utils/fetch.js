/**
 * 使用fetch高效地进行网络请求
 * 抓取远端API的结构
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String} api    api 根地址
 * @param  {String} path   请求路径
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */

/**
 * Promise 对象用于一个异步操作的最终完成（或失败）及其结果值的表示。
 * 简单点说，它就是用于处理异步操作的，异步处理成功  了就执行成功的操作，异步处理失败了就捕获错误或者停止后续操作。
 * https://segmentfault.com/a/1190000011652907
 */

// module.exports暴露接口
// 匿名函数
module.exports = function (api, path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      // 开发者服务器接口地址
      url: `${api}/${path}`,
      // 请求的参数
      data: Object.assign({}, params),
      // 设置请求header
      header: { 'Content-Type': 'json' },
      // 收到开发者服务成功返回的回调函数
      success: resolve,
      // 接口调用失败的回调函数
      fail: reject
    })
  })
}
