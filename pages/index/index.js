//index.js
var sha1 = require('../../utils/sha1.js')
Page({
  data: {
    flag: '',
    key: 'abc',
    pkey: '',
    p8: '',
    p16: '',
    p24: ''
  },
  gen: function(e) {
    this.setData({
      flag: e.detail.value
    })
    this.setData({
      p8: this.genPassword(6),
      p16: this.genPassword(12),
      p24: this.genPassword(24)
    })
  },
  genAndSync: function(e){
    let newKey = e.detail.value
    let newPkey = sha1(newKey + 'zznova\'s')
    wx.setStorage({
      key: 'conKey',
      data: newKey
    })
    this.setData({
      key: newKey,
      pkey: newPkey
    })
    this.setData({
      p8: this.genPassword(6),
      p16: this.genPassword(12),
      p24: this.genPassword(24)
    })
  },
  genPassword: function(len){
    let pwd = sha1(this.data.pkey + this.data.flag)
    pwd = pwd.replace(/a/g, '@')
    pwd = pwd.replace(/1/g, '!')
    pwd = pwd.replace(/d/g, '~')
    pwd = pwd.replace(/0/g, '^')
    return 'Z' + pwd.substring(0, len - 2) + 'z'
  },
  copyMe: function(e){
    let t = e.target.dataset.type;
    if(t == 8){
      wx.setClipboardData({
        data: this.data.p8
      })
      wx.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 1000
      })
    }else if(t == 16){
      wx.setClipboardData({
        data: this.data.p16
      })
      wx.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 1000
      })
    } else if (t == 24) {
      wx.setClipboardData({
        data: this.data.p24
      })
      wx.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 1000
      })
    }
  },
  onLoad: function () {
    
  },
  onReady: function(){

  },
  onShow: function () {
    const conKey = wx.getStorageSync('conKey')
    let key = ''
    if (conKey) {
      key = conKey
    } else {
      key = 'abc'
    }
    let pkey = sha1(conKey + 'zznova\'s')
    this.setData({
      key: conKey,
      pkey: pkey
    })
  }
})
