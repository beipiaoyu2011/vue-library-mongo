
const timeout = 10000;
const apiPrefix = 'http://localhost:8094/api/';
const exportsObj = {};
//获取token
let getToken = function () {
  const reg = new RegExp('(^| )token=([^;]*)(;|$)');
  const arr = document.cookie.match(reg);
  if (arr && arr.length > 0) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}
//获取cookie
let getCookie = function (name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}
//get
let get = function (api, params) {
  if (!params._this) {
    // console.log('请添加 `_this` 参数')
    return;
  }
  if (!params.options) {
    params.options = {};
  }
  return params._this.$http
    .get(apiPrefix + api, {
      params: params.options,
      timeout: timeout
    })
    .then(
      function (res) {
        var handle = handleDataResponse(params);
        if (!res || !res.body) {
          handle.callback1001(res)
        } else {
          switch (res.body.code) {
            case 0:
              handle.callback0(res)
              break
            case 1001:
              handle.callback1001(res)
              break
            case 1009:
              handle.callback1009(res)
              break
            case 1100:
              handle.callback1100(res)
              break
            case 405:
              handle.callback405(res)
              break
            default:
              break
          }
        }
        handle.afterResponse(res)
      },
      function (res) {
        // console.log('res: ', res)
        if (params.fail) {
          params.fail(res)
          // console.log('fail')
        }
      }
    )
}
//post
let post = function (api, params) {
  if (!params._this) {
    console.log('请添加 `_this` 参数')
    return;
  }
  if (!params.options) {
    params.options = {}
  }
  var formData = new FormData()
  for (var key in params.options) {
    if (params.options[key] !== '' && params.options[key] !== undefined) {
      formData.append(key, params.options[key])
    }
  }
  return params._this.$http.post(apiPrefix + api, formData, {
    timeout: timeout
  }).then(
    function (res) {
      var handle = handleDataResponse(params)
      switch (res.body.code) {
        case 0:
          handle.callback0(res)
          break
        case 1001:
          handle.callback1001(res)
          break
        case 1009:
          handle.callback1009(res)
          break
        default:
          break
      }
      handle.afterResponse(res)
    },
    function (res) {
      // console.log('res: ', res)
      if (params.fail) {
        params.fail(res)
      }
    }
  )
}
//处理数据
let handleDataResponse = function (callback) {
  let callback0 = callback.callback0,
    callback400 = callback.callback400,
    callback401 = callback.callback401,
    callback405 = callback.callback405,
    callback1001 = callback.callback1001,
    callback1009 = callback.callback1009,
    callback1100 = callback.callback1100,
    callback1101 = callback.callback1101,
    callbackUnknownError = callback.callbackUnknownError,
    afterResponse = callback.afterResponse;
  if (!callback0) {
    callback0 = function () { };
  }
  if (!afterResponse) {
    afterResponse = function () { };
  }
  if (!callback400) {
    callback400 = function () { };
  }
  if (!callback401) {
    callback401 = function () { };
  }
  if (!callback1001) {
    callback1001 = function () { };
  }
  if (!callback1009) {
    callback1009 = function () {
      // alert('您的电脑系统时间不正确,请修改！');
    };
  }
  if (!callback1100) {
    callback1100 = function () {
      localStorage.removeItem('toolUser');
      if (location.hostname == 'localhost') {
        location.href = location.origin //回到登录页
      }
      try {
        // qtobj.relogin()
      } catch (error) { }
    }
  }
  if (!callback405) {
    callback405 = function () {
      console.log('非法请求')
      callback1100();
    }
  }
  if (!callback1101) {
    callback1101 = function () { };
  }
  if (!callbackUnknownError) {
    callbackUnknownError = function () { };
  }
  return {
    callback0: callback0,
    callback400: callback400,
    callback405: callback405,
    callback401: callback401,
    callback1001: callback1001,
    callback1009: callback1009,
    callback1100: callback1100,
    callback1101: callback1101,
    afterResponse: afterResponse,
  }
}
//去除passed = true 重新登录
// let revertPassed = () => {
//   let userInfo = localStorage.getItem('toolUser');
//   userInfo = userInfo ? JSON.parse(userInfo) : {};
//   userInfo.loginStatus = false;
//   localStorage.setItem('toolUser', JSON.stringify(userInfo));
// }
/**
 * 格式化日期
 * @param format
 * @returns {*}
 */
Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1, //month
    'd+': this.getDate(), //day
    'h+': this.getHours(), //hour
    'm+': this.getMinutes(), //minute
    's+': this.getSeconds(), //second
    'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds(), //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format;
};


exportsObj.getToken = getToken;
exportsObj.getCookie = getCookie;
exportsObj.get = get;
exportsObj.post = post;

// 登录
exportsObj.getUser = params => {
  return get('v1/user/get', params);
};


export default exportsObj;
