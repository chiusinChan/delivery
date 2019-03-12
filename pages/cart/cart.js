// pages/cart/cart.js
const app = getApp();
let vm;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    sumMoney:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;

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
    this.setData({
      list: app.globalData.cart
    })
    vm.accountMoney()
  },
  add(event){
    var curId = event.currentTarget.dataset.id;
    console.log(curId);
    this.data.list.map((item,index)=>{
      if (curId==item.id){
        item.num++;
         vm.setData({
           [`list[${index}]`]:item
         })
         app.globalData.cart=vm.data.list;
        vm.accountMoney();
      }
    })

  },
  minus(event) {
    var curId = event.currentTarget.dataset.id;
    console.log(curId);
    this.data.list.map((item, index) => {
      if (curId == item.id) {
        if (item.num==1){
          // vm.data.list.splice(index,1)
          item.num=0;
          vm.setData({
            list: vm.data.list
          })
        }else{
          item.num--;
          vm.setData({
            [`list[${index}]`]: item
          })

        }
        
        app.globalData.cart = vm.data.list;
        vm.accountMoney();
      }
    })

  },
  accountMoney(){
    var count=0;
    vm.data.list.map((item)=>{
      count+=(item.price*item.num)
    })
    vm.setData({
      sumMoney: count
    })
    
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