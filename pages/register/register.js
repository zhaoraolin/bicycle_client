// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryCodes: ["86", "80", "84", "87"],  //自定义国家手机号前缀
    countryCodeIndex: 0,
    phoneNum: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取国家手机号编码
  bindCountryCodeChange: function(e){
    console.log(e)
    this.setData({
      countryCodeIndex : e.detail.value
    })
  },

  //将输入的手机号存入data中
  inputPhoneNum: function(e){
    console.log(e)
    this.setData({
      phoneNum: e.detail.value
    })
  },

  //获取验证码
  genVerifyCode: function(){
    //获取国家代码索引值
    var index = this.data.countryCodeIndex;
    //根据索引取值
    var countryCode = this.data.countryCodes[index];
    //获取输入的手机号
    var phoneNum = this.data.phoneNum;
    //向后台发送请求
    wx.request({
      url: 'http://localhost:8070/user/getCode',
      method: 'get',
      data: {
        "countryCode": countryCode,
        "phoneNum": phoneNum,
      },
      //成功回掉函数
      success:function(res){
        console.log(res)
      }
    })
  }


})