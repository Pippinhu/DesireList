// pages/detail/show/show.js
const app=getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    title:'',
    time:'',
    plan:'',
    flag:false,
  },

  onLoad: function (options) {
    var desireId = options.id;
    console.log(desireId);
    if (options.id) {
      const db = wx.cloud.database();
      db.collection('desires').doc(desireId)
        .get({
          success: res => {
            let data = res.data
            this.setData({
              title: data.title,
              time:data.time,
              plan: data.plan,
              flag:true,
              id:options.id
            })
          }, fail: err => {
            console.log(err)
          }
        }) 
      }
    else{
      this.setData({
        time: new Date().toLocaleDateString('zh-Hans-CN')
      })
    }
  },
  
  //用户输入
  getTitle: function (e) {
    var val = e.detail.value;
    this.setData({
      title: val
    })
  },

  datePickerBindchange: function (e) {
    const val = e.detail.value
    this.setData({
      time:val
    })
  },

  getPlan: function(e) {
    var val = e.detail.value;
    this.setData({
      plan: val
    })
  },

  getPic:function(e){
    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'my-photo.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log('上传成功', res)
            this.setData({
              fileID: res.fileID
            })
          },
        })
      },
    })
  },

  confirm: function(e){
    let title=this.data.title,
        time=this.data.time,
        plan=this.data.plan,
        _this=this

    if(title==0 || time==0 || plan==0){
      wx.showToast({
        title:"内容不能为空",
        icon:"none",
        durtion:2000
      })
    }
    else{
    //先连上云端数据库
    const db = wx.cloud.database()

    //定义一个data集合
    let data = {
        title: title,
        time: time,
        plan: plan
      }

    //如果不存在这个id，那么就是新增记录
    if(!this.data.id) {
        this.add(db, data)
      }
    //如果存在，就是编辑记录
      else{
        this.update(db, data, this.data.id)}
    }
  },

  deleteItem: function (e) {
    const db = wx.cloud.database()
    db.collection('desires').doc(this.data.id).remove({
      success(res) {
        wx.showToast({
          title: '删除成功！',
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../../index/index'
          })
        }, 1000)
      }, fail: err => {
        console.log(err)
      }
    })
  },

  add: function (db, data) {
    db.collection('desires').add({
      data: data,
      success: res => {
        wx.showToast({
          title: '添加成功！',
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../../index/index'
          })
    		}, 1000)
      },
      fail: err => {
        this.setData({
          uploading: false
        })
      }
    })
  },
    
  update: function (db, data, id) {
      db.collection('desires').doc(id).update({
        data: data,
        success: res => {
          wx.showToast({
            title: '修改成功',
          })
          this.setData({
            uploading: false
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../../index/index'
              })
            }, 1000)
        }, fail: err => {
          this.setData({
            uploading: false
          })
        wx.showToast({ title: '修改失败', })
      }
    })
  }
})