var app = getApp(),
  host = 'https://api.xxx.com'

var lib = {
  urls: {
    host: host,
    authUser: host + '/wxXCXAuthCodeResource',
    getUserInfo: host + '/user/info',
    getInfo: host + '/getInfo',
    addOrder: host + '/addOrder',
    createPayment: host + '/chargeCreate',
    getTransactionList: host + '/webTransactionRecordListGet',
    getTransactionDetail: host + '/webTransactionRecordGet',
  },
  init(callback, e) {
    var accessToken = wx.getStorageSync('access_token');
    var paramsTest = Object.prototype.toString.call(e) == '[object Object]';

    if (!paramsTest) return;
    // 当用户已手机号授权后，再次进入小程序询问获取用户信息，不管是否用户同意都进入下一页面
    if (e && (~e.errMsg.indexOf('deny') || ~e.errMsg.indexOf('cancel'))) return;

    lib.http.post(lib.urls.authUser, {
      iv: e.iv,
      encryptedData: e.encryptedData,
      code: app.globalData.code,
    }, (res) => {
      if (res.result !== 1) {
        wx.showModal({
          title: '无法获取用户信息',
          content: res.msg,
          showCancel: false
        });
        return;
      }
      callback(res.user);
    })

  },
  http: {
    post: function(url, data, callback, config) {
      if (!data.noLoading) wx.showLoading({
        mask: true
      });
      data.access_token = wx.getStorageSync('access_token') || '';
      data.platform = 'wx_lite';
      let configs = config || {}
      wx.request({
        url: url,
        data: configs.isStringify ? JSON.stringify(data) : data,
        method: 'POST',
        header: {
          'Content-Type': configs.contentType ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        success: function(res) {


          var errCode = res.statusCode,
            errMsg = '';
          //noError为true时，不会抛出错误
          if (res.statusCode !== 200 && !data.noError) {
            switch (res.statusCode) {
              case 400:
                errMsg = '请求次数过多，请稍后再试';
                break;
              case 404:
                errMsg = '页面未找到'
                break;
              case 500:
                errMsg = '服务器内部错误';
                break;
              default:
                errMsg = '发生未知错误'
            }

            wx.showModal({
              title: '请求出错',
              content: errCode + ' - ' + errMsg,
              showCancel: false
            });
            return;
          }

          callback(res.data);
        },
        fail: function(err) {},
        complete: function(res) {
          if (!data.noLoading) wx.hideLoading();
        }
      });
    }
  },
  createPayment(amount, data, callback) {
    data.amount = amount;
    data.channel = 'wx_lite';
    console.log(data);
    lib.http.post(lib.urls.createPayment, data, function(res) {
      if (res.result && res.result === -1) {
        wx.showModal({
          title: '无法生成订单信息',
          content: res.msg,
          showCancel: false
        });
        return;
      }
      console.log('createPayment');
      obj.success = function(res) {
        callback && callback();
      }
      obj.fail = function(err) {
        if (err.extra.errMsg.indexOf('cancel')) return;
        wx.showModal({
          title: '付款失败',
          content: '请稍后重试',
          showCancel: false
        });

      }
      wx.requestPayment(obj);

    });
  },
  authUser(code, callback) {
    lib.http.post(lib.urls.authUser, code, function(res) {
      if (res.result == 1) {
        callback && callback(res.user);
      }
    })
  },
  getUserInfo(callback) {
    lib.http.post(lib.urls.getUserInfo, {}, function(res) {
      if (res.result == 1) {
        app.globalData.userInfo = res.user;
        callback && callback(res.user);
      }
    })
  },
  getInfo(callback) {
    lib.http.post(lib.urls.getInfo, {}, function(res) {
      if (res.result == 1) {
        callback && callback(res.user);
      }
    })
  },
  addOrder(data, callback) {
    lib.http.post(lib.urls.addOrder, data, function(res) {
      if (res.result == 1) {
        callback && callback(res.data);
      }
    })
  },
  getTransactionList(data, callback) {
    lib.http.post(lib.urls.getTransactionList, data, function(res) {
      if (res.result == 1) {
        callback && callback(res.data);
      }
    })
  },
  getTransactionDetail(data, callback) {
    lib.http.post(lib.urls.getTransactionDetail, data, function(res) {
      if (res.result == 1) {
        callback && callback(res.data);
      }
    })
  },


}

module.exports = lib;