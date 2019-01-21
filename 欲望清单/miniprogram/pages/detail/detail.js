// pages/detail/detail.js
Page({

  data: {
    title:'',
    time:'',
  },

  onLoad: function(options) {
    var desireId = options.id;
    console.log(desireId);
    const db = wx.cloud.database();
    db.collection('desires').doc(desireId)
      .get({
        success: res => {
          let data = res.data
          this.setData({
            title: data.title,
            time: data.time,
            plan: data.plan,
            id: data._id,
          })
        }, fail: err => {
          console.log(err)
        }
      })

  },

  tapToEdit:function(event){
    var desireId = event.currentTarget.dataset.id;
    console.log(desireId);
    wx.navigateTo({
      url: '../detail/edit/edit?id='+desireId
    })
  },
 
  onShareAppMessage: function () {
  }
})