const app=getApp()
// Pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:null
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName      
              })
            }
          })
        }
      }
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    var avatarUrl = e.detail.userInfo.avatarUrl;
    var nickName = e.detail.userInfo.nickName;
    console.log(avatarUrl)
    this.setData({
      avatarUrl: avatarUrl,
      nickName:nickName
    })
  },

  onTapToAbout:function(){
    wx.navigateTo({
      url: '../user/about/about',
    })
  },

  onTapToSuggestion: function () {
    wx.navigateTo({
      url: '../user/feedback/feedback',
    })
  },

  onTapToShare: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
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

  }
})