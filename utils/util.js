/**
 * 格式化时间
 * @param  {Datetime} source 时间对象
 * @param  {String} format 格式
 * @return {String}        格式化过后的时间
 */
function formatDate(source, format) {
  const o = {
    'M+': source.getMonth() + 1, // 月份
    'd+': source.getDate(), // 日
    'H+': source.getHours(), // 小时
    'm+': source.getMinutes(), // 分
    's+': source.getSeconds(), // 秒
    'q+': Math.floor((source.getMonth() + 3) / 3), // 季度
    'f+': source.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (source.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

module.exports = { formatDate }


/**
 * 处理具体业务逻辑
 */
function formatTime(date) {
  //获取年月日
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  //获取时分秒
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();

  //格式化日期
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}



export function isEmpty(object) {
  try {
    for (let item of object)
      return false;
  } catch (e) {
    return true;
  }
  return true
}

/**
 * 模块化导出暴露接口
 */
module.exports = {
  formatTime: formatTime,
  isEmpty
}