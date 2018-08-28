# 豆瓣电影 by Xu
### Author：Xu
## 程序结构
```
└─ project-root/ ·································· 项目所在目录
   ├─ images/ ······································ 图片目录
   ├─ components/ ······································ components目录 
   ├─ utils/ ······································ 自定义工具目录
   ├─ pages/ ······································ 页面目录
   │  ├─ board/ ··································· 榜单页面
   │  ├─ index/ ··································· ~~引导页面~~（splash替代）
   │  ├─ common/ ··································· 通用模板
   │  ├─ item/ ···································· 电影信息页面
   │  ├─ list/ ···································· 电影列表页面
   │  ├─ profile/ ································· 个人信息页面
   │  ├─ search/ ··································· 搜索页面
   │  ├─ splash/ ··································· 滑动欢迎页面
   │  └─ logs/ ·································· 日志目录   
   ├─ app.js ······································ 应用程序逻辑
   └─ app.json ···································· 应用程序配置
```
## 运行方式
直接在`微信Web开发者工具`中导入程序   
app.js中设置启动路径。必须保证所有路径都在，否则无法识别文件。
## 开发日志
### 2018-5-6 18:46:07
* 创建项目，学习配置文件，项目结构
### 2018-5-8 10:37:59
* 设计总体页面布局
* 分别完成各个页面的设计与布局
* 参考资料：https://github.com/zce/weapp-douban
### 2018-5-9 11:43:07
* 设计搜索页面布局
* 完成搜索页面电影信息展示
* 存在问题：电影信息展示样式无法正确显示
### 2018-5-9 22:45:39
* index自动跳转页面实现
>navigateTo, redirectTo 只能打开非 tabBar 页面。
>switchTab 只能打开 tabBar 页面。
### 2018-5-10 09:39:44
* 优化代码
* 研究路由，navigator组件
### 2018-5-12 19:37:43
* 实现log，记录启动日志并展示
* 封装util工具类，返回当前时间formatTime(date)
* 下一步：
	* 完成profile和board界面
### 2018-05-14 18:29:58 
* 完成程序所有框架搭建
* 绑定假数据
* 优化wxss样式，优化界面显示
* 优化代码
* 下一步：
	* 完成接口绑定
### 2018-5-15 17:35:57
* 导入百度地图接口
* 导入豆瓣电影接口
	* 豆瓣官方限制微信小程序对豆瓣接口的调用，直接调用显示403错误。
	* 解决方法：利用NGINX搭建反向代理服务器
* 制作欢迎页面（splash）
* 数据绑定（50%）
* 下一步：
	* 继续数据绑定
	* 研究NGINX反向代理服务器设置
	* 代码优化
### 2018-5-21 19:00:48
* board页面数据对接
* 学习promise对象
	* https://segmentfault.com/a/1190000011652907
    * Promise是异步编程的一种解决方案，它有三种状态，分别是pending-进行中、resolved-已完成、rejected-已失败
    * 解决“回调地狱”现象
* 封装接口工具，app.js
* board.wxss代码优化
	* 部分共有代码放入app.wxss中
* 下一步：
	* 继续完成接口绑定
	* 研究NGINX反向代理服务器设置
	* 学习JavaScript
		* 廖雪峰的官方网站
		* https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000
	* 学习wx.request方法，调用外部接口
### 2018-05-22 18:29:24 
* list页面数据绑定
* 新增common文件夹，将list中公用代码放入模板中
	* WXML提供模板（template），可以在模板中定义代码片段，然后在不同的地方调用。
	* 定义模板
		* 使用 name 属性，作为模板的名字。然后在<template/>内定义代码片段
	* 使用模板
		* 使用 is 属性，声明需要的使用的模板，然后将模板所需要的 data 传入。
* 学习JavaScript
* 下一步：
	* 完成item页面数据绑定
	* 研究NGINX反向代理服务器设置
	* 学习JavaScript
	* 研究外部接口调用
### 2018-05-23 19:49:17 
* item页面数据绑定
* profile页面增加显示用户信息与当前时间
* 学习JavaScript
* 代码优化
* 下一步：
	* 完成search功能
	* 完成search数据绑定
	* 学习JavaScript
###2018-05-28 20:15:52
* item页面排版改变，增加显示 
* 目录结构增加
	* movie
		* celebrity：影人信息展示
		* movie-grid：想看的人数
		* movie-poster：电影海报展示
		* movie-rating：电影评价
* 影人页面未完成
* 下一步：
	* 继续优化页面
###2018-05-29 23:16:10 
* item页面增加影人信息
	* celebrity为影人页面
	* item电影详细信息页面增加，优化代码
* 更改底部图标
* 更改底部tarbar功能名称，搜索页面合并到榜单中。新增发现页面
* 榜单滑动滚动海报展示功能转移到发现页面
* 下一步：
	* item页面中实现电影短评功能
	* item页面中增加电影剧照（暂定—）
	* 发现页面完善

   {
        "pagePath": "pages/discovery/discovery",
        "text": "发现",
        "iconPath": "images/tab_discover_unchecked.png",
        "selectedIconPath": "images/tab_discover_checked.png"
      },

       "tabBar": {
    "color": "#666666",
    "selectedColor": "#000000",
    "borderStyle": "white",
    "backgroundColor": "#f8f9fb",
    "list": [
     
      {
        "text": "榜单",
        "pagePath": "pages/board/board",
        "iconPath": "images/tab_movies_unchecked.png",
        "selectedIconPath": "images/tab_movies_checked.png"
      },
      {
        "text": "我",
        "pagePath": "pages/profile/profile",
        "iconPath": "images/tab_usercenter_unchecked.png",
        "selectedIconPath": "images/tab_usercenter_checked.png"
      }
    ]
  },