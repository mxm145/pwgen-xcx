//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    key: 'abc'
  },
  synKey: function(e){
    this.setData({
      key: e.detail.value
    })
  },
  setKey: function(){
    wx.setStorage({
      key: 'conKey',
      data: this.data.key,
      success: function(){
        wx.switchTab({ url: '/pages/index/index'})
      }
    })
  },
  onLoad: function () {
    const conKey = wx.getStorageSync('conKey')
    if (conKey) {
      this.setData({
        key: conKey
      })
    } else {
      this.setData({
        key: 'abc'
      })
    }
  }
})
