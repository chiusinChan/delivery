// pages/cart/cart.js
const app = getApp();
let lib = require('../../utils/util.js');
let vm;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    sumMoney:0,
    reciverInfo:{
      name:"",
      phone:"",
      area:"",
      address:""
    }

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
      list: app.globalData.cart,
      reciverInfo: wx.getStorageSync("reciverInfo")
    })
    vm.accountMoney()
   
  },
  add(event){
    var curId = event.currentTarget.dataset.id; 
    var curNum = event.currentTarget.dataset.num;
    var curStore = event.currentTarget.dataset.store;
    if (curStore == curNum) return;
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
  inputName({detail}){
    vm.setData({
      ['reciverInfo.name']:detail.value
    })

  },
  inputPhone({ detail }) {
    vm.setData({
      ['reciverInfo.phone']: detail.value
    })

  },
  inputAddress({ detail }) {
    vm.setData({
      ['reciverInfo.phone']: detail.value
    })

  },
  inputArea({ detail }) {
    vm.setData({
      ['reciverInfo.area']: detail.value
    })

  },
  chooseAddress (){
    wx.chooseAddress({
      success: function (res) {
        vm.setData({
          reciverInfo: {
            name: res.userName,
            phone: res.telNumber,
            area: res.provinceName + res.cityName + res.countyName,
            address: res.detailInfo
          }
        })
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  createPayment(){
    wx.setStorageSync("reciverInfo", vm.data.reciverInfo)
    //收货人信息错误
    let flag=true;
    for(var k in vm.data.reciverInfo){
      if (!vm.data.reciverInfo[k]){
          flag=false;
          break;
      } else if (k =="phone"){
        flag = /1\d{10}/.test(vm.data.reciverInfo["phone"])
      }
      
    }
    if (!flag) {
      setTimeout(() => {
        wx.showToast({
          title: '请正确填写收货人信息',
          icon: "none",
          duration: 5000
        })

      }, 0)
      return;
    }
    //空订单
    let listFlag=false;
    vm.data.list.map((item)=>{
       if(item.num>0){
         listFlag=true;
       }
    })
    if (!listFlag) {
      setTimeout(() => {
        wx.showToast({
          title: '请勿提交空订单',
          icon: "none",
          duration: 5000
        })

      }, 0)
      return;
    }


  
    lib.createPayment(vm.data.sumMoney, { list: vm.data.list},()=>{
      vm.data.list.map((item,index)=>{
       if(item.num==0){
         vm.data.list.splice(index,1);
         vm.setData({ list: vm.data.list})
       }
      })
      lib.addOrder({ reciverInfo: vm.data.reciverInfo, list: vm.data.vm.data.list},()=>{
        //付款成功
        wx.redirectTo({
          url: '../success/success',
        })
      })
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