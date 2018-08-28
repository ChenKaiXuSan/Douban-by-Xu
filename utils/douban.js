// 配置反向代理服务器解决限制问题
const URI = 'https://douban.uieee.com/v2/movie'
// 豆瓣官方限制第三方小程序对豆瓣接口的调用
// const URI = 'https://douban.com/v2/movie'
const fetch = require('./fetch')

/**
 * 抓取豆瓣电影特定类型的API
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String} type   类型，例如：'coming_soon'
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
function fetchApi (type, params) {
  return fetch(URI, type, params)
}

/**
 * 获取列表类型的数据
 * @param  {String} type   类型，例如：'coming_soon'
 * @param  {Number} page   页码
 * @param  {Number} count  页条数
 * @param  {String} search 搜索关键词
 * @return {Promise}       包含抓取任务的Promise
 */
function find (type, page = 1, count = 20, search = '') {
  const params = { start: (page - 1) * count, count: count, city: getApp().data.currentCity }
  return fetchApi(type, search ? Object.assign(params, { q: search }) : params)
    .then(res => res.data)
}

/**
 * 获取单条类型的数据
 * @param  {Number} id     电影ID
 * @return {Promise}       包含抓取任务的Promise
 */
function findOne (id) {
  return fetchApi('subject/' + id)
    .then(res => res.data)
}

/***
 * 获取影人类型的数据
 * @param {Number} id      影人ID
 * @return {Promise}       包含抓取任务的Promise
 */
function findCelebrity(id) {
  return fetchApi('celebrity/' + id)
    .then(res => res.data)
}

/***
 * 获取电影查询信息的数据
 * @param {String} value      电影名称
 * @return {Promise}       包含抓取任务的Promise
 */
function findSearch(value){
  return fetchApi('search?q=' + value + "&&start=0&&count=10")
    .then(res => res.data)
}

/***
 * 获取电影短评的数据
 * @param {Number} id      电影ID
 * @return {Promise}       包含抓取任务的Promise
 */
function getComments(id ,start=1, count=100 ){
  const params = { start: (start - 1) * count, count: count}
  return fetchApi('subject/' + id + '/comments', {start: params.start, count: params.count })
    .then(res => res.data)
}

module.exports = { find, findOne, findCelebrity, findSearch, getComments }
