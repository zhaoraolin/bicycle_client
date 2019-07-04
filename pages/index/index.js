
Page({
  data: {
    longitude: 0,  //经度
    latitude: 0,    //纬度
    controls: [],  //组件（控件）
    markers: [],   //存放单车
  },

//首页加载页面时调用
  onLoad: function () {
    //当前页面对象  this
    var that = this;
    wx.getLocation({
      success: function(res) {
        //后面没有逗号
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          longitude : longitude,
          latitude: latitude
        })
      },
    })

    //获取设备信息
    wx.getSystemInfo({
      success: function(res) {
        var swidth = res.windowWidth;
        var sheight = res.windowHeight;
        that.setData({
          controls: [
            {
              //扫码按钮
              id: 1,
              //控件（按钮）背景图片
              iconPath: '/images/scan.png',
              //控件相对页面的位置
              position: {
                width: 200,
                height: 80,
                left: swidth/2-100,
                top: sheight-100,
              },
              //是否可点击
              clickable:true,
            },
            {
              //定位当前位置按钮
              id: 2,
              iconPath: '/images/center.png',
              position: {
                width: 20,
                height: 30,
                left: swidth/2 - 10,
                top: sheight/2 - 30,
              },
              //是否可点击
              clickable: true,
            },
            {
              //回到当前位置按钮
              id: 3,
              iconPath: '/images/locat.png',
              position: {
                width: 25,
                height: 30,
                left: 20,
                top: sheight-50,
              },
              //是否可点击
              clickable: true,
            },
            {
              //支付按钮
              id: 4,
              iconPath: '/images/pay.png',
              position: {
                width: 25,
                height: 25,
                left: swidth-50,
                top: sheight - 100,
              },
              //是否可点击
              clickable: true,
            },
            {
              //报修按钮
              id: 5,
              iconPath: '/images/warn.png',
              position: {
                width: 25,
                height: 25,
                left: swidth-50,
                top: sheight - 70,
              },
              //是否可点击
              clickable: true,
            },
            {
              //新增单车按钮
              id: 6,
              iconPath: '/images/add.png',
              position: {
                width: 40,
                height: 40,
              },
              //是否可点击
              clickable: true,
            },
          ]
        })
      },
    })


  },

//控件被点击之后触发的事件
  controltap: function(e){
    var that = this;
    //获取控件id
    var controlId = e.controlId;
    switch (controlId){
      case 1:{
        //扫码
        //根据用户的状态，跳转不同的页面
        //获取状态数据
        var status = getApp().globalData.status;
        if(status == 0){
          //跳转到手机注册页面
          wx.navigateTo({
            url: '../register/register',
          })
        }
        break;
      }
      case 2: {
        //定位当前位置按钮
      }
      case 3: {
        //回到当前位置
        this.mapCtx.moveToLocation();
        break;
      }
      case 4: {
        //支付按钮
        break;
      }
      case 5: {
        //报修按钮

        break;
      }
      case 6: {
        //新增单车
        //获取当前已有的车辆
       // var bikes = that.data.markers;
		    //地图视野发生变化，触发的事件
        this.mapCtx.getCenterLocation({
          success:function(res){
            // bikes.push({
            //   iconPath: '/images/bicycle.png',
            //   width: 20,
            //   height: 20,
            //   latitude: res.latitude,
            //   longitude: res.longitude,
            // })
            // //将新的车辆信息集合重新赋值到页面上
            // that.setData({
            //   markers: bikes
            // })
            //发送请求，将单车信息发送到后台
            wx.request({
              url: 'http://localhost:8070/bick/addBick',
              data: {
                latitude: res.latitude,
                longitude: res.longitude,
              },
              method: 'POST',
              success: function(res){
                console.log(res)
              }
            })
          }
        })
        break;
      }
    }
  },

  //生命周期函数--监听页面初次渲染完成
  //记录原来的位置
  onReady: function(){
    //创建map上下文
    this.mapCtx = wx.createMapContext('myMap')
  },

  

})
