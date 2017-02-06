// pages/my/my.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
   loginFun: function(){
        wx.login({
            success: function(res) {
                
                console.log("dasda")
                if (res.code) {
                    //发起网络请求
                    // wx.request({
                    //     url: 'https://test.com/onLogin',
                    //     data: {
                    //         code: res.code
                    //     }
                    // })
                    console.log("发起微信登录请求！");
                    console.log(res.code);
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    }
})