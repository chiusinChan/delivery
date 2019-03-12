//index.js
//获取应用实例
var lib = require('../../utils/util.js');
const app = getApp();
let vm;

Page({
  data: {
    list: [],
    menu: [{
        name: "早餐",
        title: "breakfast",
        price: "1000",
        des: "Taste Well",
        img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
      },
      {
        name: "午餐",
        title: "lunch",
        price: "1000",
        des: "Taste Well",
        img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
      },
      {
        name: "晚餐",
        title: "dinner",
        price: "1000",
        des: "Taste Well",
        img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
      }
    ],
    goodsList: [{
        name: "早餐",
        title: "breakfast",
        goods: [{
            name: "seaFoodPizza",
            des: "large/hot",
            price: "2500",
            num: 0,
            id: 1,
            img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
          },
          {
            name: "seaFoodPizza",
            des: "large/hot",
            price: "2500",
            num: 0,
            id: 2,
            img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
          },
          {
            name: "seaFoodPizza",
            des: "large/hot",
            price: "2500",
            num: 0,
            id: 3,
            img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
          }
        ]
      },
      {
        name: "午餐",
        title: "lunch",
        goods: [{
            name: "seaFoodPizza",
            des: "large/hot",
            price: "2500",
            num: 0,
            id: 4,
            img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
          },
          {
            name: "seaFoodPizza",
            des: "large/hot",
            price: "2500",
            num: 0,
            id: 5,
            img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
          },
          {
            name: "seaFoodPizza",
            des: "large/hot",
            price: "2500",
            num: 0,
            id: 6,
            img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
          }
        ]
      }, {
        name: "晚餐",
        title: "dinner",
        goods: [{
            name: "seaFoodPizza",
            des: "large/hot",
            price: "2500",
            num: 0,
            id: 7,
            img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
          },
          {
            name: "seaFoodPizza",
            des: "large/hot",
            price: "2500",
            num: 0,
            id: 8,
            img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
          },
          {
            name: "seaFoodPizza",
            des: "large/hot",
            price: "2500",
            num: 0,
            id: 9,
            img: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114'
          }
        ]
      }
    ],
    isMenuSelect: 0,
    toView: ""
  },

  onLoad: function() {
    vm = this;
    var accessToken = wx.getStorageSync('access_token');
    if (!accessToken){
      wx.redirectTo({
        url: '../login/login',
      })
    }
    lib.getInfo((res)=>{
        vm.setData({
          menu:res.menu,
          goodsList: res.goodsList
        })

    });

  },
  selectMenu(event) {
    var curIndex = event.currentTarget.dataset.index;
    var title = event.currentTarget.dataset.title;
    vm.setData({
      isMenuSelect: curIndex,
      toView: title
    })

  },
  add(event) {
    var curId = event.currentTarget.dataset.id;
    var curNum = event.currentTarget.dataset.num;
    var temItem = {};

    this.data.goodsList.map((item, index) => {
      item.goods.map((el, idx) => {
        if (curId == el.id) {
          el.num++;
          curNum++;
          vm.setData({
            [`goodsList[${index}].goods[${idx}]`]: el
          })
          temItem = el;

        }
      })

    })

    if (curNum == 1) {
      this.data.list.push(temItem)
      vm.setData({
        list: this.data.list
      })

    } else {
      this.data.list.map((item, index) => {
        if (curId == item.id) {
          console.log(temItem)
          vm.setData({
            [`list[${index}]`]: temItem
          })
        }
      })



    }
    vm.data.list.map(((item, index) => {
      if (item.num == 0) {
        vm.data.list.splice(index, 1);
        vm.setData({
          list: vm.data.list
        })
      }
    }))
    app.globalData.cart = vm.data.list;



  },
  minus(event) {
    var curId = event.currentTarget.dataset.id;
    var curNum = event.currentTarget.dataset.num;
    if (curNum == 0) return;
    this.data.goodsList.map((item, index) => {
      item.goods.map((el, idx) => {
        if (curId == el.id) {
          el.num--;
          vm.setData({
            [`goodsList[${index}].goods[${idx}]`]: el
          })

        }
      })

    })

    this.data.list.map((item, index) => {

      if (curId == item.id) {
        if (item.num == 0) {
          vm.data.list.splice(index, 1)
          vm.setData({
            list: vm.data.list
          })
        } else {
          // item.num;
          vm.setData({
            [`list[${index}]`]: item
          })

        }
        vm.data.list.map(((item, index) => {
          if (item.num == 0) {
            vm.data.list.splice(index, 1);
            vm.setData({
              list: vm.data.list
            })
          }
        }))
        app.globalData.cart = vm.data.list;
      }


    })

  },
  onShow() {
    vm.setData({
      list: app.globalData.cart
    })

    this.data.goodsList.map((item, index) => {
      item.goods.map((el, idx) => {
        vm.data.list.map((listItem, listIdx) => {
          if (listItem.id == el.id) {
            if (listItem.num == 0) {
              vm.data.list.splice(listIdx, 1);
              vm.setData({
                list: vm.data.list
              })
            }
            console.log(listItem)
            vm.setData({
              [`goodsList[${index}].goods[${idx}]`]: listItem
            })

          }
        })

      })

    })
    vm.setData({
      list: app.globalData.cart
    })




  }


})