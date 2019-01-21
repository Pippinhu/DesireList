//index.js
const app = getApp()

Page({
  data: {
    desireList:[]
  },

  onLoad: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    if(app.globalData.openid){
      this.getData();}
    
    else{
      this.onGetOpenid();
    }
  },

  getData:function(){
    const db=wx.cloud.database();
    db.collection("desires").where({
      _openid:app.globalData.openid
    }).get({
      success:res=>{
        this.setData({
          desireList:res.data
        })
        app.globalData.desireList=res.data;
      },fail:err=>{
        wx.showToast({
          icon:'none',
          title:"查询记录失败"
        })
      }
    })
  },

  onGetOpenid: function(id) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid;
        this.getData();
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  getUserContent:function(){
    wx.navigateTo({
      url: '../detail/edit/edit',
    })
  },

  onTapToDetail:function(event){
    var desireId=event.currentTarget.dataset.id;
    console.log(desireId);
    wx.navigateTo({
      url: '../detail/detail?id='+desireId,
    })

  },

  onShow: function () {
    if (app.globalData.openid) {
      this.getData();
    }
  }

})
 