var a  = angular.module('starter.controllers', [])

  //货币过滤器
  .filter('hbFilter',function(){
    return function (hbNum) {
      var num = parseFloat(hbNum).toFixed(4);
      return num;
    }
  });

  a.controller('AppCtrl', function($scope, $ionicModal,$http,$ionicPopup,$rootScope) {

    //彩票种类
    $scope.cplist = [
      {cpType:"dlt",cpCont:"超级大乐透"},
      {cpType:"ssq",cpCont:"双色球"},
      {cpType:"fc3d",cpCont:"福彩3D"},
      {cpType:"qxc",cpCont:"七星彩"},
      {cpType:"qlc",cpCont:"七乐彩"}
    ];
    //常用货币
    $scope.hbTypea = "CNY";
    $scope.hbCona = "人民币";
    $scope.hbTypeb = "USD";
    $scope.hbConb = "美元";

    $scope.hbList = [
      {ty:"USD",co:"美元"},
      {ty:"CNY",co:"人民币"},
      {ty:"HKD",co:"港币"},
      {ty:"JPY",co:"日元"},
      {ty:"EUR",co:"欧元"},
      {ty:"GBP",co:"英镑"},
      {ty:"TWD",co:"新台币"},
      {ty:"AUD",co:"澳门币"},
      {ty:"AUD",co:"澳元"},
      {ty:"THB",co:"泰铢"},
      {ty:"SGD",co:"新加坡元"},
      {ty:"VND",co:"越南盾"},
      {ty:"KRW",co:"韩国币"},
      {ty:"CAD",co:"加元"},
      {ty:"CAD",co:"印度卢比"},
    ];

    $scope.hbmhList = [
      {ty:"/category/weimanhua/kbmh",co:"恐怖漫画"},
      {ty:"/category/weimanhua/gushimanhua",co:"故事漫画"},
      {ty:"/category/duanzishou",co:"段子手"},
      {ty:"/category/lengzhishi ",co:"冷知识"},
      {ty:"/category/qiqu",co:"奇趣"},
      {ty:"/category/dianying",co:"电影"},
      {ty:"/category/gaoxiao",co:"搞笑"},
      {ty:"/category/mengchong",co:"萌宠"},
      {ty:"/category/xinqi",co:"新奇"},
      {ty:"/category/huanqiu",co:"环球"},
      {ty:"/category/sheying",co:"摄影"},
      {ty:"/category/wanyi",co:"玩艺"},
      {ty:"/category/chahua  ",co:"插画"},
    ];

    //漫画列表
    $scope.showMH = function(ty){
      $scope.disab = true;
      var httpOpts = $http({
        method:"GET",
        url:"http://route.showapi.com/958-1?page=1&showapi_appid=26321&showapi_timestamp=20161031155621&type="+ty+"&showapi_sign=3625d656d3c43193a1eb45fa1af106bd"
      });
      httpOpts.success(function(res){
        console.log(res);
        $scope.apiResult=res.showapi_res_body.pagebean.contentlist;
        $rootScope.mh.show();
      });
    };
    //漫画详情
    $scope.showmh = function(id){
      $rootScope.mh.hide();
      $scope.disab = false;
      $scope.disabs = true;
      var httpOpts = $http({
        method:"GET",
        url:"http://route.showapi.com/958-2?id="+id+"&showapi_appid=26321&showapi_timestamp=20161031161715&showapi_sign=5a927710221b976e061b1e8ba0fb9428"
      });
      httpOpts.success(function(res){
        console.log(res);
        $scope.apiResult=res.showapi_res_body.item;
        $scope.disabs = false;
        $rootScope.mhDesc.show();
      });
    };

    //漫画
    $ionicModal.fromTemplateUrl('templates/mh.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(mh) {
      $rootScope.mh = mh;
    });
    //漫画详情
    $ionicModal.fromTemplateUrl('templates/mhDesc.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(mhDesc) {
      $rootScope.mhDesc = mhDesc;
    });


    //常用货币 - 处理函数
    $scope.appendItem = function(a,b){
      if($scope.tp == "a"){
        $rootScope.hl.hide();
        $scope.hbCona = a;
        $scope.hbTypea = b;
      }else{
        $rootScope.hl.hide();
        $scope.hbConb = a;
        $scope.hbTypeb = b;
      }
    };
    //作者的话
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    //捐赠
    $ionicModal.fromTemplateUrl('templates/jz.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(jz) {
      $rootScope.jz = jz;
    });
    $scope.lin_jz = function(){
      $rootScope.jz.show();
    };

    //天气
    $ionicModal.fromTemplateUrl('templates/tq.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(tq) {
      $rootScope.tq = tq;
    });
    //返回
    $scope.cyReturn = function(jm){
      $scope.disab = true;
      $scope.disCY =false;
      var opt = {
        callTy:"cyre",
        url:"http://apis.baidu.com/avatardata/chengyu/search?dtype=JSON&keyWord="+jm+"&page=1&rows=120"
      };
      callApi(opt);
    };

    //汇率
    $ionicModal.fromTemplateUrl('templates/hl.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(hl) {
      $rootScope.hl = hl;
    });
    $scope.lin_showTypea = function(){
      $scope.showX = false;
      $scope.tp = "a";
      $rootScope.hl.show();
    };
    $scope.lin_showTypeb = function(){
      $scope.showX = false;
      $scope.tp = "b";
      $rootScope.hl.show();
    };

    //接口调用
    function callApi(opts){
      //接口参数
      var httpOpt = $http({
        method:opts.method?opts.method:"GET",
        url:opts.url,
        headers:{
          apikey:opts.apikey?opts.apikey:"435b35b6abb12353078e99851c922ed1"
        }
      });
      httpOpt.success(function(res){
        console.log(res);
        for(var a in res){
          $scope.ad = res[a];
        }
        if(res != false){
          switch (opts.callTy){

            case "sfz": //身份证
              if(res.error==-1){
                $ionicPopup.alert({
                  title: '错误提示',
                  template: '您输入的信息有误，请重新输入！'
                });
                $scope.disSFZ = false;
              }else{
                $scope.disSFZ = true;
              }
              $scope.disab = false;
              break;

            case "xz":  //星座
              if(res.resultcode == "201"||res.resultcode =="202"){
                $ionicPopup.alert({
                  title: '错误提示',
                  template: '请按格式输入 如：白羊座、金牛座'
                });
                $scope.disXZ = false;
                $scope.disab = false;
              }else{
                delete res.date;
                //delete res.datetime;
                delete res.resultcode;
                delete res.error_code;
                delete res.work;
                $scope.disXZ = true;
              }
              $scope.disab = false;
              break;

            case "sjgs":  //手机归属
              if(res.showapi_res_body.error_info == "手机号码输入格式有误!"){
                $ionicPopup.alert({
                  title: '错误提示',
                  template: '您输入的手机号码有误！'
                });
                $scope.disSJGSD = false;
                $scope.disab = false;
              }else{
                delete res.showapi_res_body.ret_code;
                delete res.showapi_res_body.num;
                delete res.showapi_res_body.provCode;
                delete res.showapi_res_body.type;
                $scope.disSJGSD = true;
                $scope.disab = false;
              }
              break;

            case "tqcx":  //天气查询
              if($scope.ad[0].status == "unknown city"){
                $ionicPopup.alert({
                  title: '错误提示',
                  template: '您输入的城市（地区）暂时未收录！'
                });
                return false;
              }else{
                $rootScope.tq.show();
              }
              $scope.disab = false;
              break;

            case "szt": //深圳通
              if(res.code == 20000 || res.code == 20001){
                $scope.disSZT = false;
                $scope.disab = false;
                $ionicPopup.alert({
                  title: '错误提示',
                  template: '您输入的卡号有误，请确认后输入!'
                });
              }else{
                delete res.data.balance_time;
                $scope.disSZT = true;
                $scope.disab = false;
              }
              break;

            case "cp":  //彩票
              delete res.retData.data[0].openTimeStamp;
              $scope.disCP = true;
              $scope.disab = false;
              break;

            case "xzpd":  //星座配对
              if(res.code == 250){
                $ionicPopup.alert({
                  title: '错误提示',
                  template: '请输入正确的星座名称：白羊座、金牛座等。'
                });
                $scope.disXZPD = false;
                $scope.disab = false;
              }else{
                //$rootScope.xzpd.show();
                $scope.disXZPD = true;
                $scope.disab = false;
              }
              break;

            case "jm":  //解梦
              if(res.code == 250){
                $ionicPopup.alert({
                  title: '错误提示',
                  template: '相关收录为空。'
                });
                $scope.disJM = false;
                $scope.disab = false;
              }else{
                delete res.newslist[0].id;
                delete res.newslist[0].type;
                $scope.disJM = true;
                $scope.disab = false;
              }
              break;

            case "cy":  //成语
              delete res.error_code;
              delete res.reason;
              delete res.total;
              $scope.daq = true;
              $scope.cyLis = true;
              $scope.cyLen = true;
              $scope.disCY = true;
              $scope.disab = false;
              break;

            case "cysy":  //成语释义
              delete res.result.id;
              delete res.result.samples;
              $scope.disCY = true;
              $scope.cyLis = false;
              $scope.cyDesc = true;
              $scope.cyre =true;
              $scope.disab = false;
              break;

            case "cyre":  //成语返回
              $scope.disCY =true;
              $scope.cyLis =true;
              $scope.cyre = false;
              $scope.cyLen = true;
              $scope.cyDesc = false;
              $scope.disab =false;
              break;

            case "tqcx":  //成语返回
              $scope.disTQ =true;
              $scope.disab =false;
              break;
          }
          $scope.apiResult=res;

        }else{
          var alertPopup = $ionicPopup.alert({
            title: '错误提示',
            template: '您输入的信息有误，请重新输入！'
          });
        }
      });
    }

    //影视查询
    $ionicModal.fromTemplateUrl('templates/ysyx.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(ysyx) {
      $rootScope.ysyx = ysyx;
    });
    //影视查询
    $scope.lin_yscx = function(a){
      $scope.disab = true;
      var httpOpts = $http({
        method:"get",
        url:"http://api.avatardata.cn/Movie/Query?key=b74b19cf84d34607b97b2404c4ce5240&name="+a
      });
      httpOpts.success(function(res){
        console.log(res);
        $scope.apiResult=res;
        $scope.disab = false;
      });
      $scope.showX = true;
      $rootScope.ysyx.show();
    };

    //货币列表
    $scope.hlList = function(){
      $scope.showX =false;
    };

    //身份证查询
    $scope.linSFZ = function(linId){
      $scope.disab = true;
      var opt = {
        callTy:"sfz",
        url:"http://apis.baidu.com/chazhao/idcard/idcard?idcard="+linId
      };
      callApi(opt);
    };
    //深圳通查询
    $scope.linSZT = function(linsz){
      $scope.disab = true;
      var opt = {
        callTy:"szt",
        url:"http://apis.baidu.com/appangel/shenzhentong/shenzhentong?id="+linsz
      };

      callApi(opt);
    };
    //星座查询
    $scope.linXZ = function(linxz){
      $scope.disab = true;
      var opt = {
        callTy:"xz",
        url:"http://apis.baidu.com/bbtapi/constellation/constellation_query?consName="+linxz+"&type=today"
      };

      callApi(opt);
    };
    //星座配对
    $scope.linXZPD = function(firXz,lastXz){
      $scope.disab = true;
      var firText = firXz.substring(0,firXz.length-1);
      var lastText = lastXz.substring(0,lastXz.length-1);
      var opt = {
        callTy:"xzpd",
        url:"http://apis.baidu.com/txapi/xingzuo/xingzuo?me="+firText+"&he="+lastText+"&all=1"
      };
      callApi(opt);
    };

    //手机归属地
    $scope.linSJGSD = function(linPhone){
      $scope.disab = true;
      var opt = {
        callTy:"sjgs",
        url:"http://apis.baidu.com/showapi_open_bus/mobile/find?num="+linPhone
      };
      callApi(opt);
    };

    //彩票
    $scope.linCP = function(cpT){
      $scope.disab = true;
      var opt = {
        callTy:"cp",
        url:"http://apis.baidu.com/apistore/lottery/lotteryquery?lotterycode="+cpT+"&recordcnt=1"
      };
      callApi(opt);
    };

    //解梦
    $scope.linJM = function(jm){
      $scope.disab = true;
      var opt = {
        callTy:"jm",
        url:"http://apis.baidu.com/txapi/dream/dream?word="+jm
      };
      callApi(opt);
    };

    //成语
    $scope.linCY = function(jm){
      $scope.disab = true;
      $scope.disab = true;
      var opt = {
        callTy:"cy",
        url:"http://apis.baidu.com/avatardata/chengyu/search?dtype=JSON&keyWord="+jm+"&page=1&rows=120"
      };
      callApi(opt);
    };

    //成语释义
    $scope.lin_cyDesc = function(id){
      $scope.disab = true;
      $scope.disCY = false;
      $scope.cyLen = false;
      var opt = {
        callTy:"cysy",
        url:"http://apis.baidu.com/avatardata/chengyu/lookup?dtype=JOSN&id="+id
      };
      callApi(opt);
    };

    //天气查询
    $scope.linTQ = function(tq){
      $scope.disab = true;
      var opt = {
        callTy:"tqcx",
        url:"http://apis.baidu.com/heweather/weather/free?city="+tq
      };
      callApi(opt);
    };

    //汇率查询
    $scope.lin_hl = function(a,b,c){
      $scope.disab = true;
      var httpOpts = $http({
        method:"get",
        url:"https://route.showapi.com/105-31?fromCode="+a+"&money="+c+"&showapi_appid=26321&showapi_timestamp=20161028163244&toCode="+b+"&showapi_sign=6f154882185a37bb54e7feb4052f8502"
      });
      httpOpts.success(function(res){
        console.log(res);
        $scope.apiResult=res;
        $scope.disab = false;
        $scope.showX = true;
      });
    };
  });
