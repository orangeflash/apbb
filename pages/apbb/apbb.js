// pages/apbb/apbb.js
Page({
  data: {
    bindindex:0,//设置下环线
    bannerItems: {},//存放banner数据
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    sbwidth: 0,
    activityUrls: [         // 四个模块图片链接
      'http://m.ipinbb.com/ipbb/static/images/home-01.png',
      "http://m.ipinbb.com/ipbb/static/images/home-02.png",
      "http://m.ipinbb.com/ipbb/static/images/home-03.png",
      "http://m.ipinbb.com/ipbb/static/images/home-04.png"
    ],
    navItems: [],//存放navbar数据

    list:[],
    hidden:false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          sbwidth: res.windowWidth
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
    wx.request({//banner数据请求
      url: 'http://service.ipinbb.com:8080/goodsService/getHomeBanner',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        var bannerArr = [], bannerData = res.data.lst;
        //forEach循环遍历数据
        bannerData.forEach(function (item) {
          var bannerObj = {};
          bannerObj.goodId = item.banner_goodsId;
          bannerObj.imgUrl = item.banner_img;
          bannerObj.platformId = item.banner_platformId;

          bannerArr.push(bannerObj)
        });
        that.setData({
          bannerItems: bannerArr
        })
      },
      fail: function () {
        // fail
        console.log('网络异常')
      },
      complete: function () {
        // complete
      }
    });
    wx.request({//navbar数据请求
      url: 'http://service.ipinbb.com:8080/goodsService/getHomeTabs',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        var navArr = [], navData = res.data;
        navData.forEach(function (item) {
          var navObj = {};
          navObj.category = item.tabFilterType;
          navObj.tabIndex = item.tabId;
          navObj.text = item.tabName;

          navObj.className = !item.tabSortType ? "" : "curNavigator";
          navArr.push(navObj);
        })
        that.setData({
          navItems: navArr
        })
      },
      fail: function () {
        // fail
        console.log('网络异常')
      },
      complete: function () {
        // complete
      }
    });
    wx.request({//lists数据请求
      url: 'http://m.ipinbb.com/ipbb/home/load?ti=-1&ft=Home',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data)
        var nextPage=JSON.stringify(res.data.nextPage),
        resData=res.data.lst;
        that.setData({
          hidden:true,
          pageIndex:1,
          nextPage:nextPage,
          list:that.data.list.concat(that.dataRead(resData))
        })
      },
      fail: function() {
        // fail
        console.log("网络异常")
      },
      complete: function() {
        // complete
      }
    })
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
  dataRead:function(data){//数据提取
      var that=this,dataArr=[];
      data.forEach(function(item){
       var itemObj={};
       itemObj.goods_id=item.goods_id;
       itemObj.goods_img=item.goods_img;
       itemObj.goods_title=item.goods_title;
       itemObj.goods_group_size=item.goods_group_size;
       itemObj.goods_group_price=item.goods_group_price;
       itemObj.goods_promote_info=item.goods_promote_info;

       dataArr.push(itemObj);
      });
      return dataArr;
  },
  navLink:function(e){
    console.log(e);
    this.setData({
      bindindex:e.currentTarget.dataset.index
    })
    console.log(this.data.bindindex)
    var that=this;
     wx.request({
      url: 'http://m.ipinbb.com/ipbb/home/load',
      data: {
        ti:e.currentTarget.dataset.tabindex,
        ft:e.currentTarget.dataset.category
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data)
        var nextPage=JSON.stringify(res.data.nextPage),
        resData=res.data.lst;
        that.setData({
          hidden:true,
          pageIndex:1,
          nextPage:nextPage,
          list:that.dataRead(resData)
        })
      },
      fail: function() {
        // fail
        console.log("网络异常")
      },
      complete: function() {
        // complete
      }
    })
  }
})
