/**menu star*/
$(function() {
    $("#categories").hover(
		  function() {
		      $(this).find("dd").show();
		  },
		  function() {
		      $(this).find("dd").hide();
		  }
		);
    $("#categories dd").hover(
		  function() {
		      $(this).find("table").show();
		      $(this).find("a.menu").addClass("ahover");
		  },
		  function() {
		      $(this).find('table').hide();
		      $(this).find('a.menu').removeClass('ahover');
		  }
		);
})
function settTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var con = document.getElementById("tab_" + name + "_" + i);
        if (i == cursel) $("#tab_" + name + "_" + i).show();
        else $("#tab_" + name + "_" + i).hide();
    }
}
function inputOnBlur(a, b) {
    a = "#" + a;
    if (jQuery(a).val() == "") {
        jQuery(a).val(b);
        jQuery(a).css("color", "#999999")
    }
}
function inputOnKeyDown(a, b) {
    a.keyCode == "13" && jQuery("#" + b)[0].click()
}
function inputOnFocus(a) {
    a = "#" + a;
    var b = jQuery(a).css("color");
    if (b == "rgb(153, 153, 153)" || b == "#999999") {
        jQuery(a).val("");
        jQuery(a).css("color", "#000000")
    }
}
function InitShopCart() {
    var href = "/Do_ShopCart.html?type=initshopcart";
    jQuery.post(href, function(data) {
        if (document.getElementById("ShopCount") != null) {
            document.getElementById("ShopCount").innerHTML = "(" + data + ")";
        }
    })
}
function GetGiftByrandom() {
    var gift = Math.floor(Math.random() * 10 + 1);
    return gift;
}
function AddToShopCart(id) {
    var gift = GetGiftByrandom();
    if (gift == "")
    { gift = "1"; }
    var href = "/Do_ShopCart.html?type=add&buycount=1&remark=&remark2=&gift=" + gift + "&id=" + id;
    jQuery.post(href, function(data) {
        InitShopCart();
    })
}
function AddToShopCarts(id, bycount, giftid) {
    var href = "/Do_ShopCart.html?type=add&buycount=" + bycount + "&remark=&remark2=&gift=" + giftid + "&id=" + id;
    jQuery.post(href, function(data) {
        InitShopCart();
    })
}
function AddToShopCarts(id, bycount, remark2, giftid) {
    var url = document.URL;
    url = url.toLowerCase();
    var pmix = "";
    var pmix_remark = "";
    if (url.indexOf("productmix.html")) {
        pmix = jQuery("#MixItem").val();
        pmix_remark = jQuery("#MixItem_Remark").val();
    }
    var ispackage = 0;
    if (url.indexOf("/product/")) {
        if ($("#isselectJacket").val() == "1") {
            ispackage = 1;
        }
    }
    var href = "/Do_ShopCart.html?type=add&buycount=" + bycount + "&remark=&remark2=" + escape(remark2) + "&gift=" + giftid + "&id=" + id + "&IsPackage=" + ispackage;
    if (pmix != "") {
        href += "&pmix=" + pmix + "&pmix_remark=" + pmix_remark;
    }
    document.getElementById("addtocart_btn").disabled = true;
    jQuery.post(href, function (data) {
        document.getElementById("addtocart_btn").disabled = false;
        InitShopCart();
    })
}
function GoSearch() {
    var cID = document.getElementById("SearchCategoryID").value;
    var key = document.getElementById("SearchText").value;
    if ($.trim(key) == "Search" || $.trim(key) == "") return;
    if (key != "") {
        key = jQuery.trim(key);
        key = key.replace(/ /gi, "-");
        key = key.replace("&", "-");
        key = key.replace("|", "-");
        key = stripscript(key);
        while (key.indexOf('"') > -1) {
            key = key.replace('"', '');
        }
        if (key.substr(0, 1) == "-") {
            key = key.replace("-", "");
        }
        if (key.substr(key.length - 1, 1) == "-") {
            key = key.substr(0, key.length - 1)
        }
    }
    if (cID > 0 && key != "") {
        location.href = "http://fr.tidebuy.com/" + key + "/";
    }
    else if (key == "" && cID > 0) {
    location.href = "http://fr.tidebuy.com/SearchSkip.html?cid=" + cID;
    }
    else if (key == "") {
        return;
    }
    else {
       location.href = "http://fr.tidebuy.com/questwords.html?key=" + key;
    }
}
/*function stripscript(s) {
    var pattern = new RegExp("/[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】'；：""'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    rs = rs.replace(/\"/gi, "'");
    return rs;
}*/
function stringReplaceAll(AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, "g");
    return this.replace(raRegExp, ARepText)
}
jQuery(document).ready(function() {
    if (location.href.toLowerCase().indexOf('shopcart') > 0) {
        InitIsLog1();
    } else {
        InitIsLog2();
    }
    InitShopCart();
    if ($(".livechart").size() > 0) {
        var servicedatastr = GetServiceTime();
        var thisDate;
        var newServiceTime;
        var isShowLiveChat = false;
        thisDate = new Date(servicedatastr);
        var date = new Date(thisDate);
        var dayOfWeek = date.getDay(); //
        var hourOfDay = date.getHours(); //
        switch (dayOfWeek) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 0:
                //if ((hourOfDay >= 0 && hourOfDay < 6) || (hourOfDay >= 9 && hourOfDay < 18) || (hourOfDay >= 20 && hourOfDay <= 23)) {
                //isShowLiveChat = true;
                //}
                if (hourOfDay >= 10 && hourOfDay < 18) {
                    isShowLiveChat = true;
                }
                break;
        }
        if (isShowLiveChat) {
            $(".livechart").attr("href", "http://c.mpnco.cn/chat/tp.aspx?gId=M4xEnSmy1Yk6i5mTuGoGnX~fVG1hiXAq~2u4s0suMNMtd6TbE91oxqH4czmUO7OI&pId=N0~Q45z46mDSQYK7uAA3dndoXdFZpHdf9qSP406wwaM9l8YSo~lUQIPj0A8W5XjD&oId=&sid=M4xEnSmy1Yk6i5mTuGoGnX~fVG1hiXAq~2u4s0suMNMtd6TbE91oxqH4czmUO7OI").html("Laissez un message");
            $(".livechart").css("background-image", "url(https://s2.tidebuy.com/images/newimages/livechart_pp_online.jpg)");
        }
    }
});
function SubjectEmail() {
    var txtEmail = jQuery("#txtEmails").val();
    if (ValidMail(txtEmail) && txtEmail != '') {
        var href = "/do1.html?type=indexEmail&txtEmail=" + txtEmail;
        jQuery.post(href, function(data) {
            if (data == "ok") {
                alert(" Inscription réussi!");
            }
            else { alert(data); }
        });
    }
    else {
        alert("Veuillez vérifiez votre adresse e-mail. \n\rVotre adresse email devrait ressembler à \"myname@gmail.com \"");
    }
}
function ValidMail(input) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (reg.test(input))
        return true;
    else
        return false;
}
function InitIsLog2() {
    if (document.getElementById("JoinUs")) {
        var href = "/do1.html?type=getuseremail";
        jQuery.post(href, function(data) {
            if (data != "") {
                $("#JoinUs").html("Bienvenue sur Tidebuy!<b id=\"UserName\"></b><a href='http://fr.tidebuy.com/account/'>" + data + "</a> | <a href='http://fr.tidebuy.com/account/'>Mon compte</a> | <a href='http://fr.tidebuy.com/logout.html'>Déconnection</a>");
            }
        });
    }
}
function InitIsLog1() {
    if (document.getElementById("JoinUs")) {
        var href = "/do1.html?type=getuseremail";
        jQuery.post(href, function(data) {
            if (data != "") {
                $("#JoinUs").html("Bienvenue sur Tidebuy!<b id=\"UserName\"></b><a href='http://fr.tidebuy.com/account/'>" + data + "</a> | <a href='http://fr.tidebuy.com/account/'>Mon compte</a> | <a href='http://fr.tidebuy.com/logout.html'>Déconnection</a>");
            }
        });
    }
}
function ClickAD(pid) {
    href = "/do3.html?type=adclick&pid=" + pid;
    jQuery.post(href, function(data) { });
}
function ClickAD(pid, cID) {
    href = "/do3.html?type=adclick&pid=" + pid + "&cid=" + cID;
    jQuery.post(href, function(data) { });
}
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
if (window.ActiveXObject) {
    Sys.ie = ua.match(/msie ([\d.]+)/)[1]
}
if (Sys.ie == "6.0") {
    var clear = "http://s.tidebuy.com/images/clear.gif"; 
    document.write('<script type="text/javascript" id="ct" defer="defer" src="javascript:void(0)"><\/script>'); var ct = document.getElementById("ct"); ct.onreadystatechange = function() { pngfix() }; pngfix = function() { var els = document.getElementsByTagName('*'), ip = /\.png/i, al = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='", i = els.length, uels = new Array(), c = 0; while (i-- > 0) { if (els[i].className.match(/unitPng/)) { uels[c] = els[i]; c++; } } if (uels.length == 0) pfx(els); else pfx(uels); function pfx(els) { i = els.length; while (i-- > 0) { var el = els[i], es = el.style, elc = el.currentStyle, elb = elc.backgroundImage; if (el.src && el.src.match(ip) && !es.filter) { es.height = el.height; es.width = el.width; es.filter = al + el.src + "',sizingMethod='crop')"; el.src = clear; } else { if (elb.match(ip)) { var path = elb.split('"'), rep = (elc.backgroundRepeat == 'no-repeat') ? 'crop' : 'scale', elkids = el.getElementsByTagName('*'), j = elkids.length; es.filter = al + path[1] + "',sizingMethod='" + rep + "')"; es.height = el.clientHeight + 'px'; es.backgroundImage = 'none'; if (j != 0) { if (elc.position != "absolute") es.position = 'static'; while (j-- > 0) if (!elkids[j].style.position) elkids[j].style.position = "relative"; } } } } }; };
}
jQuery(document).ready(function() {
    jQuery(".cat-item").each(function() {
        var nav_c = jQuery(this);
        if (jQuery(this).find(".nav") != undefined) {
            jQuery(this).hover(
			    function() { nav_c.find(".cat-item_list").show(); },
				function() { nav_c.find(".cat-item_list").hide(); }
			  )
            jQuery(nav_c.find(".cat-item_list")).hover(
			    function() { jQuery(this).show(); },
				function() { jQuery(this).hide(); }
			  )
        }
        jQuery(".nav:last").css("border-right", "none");
    });
    ChangeGBfade();
    $(".cat-item").hover(
    function() {
        $(this).addClass("nav_bg");
        $(this).find("a.nav").css("color", "#fff");

    },
    function() {
        $(this).removeClass("nav_bg");
        $(this).find("a.nav").css("color", "#333");
    }
    );
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    $(".Fabric dd").each(function() {
        if (Sys.ie) {
            var lis = $(this).find("li").length;
            if (lis > 9) {
                $(this).css("border", "1px solid #ccc");
                $(this).css("height", "143px");
            }
        }
        else {
            var height = parseInt($(this).css("height"));
            if (height > 148) {
                $(this).css({ "height": "148px", "border": "1px solid #ccc" });
            }
        }
    });
    $("#left-menu dl:has('dd')").addClass("hasdd");
    jQuery("a.menus").click(function() { 
        jQuery(this).parent().find("ul").slideToggle('fast');
    });
})
function ChangeGBfade() {
    if ($(".GBfade") == null) return;
    $(".GBfade").mouseover(
	   function() {
	       $(this).stop(true).animate({ opacity: 0.7 }, { duration: 205 })
	   });
    $(".GBfade").mouseout(function() {
        $(this).stop(true).animate({ opacity: 1 }, { duration: 205 })
    }
	  )
}
$(document).ready(function() {
    $("#back-top").hide();
    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });
        $('#back-top a').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
});
$(document).ready(function() {
    var stat = document.createElement('script'); stat.type = 'text/javascript'; stat.async = true;
    stat.src = ("https:" == document.location.protocol ? "https://" : "http://") + "stat.reportide.com/frtidebuy/stat.aspx?n=" + Math.random() + "&bUrl=" + escape(document.referrer);
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(stat, s);
});
var GetServiceTime = function() {
    var serverTime = "";
    jQuery.ajax({
        type: "post",
        url: "/show.html?type=time",
        async: false,
        success: function(data) { serverTime = data; }
    });
    return serverTime;
}
var GetNewServiceTime = function() {
    var serverTime = "";
    jQuery.ajax({
        type: "post",
        url: "/show.html?type=timer",
        async: false,
        success: function(data) { serverTime = data; }
    });
    return serverTime;
}
var tidebuy_time = function(time, enddate, tageIds) {
    initTime = time;
    var x = show(time, enddate);
    timer = setInterval(function() {
        time = parseInt(time) + parseInt(1000);
        x = show(time, enddate);
        if (x != 0 && tageIds.length == 4)
        { $("#" + tageIds[0]).html(x.split('^')[0]); $("#" + tageIds[1]).html(x.split('^')[1]); $("#" + tageIds[2]).html(x.split('^')[2]); $("#" + tageIds[3]).html(x.split('^')[3]); }
        else { $("#" + tageIds[0]).html("0"); $("#" + tageIds[1]).html("0"); $("#" + tageIds[2]).html("0"); $("#" + tageIds[3]).html("0"); }
    }, 1000);
}
function show(time, enddate) {
    var dateHtml = "{0}/{1}/{2} {3}:{4}:{5}";
    var timeOffset = ((-1 * (new Date()).getTimezoneOffset()) - (8 * 60)) * 60000;
    var now = new Date(time - timeOffset);
    var nMS = new Date(enddate).getTime() - now.getTime();
    if (nMS > 0) {
        var nD = Math.floor(nMS / (1000 * 60 * 60 * 24));
        var nH = Math.floor(nMS / (1000 * 60 * 60)) % 24;
        var nM = Math.floor(nMS / (1000 * 60)) % 60;
        var nS = Math.floor(nMS / 1000) % 60;
        return nD + "^" + nH + "^" + nM + "^" + nS
    }
    return 0;
}
$(document).ready(function() {
    if (typeof (endDateforBanner) != "undefined" && endDateforBanner != null) {
        tidebuy_time(GetNewServiceTime(), endDateforBanner, new Array('h_days', 'h_hour', 'h_minute', 'h_seconds'));
     }  
});
function ChanageParameter() {
    var priceFrom = $("#new_pricestart").val();
    var priceTo = $("#new_priceend").val();
    if (priceTo < priceFrom) { alert("veuillez vérifier le montant"); return; }
    var tags = document.getElementsByName("tags");
    var tag = "begin";
    $.each($("a[name='tags']"), function() {
        if ($(this).attr("class") != "enabled disabled") {
            tag += "-" + $(this).attr("value");
        }
    })
    tag += "-end";
    if (tag == "begin-end") {
        tag = "";
    }
    var l_href = location.href.split('/');
    var href = "http://" + l_href[2] + "/" + l_href[3] + "/";
    if (priceFrom != "" && priceTo != "" && priceTo != 0) {
        if (href.substr(href.length - 1, 1) != "-" && href.substr(href.length - 1, 1) != "/") {
            href += "-";
        }
        href += "under-" + priceFrom.replace(".0", "") + "-" + priceTo.replace(".0", "");
    }
    var orderby = document.getElementById("orderby").value;
    if (orderby != "Recommended") {
        if (href.substr(href.length - 1, 1) != "-" && href.substr(href.length - 1, 1) != "/") {
            href += "-";
        }
        href += orderby;
    }
    if (tag != "") {
        if (href.substr(href.length - 1, 1) != "-" && href.substr(href.length - 1, 1) != "/") {
            href += "-";
        }
        href += tag;
    }
    var pagesize = document.getElementById("pages").value;
    if (pagesize != 48 || pagesize != "48") {
        if (href.substr(href.length - 1, 1) != "-" && href.substr(href.length - 1, 1) != "/") {
            href += "-";
        }
        if (href.split('/')[4] == "") {
            href += "Page-";
        }
        href += pagesize;
    }
    if (href.substr(href.length - 1, 1) != "/") {
        href += "/";
    }
    location.href = href;
}
function getStyle(obj, attr) {
      if (obj.currentStyle) {return obj.currentStyle[attr];}
              else {return getComputedStyle(obj, false)[attr];}
          }
function startMove(obj, json, fnEnd) {
              clearInterval(obj.timer);
              obj.timer = setInterval(function() {
                  var attr = '';
                  var iTotal = 0;
                  var iArrived = 0;
                  for (attr in json) {
                      iTotal++;
                      var iCur = 0;

                      if (attr == 'opacity') {
                          iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
                      }
                      else {
                          iCur = parseInt(getStyle(obj, attr));
                      }
                      var iSpeed = (json[attr] - iCur) / 4;
                      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                      if (iCur == json[attr]) {
                          iArrived++;
                      }
                      else {
                          if (attr == 'opacity') {
                              obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                              obj.style.opacity = (iCur + iSpeed) / 100;
                          }
                          else {
                              obj.style[attr] = iCur + iSpeed + 'px';
                          }
                      }
                  }
                  if (iArrived == iTotal) {
                      clearInterval(obj.timer);
                      if (fnEnd) {
                          fnEnd();
                      }
                  }
              }, 30);
          }
function getByClass(oParent, sClass) {
              var aEle = oParent.getElementsByTagName('*');
              var aResult = [];
              var re = new RegExp('\\b' + sClass + '\\b', 'i');
              var i = 0;
              for (i = 0; i < aEle.length; i++) {
                  if (re.test(aEle[i].className)) {
                      aResult.push(aEle[i]);
                  }
              }
              return aResult;
          }


          /* 新版广告系统用到的js begin*/
          //jquery.cookie.js
          jQuery.cookie = function(name, value, options) {
              if (typeof value != 'undefined') { // name and value given, set cookie
                  options = options || {};
                  if (value === null) {
                      value = '';
                      options.expires = -1;
                  }
                  var expires = '';
                  if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                      var date;
                      if (typeof options.expires == 'number') {
                          date = new Date();
                          date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                      } else {
                          date = options.expires;
                      }
                      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                  }
                  // CAUTION: Needed to parenthesize options.path and options.domain
                  // in the following expressions, otherwise they evaluate to undefined
                  // in the packed version for some reason...
                  var path = options.path ? '; path=' + (options.path) : '';
                  var domain = options.domain ? '; domain=' + (options.domain) : '';
                  var secure = options.secure ? '; secure' : '';
                  document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
              } else { // only name given, get cookie
                  var cookieValue = null;
                  if (document.cookie && document.cookie != '') {
                      var cookies = document.cookie.split(';');
                      for (var i = 0; i < cookies.length; i++) {
                          var cookie = jQuery.trim(cookies[i]);
                          // Does this cookie string begin with the name we want?
                          if (cookie.substring(0, name.length + 1) == (name + '=')) {
                              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                              break;
                          }
                      }
                  }
                  return cookieValue;
              }
          };


          function isMobile() {
              var c = navigator.userAgent.toLowerCase();
              var g = c.match(/ipad/i) == "ipad";
              var h = c.match(/iphone os/i) == "iphone os";
              var f = c.match(/midp/i) == "midp";
              var d = c.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
              var e = c.match(/ucweb/i) == "ucweb";
              var a = c.match(/android/i) == "android";
              var b = c.match(/windows ce/i) == "windows ce";
              var j = c.match(/windows mobile/i) == "windows mobile";
              if (screen.availWidth < 800 || g || h || f || d || e || a || b || j) {
                  return true
              } else {
                  return false
              }
          };






(function () {
    var po = document.createElement('script');
    po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/client:plusone.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

function signinCallback(authResult) {
    if (authResult) {
        if (authResult["error"] == undefined) {  // 是否有错
            gapi.client.load("oauth2", "v2", function () {     // 加载api
                var request = gapi.client.oauth2.userinfo.get();
                request.execute(function (user) {
                    $.cookie('google_access_token', gapi.auth.getToken().access_token);
                    if (user) { // 取得登录邮箱并显示
                        var isShopcartPage = "0";
                        var ids = "";
                        if ($("#googleLoginShopcart").length > 0) {
                            isShopcartPage = "1";
                            ids = Check();
                        }

                        $.post("/do2.aspx?type=googleLogin",
                            {
                                googleId: user.id,
                                email: user.email,
                                isShopcart: isShopcartPage,
                                ids: ids
                            },
                            function (data) {
                                if (data == "ok") {
                                    if ($("#googleLoginBuyNow").length > 0) {//Buy Now
                                        Pay();
                                    } else {
                                        var returnUrl = "";
                                        if ($("#strURL").length > 0) {
                                            returnUrl = $("#strURL").val();
                                        }

                                        if (returnUrl != "") {
                                            location.href = returnUrl;
                                        } else {
                                            location.reload();
                                        }
                                    }
                                }
                                else if (data != "error") {//ShopCart Login
                                    isCreated = true;
                                    ids = data;
                                    isNext = 'True';
                                    Next(ids);
                                }
                                else {
                                    window.alert("Sorry, login error!");
                                }
                            }
                        );
                    }
                });
            });
        }
    }
}



//***************多币种切换 2013-05-29 yangjun add********************//
function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 

var currencySigns = { "USD": "USD $", "EUR": "EUR €", "JPY": "JPY ¥", "GBP": "GBP ￡", "AUD": "AUD $", "HKD": "HKD $", "CHF": "CHF ₣", "CAD": "CAD $" };
var currencySignsOnly = { "USD": "$", "EUR": "€", "JPY": "¥", "GBP": "￡", "AUD": "$", "HKD": "$", "CHF": "₣", "CAD": "$" }; ;
var defaultCurrency = "EUR";
var defaultCountryID = "71";  //表示法国
var lochref = location.href.toLowerCase()

var toNewPrice = function(price) {
    var currency = cookiey("FRcurrency");
    if (currency == null || typeof currency == "undefined") {
        currency = defaultCurrency; //默认值
    }
    var rate = currencyRates[currency];
    var newPrice = 0.00;
    if (isNaN(price)) {//非数字
        newPrice = price;
    }
    else {
        try {
            newPrice = price * rate;
        }
        catch (e) { newPrice = price; }
        //重新显示当前选择币种对应的价格
        if (currency == "JPY") {//日元取整
            newPrice = Math.round(newPrice);
        }
        else if(currency == "EUR"){
             newPrice = (newPrice.toFixed(2)+"").replace(".",",");
        }
        else {
            newPrice = newPrice.toFixed(2);
        }
    }
    return newPrice;
};
var toOldPrice = function(price) {
    var currency = cookiey("FRcurrency");
    if (currency == null || typeof currency == "undefined") {
        currency = defaultCurrency; //默认值
    }
    var rate = currencyRates[currency];
    var newPrice = 0.00;
    if (isNaN(price)) {//非数字
        newPrice = price;
    }
    else {
        try {
            newPrice = price / rate;
        }
        catch (e) { newPrice = price; }
        //重新显示当前选择币种对应的价格
        if (currency == "JPY") {//日元取整
            newPrice = Math.round(newPrice);
        }
        else if(currency == "EUR"){
           newPrice = (newPrice.toFixed(2)+"").replace(".",",");
        }
        else {
            newPrice = newPrice.toFixed(2);
        }
    }
    return newPrice;
};

var getecomm_prodidcurrency = function () {
    var currency = getCookie("FRcurrency");
    if (currency == null || typeof currency == "undefined") {
        currency = defaultCurrency; //默认值
    }
    //USD对应prodid_us，GBP对应prodid_gb，CAD对应prodid_ca，AUD对应prodid_au。
    var comm_prodidcurrency = "_us";
    if (currency == "GBP") {
        comm_prodidcurrency = "_gb";
    }
    else if (currency == "CAD") {
        comm_prodidcurrency = "_ca";
    }
    else if (currency == "AUD") {
        comm_prodidcurrency = "_au";
    }
    return comm_prodidcurrency;
}


//切换站点currency
var changeCurrency = function() {
    var currency = cookiey("FRcurrency");
    if (currency == null) {
        currency = defaultCurrency; //默认值
        setCurrency(currency);
    }
    
    var fu = "€"
    if (currency == "USD") {
        fu = "$";;
    }
    else if (currency == "CHF") {
        fu = "₣";
    }
    else if (currency == "CAD") {
        fu = "$";
    }
    
    $("#CurrencyHuobidiv").html(fu + " " + currency);
    var countryID = cookiey("FRcountryID");
    if (countryID == null) {
        countryID = defaultCountryID;
        setCountryID(countryID);
    }
    
    jQuery(".fuhao").each(function() {//更新货币符号
        var currencySign = currencySigns[currency];
        jQuery(this).html(currencySign);
    });
    jQuery(".huobi").each(function() {//更新货币价格
        var price = jQuery(this).attr("data-price");
        var newPrice = 0;
        newPrice = toNewPrice(price);
        if ($(this).attr("type") == "hidden") {
            jQuery(this).val(newPrice);
        }
        else {
            jQuery(this).html(newPrice);
        }

    });
    jQuery(".huobi1").each(function() {//更新货币价格
        var price = jQuery(this).attr("data-price");
        var newPrice = 0;
        newPrice = parseFloat(toNewPrice(price)).toFixed(0);
        if ($(this).attr("type") == "hidden") {
            jQuery(this).val(newPrice);
        }
        else {
            jQuery(this).html(newPrice);
        }

    });

    jQuery(".huobi2").each(function() {//更新allPrice货币价格
        var newPrice = CurrencyCalculate(currencyRates[cookiey("FRcurrency")]);
        var count = jQuery("#sellNum").val();
        newPrice = (newPrice / count).toFixed(2);
        if ($(this).attr("type") == "hidden") {
            jQuery(this).val(newPrice);
            jQuery(this).val((newPrice * count).toFixed(2))
        }
        else {
            jQuery(this).html(newPrice);
            jQuery(this).html((newPrice * count).toFixed(2))
        }

    });
    jQuery(".huobi3").each(function() {//更新infoPrice货币价格
        var price = jQuery("#infoprice").attr("data-price");
        var Cprice = jQuery("#allPrices").attr("data-price");
        var count = jQuery("#sellNum").val();
        var newPrice = CurrencyCalculate(currencyRates[cookiey("FRcurrency")]);
        newPrice = (newPrice / count).toFixed(2);
        if ($(this).attr("type") == "hidden") {
            jQuery(this).val(newPrice);
        }
        else {
            jQuery(this).html(newPrice);
        }

    });



    //终端页必选区 多币种
    if (lochref.indexOf('/product/') > -1) {
       
        $(".transform").hover(function() { $(this).addClass("hover"); }, function() { $(this).removeClass("hover"); });
        if (isMobile()) {
            $("#specil").click(function() {
               $(".transform").addClass("hover");
            });
        }
        
      
        var currencyspan_Con = "<span class=\"fuhao_one\">" + currency + "</span><i class=\"t_" + currency + "\"></i>";
        $("#specil").html(currency);
        $("#productdollar").html(currencySignsOnly[currency]);
    }
};


//设置cookie里的currency
var setCurrency = function(currency) {
    if (currency != null) {
        cookiey("FRcurrency", currency, { expires: 365, path: "/", domain: 'tidebuy.com' });
    }
    else {
        cookiey("FRcurrency", defaultCurrency, { expires: 365, path: "/", domain: 'tidebuy.com' });
    }
};

//获取货币符号 只有符号 例如 $
function GetCurrencySignOnly() {
    var currency = getCookie("currency");
    if (currency == null) {
        currency = defaultCurrency; //默认值
        setCurrency(currency);
    }
    var currencySignOnly = currencySignsOnly[currency];
    return currencySignOnly;
}

//获取货币符号
function GetCurrencySign() {
    var currency = cookiey("FRcurrency");
    if (currency == null) {
        currency = defaultCurrency; //默认值
        setCurrency(currency);
    }
    var currencySign = currencySigns[currency];
    return currencySign;
}
//设置cookie里的Country
var setCountryID = function(countryID) {
    if (countryID != null) {
        cookiey("FRcountryID", countryID, { expires: 365, path: "/", domain: 'tidebuy.com' });
    }
    else {
        cookiey("FRcountryID", defaultCountryID, { expires: 365, path: "/", domain: 'tidebuy.com' });
    }
};
var getWeishu = function() {
    var weishu = 2;
    var fuhao = GetCurrencySign();
    if (fuhao == "JPY ¥") {
        weishu = 0;
    }
    return weishu;
}


//更新价格为默认币种[美元]价格
var toDefaultPrice = function(price) {
    var currency = cookiey("FRcurrency");
    if (currency == null) {
        currency = defaultCurrency; //默认值
    }
    var rate = currencyRates[currency];
    var usPrice = 0.00;
    if (isNaN(price)) {//非数字
        usPrice = price;
    }
    else {
        try {
            usPrice = price / rate;
        }
        catch (e) { usPrice = price; }
        usPrice = usPrice.toFixed(0);
    }
    return usPrice;
};

function cookiey(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

jQuery(document).ready(function() {

        $(".changeM").hover(function() { $(this).addClass("hover"); }, function() { $(this).removeClass("hover"); });
       
        if (isMobile()) {
            $("#CurrencyHuobidiv").click(function() {
                $(".changeM").addClass("hover");
            });
        }

        
    //多币种
    if (true) {
        changeCurrency();

        $("#CurrencyCountryul div").click(function() {
            $("#CurrencyCountry").html($(this).html());
            var id = "," + $(this).attr("id").replace("country", "") + ",";
            var currenry = "EUR";

            //            if (CHF.indexOf(id) > -1) {
            //                currenry = "CHF";
            //            }else if (CAD.indexOf(id) > -1) {
            //                currenry = "CAD";
            //            }else if (USD.indexOf(id) > -1) {
            //                currenry = "USD";
            //            }else{
            //                currenry = "EUR";
            //            }
            //            
            setCountryID($(this).attr("id").replace("country", ""));
            setCurrency(currenry);
            changeCurrency();
        });
        $("#CurrencyHuobi li,#Multi_currency li").click(function() {
            var CurrencyValue = $(this).find('span').html();
            setCurrency(CurrencyValue);
            changeCurrency();
            //$(this).parents('ul').hide();
            //$(this).parents('dd').find('span').eq(0).removeClass('on_c');
            //location.href = location.href;
            $(".changeM").removeClass("hover");
            $(".transform").removeClass("hover");
        });

    }


    jQuery("a.menus").click(function() { //When trigger is clicked...
        jQuery(this).parent().find("ul").slideToggle('fast'); //Drop down the subnav on click
    });

});
//***************多币种切换********************//




// facebook 登录
(function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));
window.fbAsyncInit = function () {
    FB.init({
        appId: '714676521967076',
        channelUrl: '//fr.tidebuy.com/channel.html',
        status: true,
        cookie: true,
        xfbml: false,
        oauth: true,
        version: 'v2.5'
    });

    // FB.getLoginStatus(checkLoginStatus);
};
function authUser() {
    FB.login(checkLoginStatus, { scope: 'email,publish_actions'});
}
function checkLoginStatus(response) {
    if (response && response.status == 'connected') {
        FB.api('/me?fields=id,email', function (user) {
            if (user) {
                var url = "/do2.html?type=fblogin2&strURL=http://fr.tidebuy.com&LoginID=" + user.id + "&LoginEmail=" + user.email + "&LoginRember=   ";
                $.post(url, function (data) {
                    if (data == "0") {
                        if (window.location.href.indexOf("login.html") > -1) {
                            window.href = "/";
                        }
                        else {
                            window.location.reload();
                        }
                    }
                    else if (data == "1") {
                        window.location.href = "/Login.html?error=1&fbid=" + user.id;
                    }
                    else if (data == "2") {
                        window.location.href = "/Login.html?error=2&fbid=" + user.id;
                    }
                }, "text");
            }
        });
    }
    else if (response.status == 'not_authorized') {
        //_gaq.push(['_trackEvent', 'FaceBook登陆结果', 'Fails to get the authorization from your Facebook.']);
        window.location.href = "/Login.html?error=notauthorized";
    }
}