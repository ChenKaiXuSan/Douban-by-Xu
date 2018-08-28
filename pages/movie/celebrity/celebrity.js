// pages/movie/movie-detail/celebrity/celebrity.js
var app = getApp();
Page({
  showAllDesc: false,
  data: {
    avatar: ""
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    var avatar = options.avatar;
    var url = app.globalData.doubanBase + app.globalData.celebrity + id;
    this.setData({ "avatar": avatar });
    this.getCelebrityData(id);
    // this.processCelebrityData(data)

   
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /** 展开简介   */
  handleExtensiontap: function (event) {
    var readyData = {
      "showAllDesc": true
    };
    this.setData(readyData);
  },
  /** 获取影人信息 */
  getCelebrityData: function (id) {
    app.douban.findCelebrity(id)
      .then(data => {
        this.processCelebrityData(data);
      })
      .catch(e => {
        this.setData({ title: '获取数据异常', movie: {} })
        console.error(e)
        wx.hideLoading()
      })
  },


  /** 组装影人数据 */
  processCelebrityData: function (data) {
    var movies = [];
    for (let idx in data.works) {
      var subject = data.works[idx].subject;
      movies.push(subject);
    }
    var temp = {
      id: data.id,
      avatars: data.avatars,
      bornPlace: data.born_place,
      gender: data.gender,
      name: data.name,
      name_en: data.name_en,
      movie: movies,
      summary: data.summary,
      birthday: data.birthday,
      professions: data.professions,
    };
    var readyData = {};
    readyData["celebrity"] = temp;
    this.setData(readyData);
  },
  /** 跳转电影详情页 */
  bindMovieDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/item/item?id=' + id
    });
  },
  /** 查看海报 */
  bindPoster: function (event) {
    var posterUrl = event.currentTarget.dataset.posterUrl;
    wx.navigateTo({
      url: '/pages/movie/movie-poster/movie-poster?posterUrl=' + posterUrl
    });
  }
})