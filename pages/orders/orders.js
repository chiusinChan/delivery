// pages/orders/orders.js
//获取应用实例
var lib = require('../../utils/util.js');
const app = getApp();
let vm;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list1: [{
      id: 213123123,
      time: "2019-02-01 16:34",
      title: "海鲜PIZZA、汉堡包等2件商品",
      des: "送快一点",
      price: "26000",
      imgs: ["http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114", "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114"]
    }],
    list2: [{
      id: 11111,
      time: "2019-02-01 16:34",
      title: "海鲜PIZZA、汉堡包等2件商品",
      des: "送快一点",
      price: "26000",
      imgs: ["http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114", "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114"]
    }],
    select: 1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this;
  },
  switchTab(event) {
    var curTab = event.currentTarget.dataset.tab;
    vm.setData({
      select: curTab
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    lib.getTransactionList({listKind:1},(res)=>{
        vm.setData({
         list1:res.list
        })
    })

    lib.getTransactionList({ listKind: 2 }, (res) => {
      vm.setData({
        list2: res.list
      })
    })

  },
  bugAgain(event){
    var id = event.currentTarget.dataset.id;

    lib.getTransactionDetail({ id: id }, (res) => {
      app.globalData.cart =res.list;
      wx.switchTab({
        url: '../index/index',
      })
          
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})