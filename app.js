//app.js
App({
  onLaunch: function () {
    
  },

  //所有页面都是共享的数据
  globalData: {
    userInfo: null,
    status: 0,  //0表示还未绑定，需要进行注册

  },
})