// pages/user/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggest:'',
    contact:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getSuggest:function(e){
    var val=e.detail.value;
    this.setData({
      suggest:val
    })

  },

  getContact: function (e) {
    var val = e.detail.value;
    this.setData({
      contact:val
    })
  },

  submit:function(e){
    let suggest=this.data.suggest,
        contact=this.data.contact
    if (suggest == 0 || contact == 0) {
      wx.showToast({
        title: "内容不能为空",
        icon: "none",
        durtion: 2000
      })
    }else{
      const db = wx.cloud.database();
      db.collection('feedback').add({
        data: {
          suggest:this.data.suggest,
          contact:this.data.contact
        },
        success: res => {
          wx.showToast({
            title: "提交成功",
          })
        }
      })
    }
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