// pages/item/item.js
// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    showAllDesc: false,
    movie: {},
    comments_count: 0,
    comments: [],
    isFold: true,
    hasMore: true,
    page: 1,
    size: 6,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    app.douban.findOne(params.id)
      .then(data => {

        var directorsAndCasts = [];
        for (let i in data.directors) {
          directorsAndCasts.push(data.directors[i]);
        }
        for (let j in data.casts) {
          directorsAndCasts.push(data.casts[j]);
        }
        var genres = "";
        var separate = " / ";
        for (let k in data.genres) {
          genres += data.genres[k] + separate;
        }
        genres = genres.substring(0, genres.length - separate.length);
        var countries = "国家：";
        for (let g in data.countries) {
          countries += data.countries[g] + separate;
        }
        countries = countries.substring(0, countries.length - separate.length);

        this.setData({
          id: data.id,
          title: data.title,
          movie: data,
          originalTitle: "原名：" + data.original_title,
          directorsAndCasts: directorsAndCasts,
          collectCount: data.collect_count,
          commentsCount: data.comments_count,
          reviewsCount: data.reviews_count,
          countries: countries,
          doCount: data.do_count,
          genres: genres,
          rating: data.rating,
          ratingsCount: data.ratings_count + "人评价",
          subtype: data.subtype,
          summary: data.summary,
          shareUrl: data.share_url,
          year: data.year,
        })
        wx.setNavigationBarTitle({
          title: '电影详情：' + data.title
        })
        wx.hideLoading()
      })
      .catch(e => {
        this.setData({ title: '获取数据异常', movie: {} })
        console.error(e)
        wx.hideLoading()
      })

    this.loadMore(params.id);
    this.getComments(params.id);
  },

  /** 查看海报 */
  bindPoster: function (event) {
    var posterUrl = event.currentTarget.dataset.posterUrl;
    wx.navigateTo({
      url: '/pages/movie/movie-poster/movie-poster?posterUrl=' + posterUrl
    });
    console.log(posterUrl)
  },

  /** 展开简介   */
  handleExtensiontap: function (event) {
    var readyData = {
      "showAllDesc": true
    };
    this.setData(readyData);
  },



  /** 查看影人信息 */
  handleCelebrity: function (event) {
    var id = event.currentTarget.dataset.id;
    var avatar = event.currentTarget.dataset.avatar;
    wx.redirectTo({
      url: '/pages/movie/celebrity/celebrity?id=' + id + "&&avatar=" + avatar
    });
    console.log(id + '////' + avatar)
  },


  /**
   * 获取影视短评
   */
  getComments: function (id) {

    // app.douban.getComments(id,)
    //   .then(data => {
    //     this.setData({
    //       comments: data.comments
    //     })
    //   }
    //   )

  },

  /**
    * 自定义函数
    * 现实加载过程状态
    */
  loadMore(id) {
    if (!this.data.hasMore) return

    wx.showLoading({ title: '拼命加载中...' })
    this.setData({ subtitle: '加载中...' })

    return app.douban.getComments(id, this.data.page++, this.data.size)
      .then(d => {
        if (d.total > 0) {
          this.setData({ comments: d.comments, hasMore: true })
          d.total -= 1
        } else {
          this.setData({ subtitle: d.comments, hasMore: false })
        }
        wx.hideLoading()
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常' })
        console.error(e)
        wx.hideLoading()
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ comments: [],id:Object.id,page: 1, hasMore: true })
    this.loadMore(id)
      .then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (params) {
      //  this.loadMore()

  },

  onUnload: function () {
    // 页面关闭
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      desc: this.data.title,
      path: '/pages/item?id=' + this.data.id
    }
  },

  /**
    * 剧照预览
    */
  onImagePre(e) {
    const { img } = e.currentTarget.dataset;
    const { movie } = this.data;
    let urls = [];
    for (let item of movie.photos) {
      urls.push(item.image)
    }
    wx.previewImage({
      current: img,
      urls
    })
  }
})