define("biz_wap/utils/ajax_load_js.js",["biz_wap/utils/ajax.js","biz_wap/utils/localstorage.js"],function(e){
"use strict";
function n(e){
var n=d(e.url,e.version),o=function(){},i=function(){};
if("function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(i=e.onError),
c(e.win,n))return void o({
code:1,
queueIndex:0
});
if(e.useCache){
var a=u(e.url,e.version);
if(a&&t({
win:e.win,
funcStr:a,
useCache:!1,
url:e.url,
version:e.version
}),c(e.win,n))return void o({
code:2,
queueIndex:0
});
}
if(S.callbackQueue.push({
options:e,
onSuccess:o,
onError:i
}),"undefined"==typeof S.jsLoadState[n]&&(S.jsLoadState[n]=-1),-1==S.jsLoadState[n]){
var s=e.url;
s+=-1==s.indexOf("?")?"?"+S.customerParam+"="+e.version:"&"+S.customerParam+"="+e.version,
r({
originUrl:e.url,
version:e.version,
url:s,
key:n
});
}
}
function r(e){
S.jsLoadState[e.key]=1,w({
url:e.url,
notJoinUrl:!0,
timeout:1e4,
type:"POST",
dataType:"text",
noXRequestedWidthHeader:!0,
success:function(n){
if(1==S.jsLoadState[e.key]){
S.jsLoadState[e.key]=-1;
var r=!0;
r=n?t({
win:null,
funcStr:n,
useCache:!0,
url:e.originUrl,
version:e.version
}):!1,o(r?{
code:3,
type:"suc",
funcStr:n
}:{
code:51,
type:"err"
});
}
},
error:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:52,
type:"err"
}));
},
complete:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:53,
type:"err"
}));
}
});
}
function t(e){
var n=e.win||window,r=!0;
try{
n.eval(e.funcStr),r=!0;
}catch(t){
r=!1;
}
return r?(s({
url:e.url,
version:e.version,
win:n
}),e.useCache&&a(e.url,e.version,e.funcStr),!0):(l({
url:e.url,
version:e.version,
win:n
}),i(e.url),!1);
}
function o(e){
for(var n=0,r=S.callbackQueue.length;r>n;n++){
var o=S.callbackQueue[n],u=o.options,i=u.win,a=d(u.url,u.version);
"suc"==e.type?(e.funcStr&&!c(i,a)&&t({
win:i,
funcStr:e.funcStr,
useCache:!1,
url:u.url,
version:u.version
}),o.onSuccess({
code:e.code,
queueIndex:n
})):o.onError({
code:e.code,
queueIndex:n
});
}
S.callbackQueue=[];
}
function u(e,n){
var r=f(e),t=y.get(r);
if(!t)return null;
var o;
try{
o=JSON.parse(t);
}catch(u){}
if(o){
var a=+new Date,c=1*o.time;
return a-c>S.lsTimeout||o.version!=n||!o.func?(i(e),null):o.func;
}
}
function i(e){
var n=f(e);
y.remove(n);
}
function a(e,n,r){
var t={
version:n,
func:r,
time:+new Date
},o=f(e);
try{
y.set(o,JSON.stringify(t));
}catch(u){}
}
function c(e,n){
return e=e||window,e[S.winCacheKey]&&e[S.winCacheKey][n]&&e[S.winCacheKey][n].state===!0?!0:!1;
}
function s(e){
var n=d(e.url,e.version),r=e.win||window;
r[S.winCacheKey]||(r[S.winCacheKey]={}),r[S.winCacheKey][n]||(r[S.winCacheKey][n]={}),
r[S.winCacheKey][n].state=!0;
}
function l(e){
var n=d(e.url,e.version),r=e.win||window;
if(r[S.winCacheKey]&&r[S.winCacheKey][n])try{
delete r[S.winCacheKey][n];
}catch(t){}
}
function f(e){
return encodeURIComponent(e);
}
function d(e,n){
return encodeURIComponent(e)+"_"+n||"";
}
function v(e){
l(e),i(e.url);
}
var w=e("biz_wap/utils/ajax.js"),y=e("biz_wap/utils/localstorage.js"),S={
jsLoadState:{},
winCacheKey:"__loadExternalJsStates__",
lsTimeout:1728e5,
customerParam:"wxv",
callbackQueue:[]
};
return{
ClearCache:v,
Load:n
};
});define("appmsg/comment.js",["biz_common/dom/class.js","appmsg/cmt_tpl.html.js","biz_common/utils/wxgspeedsdk.js","appmsg/comment_report.js","biz_wap/utils/device.js","appmsg/retry_ajax.js","biz_common/dom/offset.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/fakehash.js","appmsg/log.js","appmsg/comment_tpl.html.js","appmsg/friend_comment_tpl.html.js","appmsg/my_comment_tpl.html.js","appmsg/emotion/emotion.js","appmsg/emotion/dom.js"],function(e,t,n,o){
"use strict";
function m(e,t){
e&&(e.style.display=t?t:"block");
}
function i(e){
e&&(e.style.display="none");
}
function c(){
setTimeout(function(){
m(mt.toast);
},750),setTimeout(function(){
i(mt.toast);
},1500);
}
function d(e){
return e.replace(/^\s+|\s+$/g,"");
}
function s(e,t){
if(!(Math.random()<.999)){
var n=window.location.protocol,o=9;
"https:"==n&&(o=18),H.saveSpeeds({
uin:uin,
pid:o,
speeds:[{
sid:29,
time:e
},{
sid:30,
time:t
}]
}),H.send();
}
}
function l(e,t){
if("undefined"!=typeof e){
var n=new Image;
n.src=X.idkey?"//mp.weixin.qq.com/mp/jsmonitor?idkey="+(X.idkey+"_"+e+"_1")+"&t="+Math.random():"http://mp.weixin.qq.com/mp/jsreport?key="+e+"&content="+(t||"")+"&r="+Math.random();
}
}
function a(){
return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
}
function _(e){
e=e===!0,e&&(K=0);
var t=a(),n=document.documentElement.scrollHeight;
if(t+U+100>n&&P.off(window,"scroll",_),!(et||-1==K||K>0&&n-t-U>500)){
if("number"==typeof window.comment_count&&0==window.comment_count&&!e)return void r({
enabled:1,
elected_comment:[],
friend_comment:[],
elected_comment_total_cnt:0,
my_comment:[],
only_fans_can_comment:window.only_fans_can_comment,
is_fans:window._is_fans,
logo_url:window._logo_url,
nick_name:window._nick_name
});
var o=+new Date;
et=!0,i(mt.tips),m(mt.loading);
var c="/mp/appmsg_comment?action=getcomment&scene="+X.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+N+"&offset="+K+"&limit="+V+(window.send_time?"&send_time="+send_time:"");
try{
st++,e&&(dt=[]),st>1&&!e&&l(X.moreList,encodeURIComponent(c)),dt.indexOf(c)>-1&&l(X.repeatList,encodeURIComponent(c)),
dt.push(c);
}catch(d){}
!!S&&console.info("[????????????] ????????????????????????:",c),W("[Appmsg comment] start get comment data, url:"+c),
Y({
url:c,
type:"get",
success:function(t){
var n=+new Date,m=n-o,i={};
try{
i=window.eval.call(window,"("+t+")");
}catch(d){}
window.test_comment_data&&(i=window.test_comment_data);
var a=i.base_resp&&i.base_resp.ret;
if(0==a){
r(i,e);
var _=+new Date-n;
s(m,_);
}else l(X.errList,"type:resperr;url:"+encodeURIComponent(c)+";ret="+a);
W("[Appmsg comment] get comment success");
},
error:function(){
l(X.errList,"type:ajaxerr;url:"+encodeURIComponent(c)),W("[Appmsg comment] get comment ajax error");
},
complete:function(){
et=!1,i(mt.loading),P.off(window,"scroll",D);
}
});
}
}
function r(e,t){
var n,o,c=document.createDocumentFragment(),d=document.createDocumentFragment();
l(X.handleList,encodeURIComponent(JSON.stringify({
comment_id:N,
offset:K,
url:location.href
}))),"undefined"!=typeof e.only_fans_can_comment?window.can_fans_comment_only=e.only_fans_can_comment:"undefined"==typeof window.can_fans_comment_only&&(window.can_fans_comment_only=0),
1!=e.enabled?(L&&(L.style.display="none"),M&&i(M),e.elected_comment=[],e.friend_comment=[],
e.elected_comment_total_cnt=0,e.friend_comment_total_cnt=0):(L&&(L.style.display="block"),
M&&m(M)),0==K?(tt=e.logo_url,nt=e.nick_name,t&&(it=[]),n=e.elected_comment,n&&n.length?(f(n,c,"elected"),
t&&(mt.list.innerHTML=""),mt.list.appendChild(c),m(mt.main),0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?m(document.getElementById("js_cmt_addbtn1")):m(document.getElementById("js_cmt_nofans1"),"block"),
e.elected_comment_total_cnt<=10&&(m(document.getElementById("js_cmt_statement")),
m(document.getElementById("js_cmt_qa")))):(i(mt.main),0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?m(document.getElementById("js_cmt_addbtn2")):m(document.getElementById("js_cmt_nofans2"),"block")),
o=e.friend_comment,f(o,d,"friend"),o&&0==o.length&&i(M),t&&(mt.fdlist.innerHTML=""),
mt.fdlist.appendChild(d),o&&o.length?(m(mt.fdmain),(0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans)&&(i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2")),m(document.getElementById("js_cmt_addbtn3")))):i(mt.fdmain),
e.friend_comment.length>0||e.elected_comment.length>0,function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var n=t.offsetTop;
window.scrollTo(0,n-25);
}
}()):(n=e.elected_comment,n&&n.length&&(f(n,c,"elected"),mt.list.appendChild(c))),
0==e.elected_comment_total_cnt?(K=-1,i(document.getElementById("js_cmt_loading")),
i(document.getElementById("js_cmt_statement")),i(document.getElementById("js_cmt_qa"))):K+V>=e.elected_comment_total_cnt?(K=-1,
i(document.getElementById("js_cmt_loading")),m(document.getElementById("js_cmt_statement")),
m(document.getElementById("js_cmt_qa"))):K+=e.elected_comment.length;
}
function p(){
G.log("tag1");
var e=d(mt.input.value);
if(G.log("tag2"),!z.hasClass(mt.submit,"btn_disabled")){
if(G.log("tag3"),e.length<1)return w("??????????????????");
if(G.log("tag4"),e.length>600)return w("??????????????????600???");
G.log("tag5"),z.addClass(mt.submit,"btn_disabled"),G.log("tag6");
var t=document.getElementById("activity-name");
G.log("tag7"),lt!=e&&(at=+new Date);
var n=function(t){
{
var n=document.createDocumentFragment();
document.createDocumentFragment();
}
c(),console.log("------------------------",window.friend_comment_enabled),f([{
content:e,
nick_name:nt,
create_time:(new Date).getTime()/1e3|0,
is_elected:0,
logo_url:tt,
like_status:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:t.my_id,
content_id:t.content_id
}],n,"mine"),mt.mylist.insertBefore(n,mt.mylist.firstChild);
m(mt.mylist.parentNode),mt.input.value="",k();
};
if(window.test_comment_data)return void n({
my_id:"111"
});
var o="/mp/appmsg_comment?action=addcomment&scene="+X.scene+"&comment_id="+N+"&__biz="+biz+"&idx="+idx+"&appmsgid="+appmsgid+"&sn="+sn;
Y({
url:o,
data:{
content:e,
title:t&&d(t.innerText),
head_img:tt,
nickname:nt,
client_id:at
},
type:"POST",
success:function(t){
G.log("tag8"),$.hidePannel();
var m={};
try{
m=window.eval.call(window,"("+t+")");
}catch(i){}
switch(+m.ret){
case 0:
n(m);
break;

case-6:
w("??????????????????????????????????????????");
break;

case-7:
w("????????????????????????????????????????????????");
break;

case-10:
w("??????????????????600???");
break;

case-15:
w("???????????????");
break;

default:
lt=e,w("????????????????????????");
}
0!=m.ret&&l(X.addCommentErr,"type:resperr;url:"+encodeURIComponent(o)+";ret="+m.ret);
},
error:function(e){
G.log("shit;"+e.status+";"+e.statusText),l(X.addCommentErr,"type:ajaxerr;url:"+encodeURIComponent(o));
},
complete:function(){
""!=mt.input.value&&z.removeClass(mt.submit,"btn_disabled");
}
});
}
}
function u(){
if(0==ot){
var e="/mp/appmsg_comment?action=getmycomment&scene="+X.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+N,t=document.getElementById("js_mycmt_loading");
ot=1,m(t),Y({
url:e,
type:"get",
success:function(t){
var n={};
try{
n=window.eval.call(window,"("+t+")");
}catch(o){}
var i=n.base_resp&&n.base_resp.ret;
if(0==i){
var c=n.my_comment,d=document.createDocumentFragment();
c&&c.length&&(f(c,d,"mine"),mt.mylist.appendChild(d),m(mt.mylist.parentNode)),ot=2;
}else ot=0,l(X.errComment,"type:resperr;url:"+encodeURIComponent(e)+";ret="+i);
},
error:function(){
ot=0,l(X.errComment,"type:ajaxerr;url:"+encodeURIComponent(e));
},
complete:function(){
i(t);
}
});
}
}
function g(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var o=t/1e3-e,m=n/1e3-e,i=new Date(n).getFullYear(),c=new Date(1e3*e);
return 3600>o?Math.ceil(o/60)+"?????????":86400>m?Math.floor(o/60/60)+"?????????":172800>m?"??????":604800>m?Math.floor(m/24/60/60)+"??????":c.getFullYear()==i?c.getMonth()+1+"???"+c.getDate()+"???":c.getFullYear()+"???"+(c.getMonth()+1)+"???"+c.getDate()+"???";
}
function f(e,t,n){
var o,m="",i=document.createElement("div"),c="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0",d="";
"elected"==n?d=0:"friend"==n&&(d=1),ct={};
for(var s,a=0;s=e[a];++a){
s.time=g(s.create_time),s.status="",s.logo_url=s.logo_url||c,s.logo_url=-1!=s.logo_url.indexOf("wx.qlogo.cn")?s.logo_url.replace(/\/132$/,"/96"):s.logo_url,
s.content=s.content.htmlDecodeLite().htmlEncodeLite(),s.nick_name=s.nick_name.htmlDecodeLite().htmlEncodeLite(),
s.like_num_format=parseInt(s.like_num)>=1e4?(s.like_num/1e4).toFixed(1)+"???":s.like_num,
s.is_from_friend="friend"==n?0:s.is_from_friend||0,s.is_from_me="mine"==n?1:s.is_from_me||0,
s.reply=s.reply||{
reply_list:[]
},s.is_mine=n?!1:!0,s.is_elected="elected"==n||"friend"==n?1:s.is_elected,s.is_top="friend"==n?0:s.is_top,
s.report_elected=s.is_elected||0,s.report_friend=s.is_from_friend||0,s.scene=d,s.reply.reply_list.length>0&&(s.reply.reply_list[0].time=g(s.reply.reply_list[0].create_time),
s.reply.reply_list[0].content=(s.reply.reply_list[0].content||"").htmlEncodeLite(),
s.reply.reply_list[0].reply_like_status=s.reply.reply_list[0].reply_like_status||0,
s.reply.reply_list[0].reply_like_num=s.reply.reply_list[0].reply_like_num||0,s.reply.reply_list[0].reply_like_num_format=parseInt(s.reply.reply_list[0].reply_like_num)>=1e4?(s.reply.reply_list[0].reply_like_num/1e4).toFixed(1)+"???":s.reply.reply_list[0].reply_like_num),
s.new_appmsg=window.new_appmsg,m+=J.tmpl(x,s);
try{
var _=s.nick_name+s.content,r=!1,p=X.repeatContentID;
ct[_]&&(r=!0,p=X.repeatContent),it.indexOf(s.content_id)>-1&&(r=!0,p=X.repeatContentID),
it.push(s.content_id),ct[_]=!0,r&&l(p,encodeURIComponent(JSON.stringify({
comment_id:N,
content_id:s.content_id,
offset:K,
length:e.length,
url:location.href
})));
}catch(u){}
}
for(i.innerHTML=m,y(i);o=i.children.item(0);)t.appendChild(o);
}
function y(e){
G.each(e.querySelectorAll("div.discuss_message_content"),function(e){
e.innerHTML=$.encode(e.innerHTML);
});
}
function w(e){
return setTimeout(function(){
o(e);
});
}
function h(){
var e="1"===q.getParam("js_my_comment");
e&&j(!0);
}
function j(e){
Z=a(),i(mt.article),m(mt.mine),window.__second_open__&&R.os.ios&&m(mt.fakebar),window.scrollTo(0,0),
u(),e||G.later(function(){
mt.input.focus();
});
}
function b(){
i(mt.mine),m(mt.article),console.log(Z),window.scrollTo(0,Z),mt.input.blur();
}
function I(e){
var t=e.delegatedTarget||e.srcElement,n=null;
if(z.hasClass(t,"js_comment_praise")&&(n=t),n){
for(var o=parseInt(n.dataset.status),m=0==o?1:0,i=n.dataset.contentId,c=n.dataset.scene,d=document.querySelectorAll('.js_comment_praise[data-content-id="'+i+'"]'),s=0;s<d.length;s++)v(d[s]);
if(window.test_comment_data)return;
A({
url:"/mp/appmsg_comment?action=likecomment",
type:"POST",
data:{
like:m,
__biz:biz,
appmsgid:appmsgid,
comment_id:N,
content_id:i,
item_show_type:window.item_show_type||0,
scene:c
}
});
}
}
function E(e){
for(var t=e.delegatedTarget,n=parseInt(t.dataset.status),o=n?0:1,m=t.dataset.contentId,i=t.dataset.replyId,c=t.dataset.scene,d=document.querySelectorAll('.js_reply_praise[data-content-id="'+m+'"]'),s=0;s<d.length;s++)v(d[s]);
document.querySelector("meta[name=viewport]"),window.test_comment_data||Y({
url:"/mp/appmsg_comment?action=like_author_reply",
type:"post",
data:{
__biz:biz,
comment_id:N,
content_id:m,
reply_id:i,
like:o,
scene:c,
item_show_type:window.item_show_type||0
}
});
}
function v(e){
var t=z.hasClass(e,"praised"),n=e.querySelector(".praise_num"),o=n.innerHTML,m=o.indexOf("???"),i=parseInt(o)?parseInt(o):0;
t?(-1==m&&(n.innerHTML=i-1>0?i-1:""),z.removeClass(e,"praised"),e.dataset.status=0):(-1==m&&(n.innerHTML=i+1),
z.addClass(e,"praised"),e.dataset.status=1);
}
function k(){
mt.list.children.length?mt.fdlist.children.length?(m(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn1")),i(document.getElementById("js_cmt_addbtn2")),
i(document.getElementById("js_cmt_addbtn4"))):(m(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2")),i(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn4"))):mt.fdlist.children.length?(m(document.getElementById("js_cmt_addbtn3")),
i(document.getElementById("js_cmt_addbtn4")),i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn2"))):(m(document.getElementById("js_cmt_addbtn2")),
i(document.getElementById("js_cmt_addbtn3")),i(document.getElementById("js_cmt_addbtn1")),
i(document.getElementById("js_cmt_addbtn4")));
}
function B(e){
var t=e.delegatedTarget,n=t.getAttribute("data-my-id"),m="/mp/appmsg_comment?action=delete&scene="+X.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+N+"&my_id="+n;
confirm("??????????????????")&&Y({
url:m,
success:function(e){
var m,c=t;
try{
e=JSON.parse(e);
}catch(d){
e={};
}
if(0==e.ret){
for(;c&&(c.nodeType!=c.ELEMENT_NODE||"li"!=c.tagName.toLowerCase());)c=c.parentNode;
if(c){
c.parentNode.removeChild(c),m=document.getElementById("cid"+n);
for(var s=document.querySelectorAll(".cid"+n),l=0;l<s.length;l++)s[l].parentNode.removeChild(s[l]);
0==mt.list.children.length?(i(mt.main),i(document.getElementById("js_cmt_statement")),
i(document.getElementById("js_cmt_qa")),0==mt.fdlist.children.length&&i(mt.fdmain)):0==mt.fdlist.children.length&&i(mt.fdmain),
0==mt.mylist.children.length&&i(mt.mylist.parentNode),mt.list.children.length+mt.fdlist.children.length==0,
k();
}
}else o("????????????????????????");
},
error:function(){
o("????????????????????????");
}
});
}
function C(e){
e&&e.preventDefault(),b(),i(mt.fakebar);
}
function D(){
try{
var e=mt.loading.getBoundingClientRect(),t=Math.random()<1;
e.top<U&&et&&t&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_45_1&lc=1&log0",
P.off(window,"scroll",D));
}catch(n){}
}
function T(e){
var t=document.createElement("a");
t.setAttribute("href",e),this.el=t,this.parser=this.el,this.getParam=function(e){
var t=new RegExp("([?&])"+e+"=([^&#]*)([&#])?"),n=this.el.search.match(t);
return n?n[2]:null;
};
}
var z=e("biz_common/dom/class.js"),x=e("appmsg/cmt_tpl.html.js"),L=document.getElementById("js_cmt_area"),M=document.getElementById("js_friend_cmt_area"),q=new T(window.location.href),H=e("biz_common/utils/wxgspeedsdk.js"),O=e("appmsg/comment_report.js"),S=location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,R=e("biz_wap/utils/device.js"),A=e("appmsg/retry_ajax.js"),F=e("biz_common/dom/offset.js"),N=0;
window._has_comment=!0;
var U=window.innerHeight||document.documentElement.clientHeight;
if("undefined"!=typeof window.comment_id?N=window.comment_id:window.cgiData&&"undefined"!=typeof window.cgiData.comment_id&&(N=window.cgiData.comment_id),
!!S&&console.info("[????????????] ??????ID:",N),-1!=navigator.userAgent.indexOf("MicroMessenger")||window.test_comment_data||(L&&(L.style.display="none"),
M&&(M.style.display="none"),N=0,window._has_comment=!1),0==N)return void(window._has_comment=!1);
var P=e("biz_common/dom/event.js"),Y=e("biz_wap/utils/ajax.js"),J=(e("biz_common/utils/string/html.js"),
e("biz_common/tmpl.js")),Q=e("biz_wap/utils/fakehash.js"),W=e("appmsg/log.js"),X={
scene:0,
idkey:"",
moreList:27,
repeatList:25,
errList:18,
handleList:26,
addCommentErr:19,
errComment:18,
repeatContent:24,
repeatContentID:23
},Z=null;
window.__commentReportData&&window.__commentReportData.idkey&&(!!S&&console.log("init reportData"),
X=window.__commentReportData),function(){
if(L){
var t=e("appmsg/comment_tpl.html.js");
L.innerHTML=J.tmpl(t,{
new_appmsg:window.new_appmsg
});
}
if(M){
var n=e("appmsg/friend_comment_tpl.html.js");
M.innerHTML=J.tmpl(n,{
new_appmsg:window.new_appmsg
});
}
}(),function(){
var t=e("appmsg/my_comment_tpl.html.js"),n=document.createElement("div");
n.innerHTML=J.tmpl(t,{
new_appmsg:window.new_appmsg,
friend_comment_enabled:window.friend_comment_enabled,
isIos:R.os.ios
}),document.body.appendChild(n);
}();
var $=e("appmsg/emotion/emotion.js"),G=e("appmsg/emotion/dom.js"),K=(new Image,0),V=100,et=!1,tt="",nt="???",ot=0,mt={
article:document.getElementById("js_article"),
mine:document.getElementById("js_cmt_mine"),
main:document.getElementById("js_cmt_main"),
input:document.getElementById("js_cmt_input"),
submit:document.getElementById("js_cmt_submit"),
goback:document.getElementById("js_cmt_goback"),
addbtn:document.getElementById("js_cmt_addbtn"),
list:document.getElementById("js_cmt_list"),
mylist:document.getElementById("js_cmt_mylist"),
morelist:document.getElementById("js_cmt_morelist"),
toast:document.getElementById("js_cmt_toast"),
tips:document.getElementById("js_cmt_tips"),
loading:document.getElementById("js_cmt_loading"),
fdmain:document.getElementById("js_friend_cmt_main"),
fdlist:document.getElementById("js_friend_cmt_list"),
fdlisthide:document.getElementById("js_friend_cmt_list_hide"),
morefdlist:document.getElementById("js_more_friend_cmt_area"),
morefd:document.getElementById("js_more_friend_cmt"),
fakebar:document.getElementById("js_fake_bar"),
cmtContainer:document.getElementById("js_cmt_container")
},it=[],ct={},dt=(new Image,[]),st=0,lt=null,at=+new Date;
if(window.__second_open__&&R.os.ios&&(mt.mine.style.marginBottom=getComputedStyle(mt.fakebar).height),
function(){
_(),h(),$.init();
}(),Q.on("comment",function(){
!!S&&console.log("FakeHash on comment"),j();
}),Q.on("article",function(){
!!S&&console.log("FakeHash on article"),b();
}),Q.on(function(e){
"comment"==e&&b();
}),P.on(mt.input,"input",function(){
var e=d(mt.input.value);
e.length<1?z.addClass(mt.submit,"btn_disabled"):z.removeClass(mt.submit,"btn_disabled");
}),P.on(mt.list,"tap",".js_comment_praise",I),P.on(mt.mylist,"tap",".js_comment_praise",I),
P.on(mt.fdlist,"tap",".js_comment_praise",I),P.on(mt.list,"tap",".js_reply_praise",E),
P.on(mt.fdlist,"tap",".js_reply_praise",E),P.on(mt.list,"tap",".js_del",B),P.on(mt.mylist,"tap",".js_del",B),
P.on(mt.fdlist,"tap",".js_del",B),P.on(mt.list,"tap",".js_del",function(e){
e.preventDefault();
}),P.on(mt.mylist,"tap",".js_del",function(e){
e.preventDefault();
}),P.on(mt.fdlist,"tap",".js_del",function(e){
e.preventDefault();
}),P.on(mt.submit,"tap",p),P.on(mt.submit,"click",function(e){
e.preventDefault();
}),mt.goback&&(P.on(mt.goback,"tap",C),P.on(mt.goback,"click",C)),window.__second_open__&&R.os.ios){
P.on(mt.input,"tap",function(){
i(mt.fakebar);
}),P.on(mt.input,"blur",function(){
console.log("input blur"),"none"!=mt.mine.style.display&&m(mt.fakebar);
});
var _t=null,rt=null;
P.on(window,"orientationchange",function(){
"none"!==mt.fakebar.style.display&&(clearTimeout(_t),_t=setTimeout(function(){
window.innerWidth!==parseFloat(getComputedStyle(mt.fakebar).width)&&(clearTimeout(rt),
mt.mine.style.height=U+"px",window.scrollBy&&window.scrollBy(0,1),rt=setTimeout(function(){
window.scrollBy&&window.scrollBy(0,-1),mt.mine.style.height="";
},100));
},50));
});
}
P.on(window,"scroll",_),P.on(window,"scroll",D),P.on(document.getElementById("js_cmt_write1"),"click",function(e){
e.preventDefault(),window.__second_open__&&R.os.ios?j():(!!S&&console.log("push comment"),
Q.push("comment"));
}),P.on(document.getElementById("js_cmt_write2"),"click",function(e){
e.preventDefault(),window.__second_open__&&R.os.ios?j():(!!S&&console.log("push comment"),
Q.push("comment"));
}),P.on(document.getElementById("js_cmt_write3"),"click",function(e){
e.preventDefault(),window.__second_open__&&R.os.ios?j():(!!S&&console.log("push comment"),
Q.push("comment"));
}),P.on(document.getElementById("js_cmt_write4"),"click",function(e){
e.preventDefault(),window.__second_open__&&R.os.ios?j():(!!S&&console.log("push comment"),
Q.push("comment"));
}),P.bindVisibilityChangeEvt(function(e){
e&&a()<F.getOffsetTop(mt.cmtContainer)-U&&_(!0);
}),new O({
comment_id:N,
appmsgid:appmsgid,
idx:idx,
item_show_type:window.item_show_type||0,
biz:biz
});
});define("a/ios.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/utils/openUrl.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e){
"undefined"!=typeof WeixinJSBridge&&WeixinJSBridge.log&&WeixinJSBridge.log(e);
}
function i(e,t){
n("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function o(e){
var o=e.btn;
if(!o)return!1;
var n=e.adData,c=!1,d={};
e.report_param=e.report_param||"";
var s="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(n.appinfo_url)+"&ticket="+(e.ticket||window.ticket)+"#wechat_redirect";
r.on(o,"click",function(){
if(t("click @js_app_action"),c)return t("is_app_installed"),i(n.is_appmsg?17:13,e),
void p(n.app_id+"://");
var o=function(){
t("download"),i(n.is_appmsg?15:11,e),t("go : "+s),p(s);
};
return t("download"),n.rl&&n.traceid?d[n.traceid]||(d[n.traceid]=!0,a({
url:"/mp/advertisement_report?report_type=2&type="+n.type+"&url="+encodeURIComponent(n.appinfo_url)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&tid="+n.traceid+"&rl="+encodeURIComponent(n.rl)+"&pt="+n.pt+e.report_param,
type:"GET",
timeout:1e3,
complete:function(){
t("ready to download"),d[n.traceid]=!1,o();
},
async:!0
})):o(),!1;
});
}
{
var r=e("biz_common/dom/event.js"),n=e("biz_common/utils/report.js"),a=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
e("biz_wap/jsapi/core.js");
}
return o;
});define("a/android.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/openUrl.js"],function(n,e,a,t){
"use strict";
function o(n){
"undefined"!=typeof s&&s.log&&s.log(n);
}
function i(n,e){
l("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+n+e.report_param);
}
function d(n){
function e(){
s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var e=n.err_msg;
e.indexOf("get_install_state:yes")>-1&&(window.clearInterval(x),k=!0,d.innerHTML=T.installed);
});
}
function a(){
j&&s.invoke("queryDownloadTask",{
download_id:j
},function(e){
if(e&&e.state){
if("download_succ"==e.state){
o("download_succ"),i(c.is_appmsg?18:14,n),window.clearInterval(y),I=!1,b=!0,d.innerHTML=T.downloaded;
var a=document.createEvent("MouseEvents");
a.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),d.dispatchEvent(a);
}
if("downloading"==e.state)return;
("download_fail"==e.state||"default"==e.state)&&(o("fail, download_state : "+e.state),
window.clearInterval(y),I=!1,t("????????????"),d.innerHTML=T.download);
}
});
}
var d=n.btn;
if(!d)return!1;
var l={},c=n.adData,p="",u="",_=c.androiddownurl;
if(_&&_.match){
var m=/&channelid\=([^&]*)/,w=_.match(m);
w&&w[1]&&(p="&channelid="+w[1],c.androiddownurl=_.replace(m,""));
}
n.via&&(u=["&via=ANDROIDWX.YYB.WX.ADVERTISE",n.via].join("."));
var f=!1,v="com.tencent.android.qqdownloader",g=1060125,k=!1,I=!1,b=!1,j=0,y=null,x=null,T={
download:"??????",
downloading:"?????????",
downloaded:"??????",
installed:"?????????"
};
d.innerHTML=T.download,s.ready(function(){
s.invoke("getInstallState",{
packageName:v
},function(n){
var e=n.err_msg;
o("getInstallState @yingyongbao : "+e);
var a=e.lastIndexOf("_")+1,t=e.substring(a);
1*t>=g&&e.indexOf("get_install_state:yes")>-1&&(f=!0);
}),s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var e=n.err_msg;
o("getInstallState @"+c.pkgname+" : "+e);
var a=e.lastIndexOf("_")+1,t=e.substring(a);
1*t>=c.versioncode&&e.indexOf("get_install_state:yes")>-1&&(k=!0,d.innerHTML=T.installed);
}),d.addEventListener("click",function(){
if(o("click @js_app_action"),!I){
if(k)return!1;
if(b)return s.invoke("installDownloadTask",{
download_id:j,
file_md5:c.md5sum
},function(n){
var a=n.err_msg;
o("installDownloadTask : "+a),a.indexOf("install_download_task:ok")>-1?x=setInterval(e,1e3):t("???????????????");
}),!1;
var _=function(){
return f?(i(c.is_appmsg?16:12,n),void(location.href="tmast://download?oplist=1,2&pname="+c.pkgname+p+u)):void s.invoke("addDownloadTask",{
task_name:c.appname,
task_url:c.androiddownurl,
extInfo:n.task_ext_info,
file_md5:c.md5sum
},function(e){
var l=e.err_msg;
o("addDownloadTask : "+l),l.indexOf("add_download_task:ok")>-1?(i(c.is_appmsg?15:11,n),
I=!0,j=e.download_id,o("download_id : "+j),d.innerHTML=T.downloading,y=setInterval(a,1e3)):t("????????????????????????");
});
};
return c.rl&&c.traceid?l[c.traceid]||(l[c.traceid]=!0,r({
url:"/mp/advertisement_report?report_type=2&type="+c.type+"&url="+encodeURIComponent(c.androiddownurl)+"&tid="+c.traceid+"&rl="+encodeURIComponent(c.rl)+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pt="+c.pt+"&r="+Math.random(),
type:"GET",
timeout:1e3,
complete:function(){
l[c.traceid]=!1,_();
},
async:!0
})):_(),!1;
}
});
});
}
{
var l=(n("biz_common/dom/event.js"),n("biz_common/utils/report.js")),r=n("biz_wap/utils/ajax.js"),s=n("biz_wap/jsapi/core.js");
n("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
}
return d;
});define("a/profile.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_wap/utils/position.js","biz_wap/utils/openUrl.js","biz_wap/jsapi/core.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function t(e,t){
d("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function n(e,t){
if(t&&t.crt_exp_info)try{
var n=JSON.parse(t.crt_exp_info.html());
n.is_new_profile?b.invoke("profile",{
username:n.username
}):(console.log("exp to profile h5"),f(e));
}catch(i){
console.error("decode crt_exp_info error",t),f(e);
}else f(e);
return!1;
}
function i(e){
var i=e.adData,l=e.pos_type||0,f={},j=e.a_info;
e.report_param=e.report_param||"",function(){
function m(e){
{
var t=y.dataset;
"https:"==top.location.protocol?1500:1200;
}
if(t.rl&&t.url&&t.type&&t.tid){
var n=t.tid,o=t.type,a=t.url,s=t.rl;
if(!f[n]){
f[n]=!0;
var r,p,c,d,m=!!e&&e.target;
m&&(r=u.getX(m,"js_ad_link")+e.offsetX,p=u.getY(m,"js_ad_link")+e.offsetY,c=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
d=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
_({
type:o,
report_type:2,
click_pos:0,
url:encodeURIComponent(a),
tid:n,
rl:encodeURIComponent(s),
__biz:biz,
pos_type:l,
pt:i.pt,
pos_x:r,
pos_y:p,
ad_w:c||0,
ad_h:d||0
},function(){
f[n]=!1,v();
});
}
}else v();
}
var y=e.btnAddContact,w=e.btnViewProfile;
if(y&&y.dataset){
var k=function(o,a){
var s=o.err_msg,r=i.is_appmsg?6:1;
-1!=s.indexOf("ok")?(w.style.display="inline-block",y.style.display="none",r=i.is_appmsg?9:4):"add_contact:added"==s?r=i.is_appmsg?7:2:"add_contact:cancel"==s?r=i.is_appmsg?8:3:(--a,
a>=0?b.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
k(e,a);
}):(s="addContact:fail|msg:"+s+"|uin:"+uin+"|biz:"+biz,d("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+s+"&r="+Math.random()),
n(i.url,j))),t(r,e);
},v=function(){
t(i.is_appmsg?10:5,e),g.setSum(110696,7,1),o?g.setSum(110696,10,1):(o=!0,a=+new Date),
s?+new Date-s<2e3&&(g.setSum(110696,11,1),setTimeout(function(){
s=0;
},2e3)):s=+new Date,r?+new Date-r<3e3&&(g.setSum(110696,12,1),setTimeout(function(){
r=0;
},3e3)):r=+new Date,p?+new Date-p<4e3&&(g.setSum(110696,13,1),setTimeout(function(){
p=0;
},4e3)):p=+new Date,b.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
var t=+new Date-a;
g.setAvg(110696,9,t).send(),o=!1,k(e,1);
});
};
c.on(y,"click",m);
}
}(),function(){
var t=e.btnViewProfile;
t&&c.on(t,"click",function(){
var t=e.btnAddContact.dataset,o={
source:4,
tid:t.tid,
idx:idx,
mid:mid,
appuin:biz,
pt:i.pt,
aid:e.aid,
ad_engine:e.ad_engine,
pos_type:l
},a=m.join(i.url,o);
return n(a,e.a_info),!1;
});
}(),function(){
var o=e.btnProfile;
if(o){
var a=function(o,s,r){
var p=o.err_msg,c=i.is_appmsg?6:1;
-1!=p.indexOf("ok")?(e.adData.biz_info.is_subscribed=1,console.log(r),r.innerHTML=r.innerHTML.replace("??????","??????"),
c=i.is_appmsg?9:4):"add_contact:added"==p?c=i.is_appmsg?7:2:"add_contact:cancel"==p?c=i.is_appmsg?8:3:(--s,
s>=0?b.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
a(e,s,r);
}):(p="addContact:fail|msg:"+p+"|uin:"+uin+"|biz:"+biz,d("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+p+"&r="+Math.random()),
n(i.url,e.a_info))),t(c,e);
},s=function(n){
t(i.is_appmsg?10:5,e),b.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
a(e,1,n);
});
};
c.on(o,"click",function(t){
if(console.log("has_click",f,e.adData),e.adData.biz_info.is_subscribed){
var o=e.adData;
o.tid=o.traceid;
var a={
source:4,
tid:o.tid,
idx:idx,
mid:mid,
appuin:biz,
pt:i.pt,
aid:e.aid,
ad_engine:e.ad_engine,
pos_type:l
},r=m.join(i.url,a);
n(r,e.a_info);
}else{
{
var o=e.adData;
"https:"==top.location.protocol?1500:1200;
}
if(o.tid=o.traceid,o.rl&&o.url&&o.type&&o.tid){
var p=o.tid,c=o.type,r=o.url,d=o.rl;
if(!f[p]){
console.log("has_click[tid]",f[p]),f[p]=!0;
var b,g,j,y,w=!!t&&t.target;
w&&(b=u.getX(w,"js_ad_link")+t.offsetX,g=u.getY(w,"js_ad_link")+t.offsetY,j=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
y=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
_({
type:c,
report_type:2,
click_pos:0,
url:encodeURIComponent(r),
tid:p,
rl:encodeURIComponent(d),
__biz:biz,
pos_type:l,
pt:i.pt,
pos_x:b,
pos_y:g,
ad_w:j||0,
ad_h:y||0
},function(){
f[p]=!1,s(w);
});
}
}else{
var w=!!t&&t.target;
s(w);
}
}
return!1;
});
}
}();
}
var o,a,s,r,p,c=e("biz_common/dom/event.js"),d=e("biz_common/utils/report.js"),l=e("a/a_report.js"),_=l.AdClickReport,m=(e("biz_wap/utils/ajax.js"),
e("biz_common/utils/url/parse.js")),u=e("biz_wap/utils/position.js"),f=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,b=e("biz_wap/jsapi/core.js"),g=("https:"==top.location.protocol?5:0,
window.__report,e("biz_common/utils/monitor.js"));
return i;
});define("a/app_card.js",["biz_common/dom/event.js","biz_common/dom/class.js","a/a_report.js","biz_wap/utils/position.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/appdialog_confirm.js","biz_wap/utils/openUrl.js","a/a_utils.js","biz_common/utils/url/parse.js"],function(a,t,e,n){
"use strict";
function o(a){
"undefined"!=typeof c&&c.log&&c.log(a);
}
function s(a){
this.g={
app_status:"download",
btn:null,
download_id:0,
clock:null,
install_clock:null,
data:{},
channelid:"",
via:"",
report_param:"",
appdetail_params:"",
btn_percent:0,
btn_width:0,
btn_height:0
};
var t=this,e=this.g;
if(e.btn=a.btn,!e.btn)return!1;
e.data=a.adData,e.url_scheme=a.url_scheme,e.appdetail_params=a.appdetail_params||"",
e.percentStatus=a.percentStatus;
var s={};
e.channelid=e.data.channel_id||"",e.report_param=a.report_param;
var i=20;
if(("103"==e.data.pt||"104"==e.data.pt)&&t.setAppRating(a),"104"==e.data.pt||"113"==e.data.pt||"114"==e.data.pt||"122"==e.data.pt||e.data.use_new_protocol>0&&12==e.data.product_type){
var r=e.data.androiddownurl;
if(r&&r.match){
var _=/&channelid\=([^&]*)/,g=r.match(_);
g&&g[1]&&(e.channelid=g[1],e.data.androiddownurl=r.replace(_,""));
}
e.channelid&&(e.channelid="&channelid="+e.channelid),a.via&&(e.via=["&via=ANDROIDWX.YYB.WX.ADVERTISE",a.via].join("."));
}
c.ready(function(){
console.log("appcard info",e),("113"==e.data.pt||"114"==e.data.pt||"104"==e.data.pt||"122"==e.data.pt||e.data.use_new_protocol>0&&12==e.data.product_type)&&(c.invoke("getInstallState",{
packageName:b
},function(a){
var t=a.err_msg;
o("getInstallState @yingyongbao : "+t);
var e=t.lastIndexOf("_")+1,n=t.substring(e);
1*n>=v&&t.indexOf("get_install_state:yes")>-1&&(h=!0);
}),c.invoke("getInstallState",{
packageName:e.data.pkgname
},function(a){
var n=a.err_msg;
o("getInstallState @"+e.data.pkgname+" : "+n);
var s=n.lastIndexOf("_")+1,d=n.substring(s);
n.indexOf("get_install_state:yes")>-1&&t.setBtn(1*d>=e.data.versioncode&&e.url_scheme?"gotodetail":"installed");
})),console.log("bind btn",e.btn.id),d.on(e.btn,"click",function(d){
if(console.log("app click",e),console.log(d.target),"installed"==e.app_status)return t.setBtn("installed"),
!1;
if("gotodetail"==e.app_status)return t.report(74),t.gotoDetail(),!1;
if("downloading"==e.app_status)return t.report(71),t.pauseDownload(),!1;
if("paused"==e.app_status)return t.report(72),t.resumeDownload(),!1;
if("downloaded"==e.app_status)return t.report(73),c.invoke("installDownloadTask",{
download_id:e.download_id,
file_md5:e.data.md5sum
},function(a){
var s=a.err_msg;
o("installDownloadTask : "+s),s.indexOf("install_download_task:ok")>-1?e.install_clock=setInterval(t.installStateChange.bind(t),500):n("???????????????");
}),!1;
var r=function(){
if("103"==e.data.pt||"111"==e.data.pt||"112"==e.data.pt||"121"==e.data.pt||e.data.use_new_protocol>0&&19==e.data.product_type){
t.report(23);
var s=e.data.ticket||window.ticket;
if(e.url_scheme&&u.gtVersion("6.5.6",!0)){
var d=1,r=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
r&&r[1]&&parseInt(r[1].split("_")[0],10)>=12&&(d=0);
var l={
schemeUrl:e.url_scheme,
messageExt:e.url_scheme,
appID:e.data.app_info.open_platform_appid,
installSchemeUrl:e.data.app_info.appinfo_url,
installAction:d
};
c.invoke("launchApplication",l,function(a){
(-1===a.err_msg.indexOf("ok")||"fail"===a.launchInstallResult)&&w.openWebAppStore(e.data.appinfo_url,s);
});
}else w.openWebAppStore(e.data.appinfo_url,s);
}else{
if(h)return t.report(16),void(location.href="tmast://download?oplist=1,2&pname="+e.data.pkgname+e.channelid+e.via);
t.report(15);
var p=[e.data.adid,e.data.traceid,(e.data.pkgname||"").replace(/\./g,"_"),e.data.source,i,a.engine].join("."),_=function(a,t,e){
console.log("addDownloadTask : "+a.data.appname+","+a.data.androiddownurl+","+t+","+a.data.md5sum),
c.invoke("addDownloadTaskStraight",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},function(n){
var o=n.err_msg;
o.indexOf("ok")>-1?e&&e(n):c.invoke("addDownloadTask",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},e);
}),a.url_scheme&&u.isAndroid&&u.gtVersion("6.5.6",!0)&&c.invoke("writeCommData",{
packageName:a.data.pkgname,
data:a.url_scheme
},function(a){
console.log(a);
});
};
console.log("addDownloadTask : "+e.data.appname+","+e.data.androiddownurl+","+p+","+e.data.md5sum),
_(e,p,function(a){
var s=a.err_msg;
o("addDownloadTask : "+s),s.indexOf("ok")>-1?(e.download_id=a.download_id,y[e.download_id]=t,
o("download_id : "+e.download_id),t.setBtn("downloading"),e.clock=setInterval(t.queryDownloadState.bind(t),500),
e.install_clock=setInterval(t.installStateChange.bind(t),500),t.changeDownloadState()):n("????????????????????????");
});
}
},_=function(){
return u.isIOS?void r():void m({
app_name:e.data.appname,
app_img_url:e.data.icon_url,
onOk:function(){
r(),t.report(h?106:100);
},
onCancel:function(){
t.report(h?107:101);
}
});
};
if("download"==e.app_status&&e.data.rl&&e.data.traceid){
if(!s[e.data.traceid]){
s[e.data.traceid]=!0;
var g,f,b,v,k=!!d&&d.target;
k&&(g=p.getX(k,"js_ad_link")+d.offsetX,f=p.getY(k,"js_ad_link")+d.offsetY,b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
v=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
l({
type:e.data.type,
report_type:2,
click_pos:0,
url:encodeURIComponent(e.data.androiddownurl),
tid:e.data.traceid,
rl:encodeURIComponent(e.data.rl),
__biz:biz,
pos_type:a.pos_type||0,
pt:e.data.pt,
pos_x:g,
pos_y:f,
ad_w:b||0,
ad_h:v||0
},function(){
s[e.data.traceid]=!1,_();
});
}
}else _();
return!1;
});
});
}
var d=a("biz_common/dom/event.js"),i=a("biz_common/dom/class.js"),r=a("a/a_report.js"),l=r.AdClickReport,p=a("biz_wap/utils/position.js"),_=a("biz_common/utils/report.js"),c=a("biz_wap/jsapi/core.js"),u=a("biz_wap/utils/mmversion.js"),m=a("a/appdialog_confirm.js"),g=a("biz_wap/utils/openUrl.js"),w=a("a/a_utils.js"),f={
download:"??????",
downloading:"?????????",
paused:"??????",
downloaded:"??????",
gotodetail:"??????",
installed:"?????????"
},h=!1,b="com.tencent.android.qqdownloader",v=1060125,k=!1,y={},j=g.openUrlWithExtraWebview;
return s.prototype.report=function(a){
var t=this.g;
_("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+a+t.report_param);
},s.prototype.setBtn=function(a,t){
var e=this.g,n=e.data.pt;
if(e.app_status=a,e.percentStatus)return e.percentStatus(a,t),!1;
if("downloading"===a){
t=t||0;
var o="";
if(e.btn_width=e.btn.offsetWidth,e.btn_height=e.btn.offsetHeight,104===n?o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">??????('+t+"%)</span>":113===n||114===n?e.btn.innerHTML.indexOf("??????")>-1?(o=e.btn.innerHTML,
o=o.replace("??????","??????")):o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">??????</span>':122===n?(e.btn.innerHTML.indexOf("??????")>-1?(o=e.btn.innerHTML,
o=o.replace(/??????/g,"??????")):o='<span class="btn_progress_inner js_btn_process" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+e.btn_width+'px;">??????</span></span>??????',
e.btn_percent=t):1===e.data.use_new_protocol?(e.btn_width=e.btn.offsetWidth,e.btn_height=e.btn.offsetHeight,
e.btn.innerHTML.indexOf("??????")>-1?(o=e.btn.innerHTML,o=o.replace(/??????/g,"??????")):o='<span class="btn_progress_inner js_btn_process" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+e.btn_width+"px; line-height: "+e.btn_height+'px">????????????</span></span>????????????',
e.btn_percent=t):o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">'+t+"%</span>",
!o)return;
e.btn.innerHTML=o,122===n||1===e.data.use_new_protocol?i.addClass(e.btn,"btn_progress"):i.addClass(e.btn,"with_processor");
}else if("paused"===a){
var o="";
104===n||113===n||114===n||122===n||e.data.use_new_protocol>0?(o=e.btn.innerHTML,
o=o.replace(/??????/g,"??????"),e.btn.innerHTML=o):(i.removeClass(e.btn,"with_processor"),
i.removeClass(e.btn,"btn_progress"),e.btn.innerHTML=f[a]);
}else i.removeClass(e.btn,"with_processor"),i.removeClass(e.btn,"btn_progress"),
e.btn.innerHTML=f[a],e.data.use_new_protocol>0&&"gotodetail"===a&&(e.btn.innerHTML="????????????");
},s.prototype.setAppRating=function(a){
var t=this.g,e=a.js_app_rating,n=1*t.data.app_rating;
n>5&&(n=5),0>n&&(n=0);
var o=["","one","two","three","four","five"],s="",d=Math.floor(n);
if(s="star_"+o[d],n>d&&(n=d+.5,s+="_half"),e&&n>0){
var r=e.getElementsByClassName("js_stars"),l=e.getElementsByClassName("js_scores");
r&&l&&r[0]&&l[0]&&(r=r[0],l=l[0],r.style.display="inline-block",i.addClass(r,s));
}
},s.prototype.changeDownloadState=function(){
if(!k){
{
this.g;
}
k=!0,c.on("wxdownload:progress_change",function(a){
y[a.download_id]&&y[a.download_id].setBtn("downloading",a.progress);
});
}
},s.prototype.queryDownloadState=function(){
var a=this.g,t=this;
a.download_id&&c.invoke("queryDownloadTask",{
download_id:a.download_id
},function(e){
if(o("queryDownloadTask : "+e.state+"; dowloadid = "+a.download_id),e&&e.state){
if("download_succ"==e.state&&(t.setBtn("downloaded"),window.clearInterval(a.clock)),
"downloading"==e.state)return;
"download_fail"==e.state&&(window.clearInterval(a.clock),window.clearInterval(a.install_clock),
n("????????????"),t.setBtn("download"));
}
});
},s.prototype.installStateChange=function(){
var a=this.g,t=this;
c.invoke("getInstallState",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(e){
var n=e.err_msg;
n.indexOf("get_install_state:yes")>-1&&(o("getInstallState @app, version : "+n),
window.clearInterval(a.install_clock),t.setBtn(a.url_scheme?"gotodetail":"installed"));
});
},s.prototype.pauseDownload=function(){
var a=this.g,t=this;
c.invoke("pauseDownloadTask",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(a){
a.err_msg.indexOf("pause_download_task:ok")>-1&&t.setBtn("paused");
});
},s.prototype.resumeDownload=function(){
var a=this.g,t=this;
c.invoke("resumeDownloadTask",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(a){
a.err_msg.indexOf("ok")>-1&&t.setBtn("downloading");
});
},s.prototype.gotoDetail=function(){
var t=this.g;
if(104==t.data.pt||113==t.data.pt||114==t.data.pt||122==t.data.pt||t.data.use_new_protocol>0&&12==t.data.product_type&&t.url_scheme)u.gtVersion("6.5.6",!0)?c.invoke("launchApplication",{
schemeUrl:t.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=t.url_scheme);
}):location.href=t.url_scheme;else{
var e=t.data.url,n=a("biz_common/utils/url/parse.js");
(!e||0!=e.indexOf("http://mp.weixin.qq.com/tp/")&&0!=e.indexOf("https://mp.weixin.qq.com/tp/"))&&(e="http://mp.weixin.qq.com/mp/ad_app_info?t=ad/app_detail&app_id="+t.data.app_id+(t.appdetail_params||"")+"&channel_id="+t.channelid+"&md5sum="+t.data.md5sum+"#wechat_redirect"),
t.url_scheme&&(e=n.join(e,{
is_installed:"1"
})),j(e);
}
},s;
});define("a/sponsor.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","a/wxopen_card.js","biz_wap/utils/openUrl.js","biz_wap/utils/ajax.js","biz_wap/utils/device.js"],function(e){
"use strict";
function t(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function i(e,t,i,o){
r("http://mp.weixin.qq.com/mp/ad_complaint?&action=report&type="+e+"&pos_type="+t+"&trace_id="+i+"&aid="+o+"&__biz="+window.biz+"&r="+Math.random());
}
function o(){
f({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST",
success:function(){}
});
}
function n(e,i,o){
i.canvas_info?_.invoke("openADCanvas",{
canvasId:i.canvas_info.canvas_id,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:i.pos_type
}),
adInfoXml:i.canvas_info.ad_info_xml
},function(i){
0!=i.ret?(u(e),t(135,o)):t(134,o);
}):u(e);
}
function a(e){
var a=e.adData,r=e.pos_type,_=a.traceid,s=e.a_info.type,f=a.adid,g=a.url,h=e.a_info.rl;
110==a.pt&&(g=g.replace("#","&AdType=80#"));
var b={};
e.report_param=e.report_param||"";
var j=e.adDetailBtn,z=e.adMoreBtn,x=(e.adMessage,e.adAbout),T=e.adComplain,k=e.adImg,H=e.adVideo,I=0,W=document.getElementById("js_sponsor_opt_list"),E={
type:s,
report_type:2,
url:encodeURIComponent(g),
tid:_,
rl:encodeURIComponent(h),
__biz:biz,
pos_type:r,
pt:a.pt,
click_pos:"",
aid:e.a_info.aid
},U=null,h=a.rl||"",A="";
if(h){
h=h.split("?"),h=h.length>1?h[1]:"";
var M=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),P=h.match(M);
P&&(A=unescape(P[2]));
}
window.__video_report_data={
aid:a.adid,
traceid:a.traceid,
user_uin:window.user_uin,
publisher_appid:a.publisher_appid||0,
appmsg_id:mid,
item_idx:idx,
viewid:A,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var q=null,O=!0,S=!1;
if(p.isAndroid&&p.gtVersion("6.6.6",!0)&&(S=!0),console.log("data.videoUrl",a),H&&a.videoUrl){
U=new l({
container:H,
cover:a.thumbUrl,
width:H.offsetWidth,
height:H.offsetWidth*parseInt(a.displayHeight)/parseInt(a.displayWidth),
muted:!0,
ad_muted_btn:!0,
always_hide_loading:!0,
src:a.videoUrl,
autoHide:!0,
blockTouchVideo:!0,
onError:function(i){
console.log("????????????",i),t(123,e),H.parentNode.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+a.thumbUrl+"); height:"+m.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
t(122,e),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,U.replay(),o();
},
onTimeupdate:function(e,t){
2==window.__video_report_data.report_type&&(window.__video_report_data.report_type=3,
o()),window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*t.currentTime,
window.__video_report_data.video_duration=1e3*U.__getDuration(),y||(window.__video_report_data.report_type=3,
o(),y=1);
}
}),I=29,U._showPlayer(),U.setSrc(a.videoUrl,"auto");
var C=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,B=document.documentElement.clientHeight||window.innerHeight;
if(p.isAndroid)if(m.offsetTop>C&&m.offsetTop<C+B)window.__video_report_data.auto_play=0;else{
var D=function(){
U.__beginPlayHandler(),d.off(window,"touchstart",D),S=!0;
};
d.on(window,"touchstart",D);
}
var N=function(){
if(3==window.__video_report_data.play_type)return void d.off(window,"scroll",N);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(C=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
B=document.documentElement.clientHeight||window.innerHeight,U.isPlay()&&(m.offsetTop>C+B||m.offsetTop+m.offsetHeight<C))U.pause();else if(!U.isPlay()&&v.canSupportAutoPlay&&!(m.offsetTop>C+B||m.offsetTop+m.offsetHeight<C)){
if(p.isAndroid&&!S)return;
0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(t(121,e),
p.isIOS&&U.triggerMuted(!0),U.__beginPlayHandler()):U.play();
}
};
d.on(window,"scroll",N),N(),q=function(){
window.setTimeout(function(){
U.triggerMuted(!0);
},1e3);
};
}
d.on(window,"touchend",function(e){
console.log(e.target),e.target==x||e.target==j||e.target==T||e.target.className.indexOf("js_opt_item")>=0||(x.style.display="none",
T.style.display="none",W.style.display="none");
}),d.on(document.getElementById("js_ad_inner"),"click",function(i){
if(i.target.className.indexOf("js_muted_btn")>-1)"true"==U.video.getAttribute("muted")?(U.triggerMuted(!1),
O=!1):(U.triggerMuted(!0),O=!0),t(124,e);else{
if(U&&(!U.isPlay()||0==window.__video_report_data.play_type))return U.__beginPlayHandler(),
O||U.triggerMuted(!1),t(121,e),void(window.__video_report_data.play_type=2);
"js_main_img"==i.target.id||i.target.className.indexOf("video_mask")>-1?b[_+"_1"]||(b[_+"_1"]=!0,
E.click_pos=1,w(E,function(){
t(87+I,e),b[_+"_1"]=!1,!!q&&q(),6!=e.a_info.dest_type?n(g,e.a_info,e):c.openWxopen(e.a_info);
})):b[_+"_2"]||(b[_+"_2"]=!0,E.click_pos=2,w(E,function(){
t(88+I,e),b[_+"_2"]=!1,!!q&&q(),6!=e.a_info.dest_type?n(g,e.a_info,e):c.openWxopen(e.a_info);
}));
}
return!1;
}),d.on(z,"click",function(){
return b[_+"_3"]||(b[_+"_3"]=!0,E.click_pos=3,w(E,function(){
t(89+I,e),b[_+"_3"]=!1,!!q&&q(),6!=e.a_info.dest_type?n(g,e.a_info,e):c.openWxopen(e.a_info);
})),!1;
}),d.on(j,"click",function(){
return t(90+I,e),i(0,r,e.a_info.traceid,e.a_info.aid),"none"==window.getComputedStyle(x).display?(x.style.display="initial",
W.style.display="initial",parseInt(window.can_see_complaint)&&(T.style.display="initial")):(x.style.display="none",
T.style.display="none",W.style.display="none"),!1;
}),d.on(x,"click",function(){
t(91+I,e);
var i="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/trade_about.html?aid="+f+"&tid="+_+"#wechat_redirect";
return!!q&&q(),u(i),!1;
}),d.on(T,"click",function(){
var t="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+e.a_info.aid+"&traceid="+e.a_info.traceid+"&source="+r+"&biz="+window.biz;
return!!q&&q(),i(1,r,e.a_info.traceid,e.a_info.aid),u(t),!1;
}),d.on(window,"resize",function(){
setTimeout(function(){
var t=m.clientWidth;
if(k&&2!=e.a_info.use_new_protocol)k.style.height=t/1.77+"px",console.log("do not change height");else{
var i=H.offsetWidth,o=H.offsetWidth*parseInt(a.displayHeight)/parseInt(a.displayWidth);
U.setHeight(o),U.setWidth(i),m.style.width=i,m.style.height=o;
}
},0);
});
}
var d=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),_=e("biz_wap/jsapi/core.js"),p=e("biz_wap/utils/mmversion.js"),s=e("a/a_report.js"),l=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),c=e("a/wxopen_card.js"),u=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,w=s.AdClickReport,m=(e("biz_common/utils/url/parse.js"),
document.getElementById("js_sponsor_ad_area")),f=e("biz_wap/utils/ajax.js"),y=!1,v=e("biz_wap/utils/device.js");
return a;
});define("a/tpl/cpc_tpl.html.js",[],function(){
return'<!--cpc ????????????-->\n<div id="js_cpc_area" class="js_ad_link mpad_cpc <# if(pos_type == 0 || pos_type == 3){ #> article_bottom<# } #>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n    <!--????????? "??????"-->\n    <!--<# if(tag_pos == \'left\'){ #>\n    "??????" ??????\n    <div class="mpad_cpc_adTag_left mpad_more_cps_left_container">??????<div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n                <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">??????</a>\n                        </li>\n                    </ul>\n        </div>\n    </div>\n    <# } else if(tag_pos == \'right\'){ #>\n    "??????" ??????\n    <div class="mpad_cpc_adTag_right mpad_more_cps_right_container">??????<div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n            <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                <li class="mpad_more_list_ele">\n                    <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">??????</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <# } #>-->\n    <div class="mpad_cpc_inner">\n        <# if(isVideo){ #> <!--??????-->\n        <div class="mpad_cpc_bd mpad_cpc_video"></div>\n        \n        <# }else{ #> <!--?????????-->\n        <div class="mpad_cpc_bd js_ad_main_area js_material_<#=pos_type#>" style="background-image:url(<#=banner#>)" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>"></div>\n        <# } #>\n\n        <div class="mpad_cpc_ft <# if(!price){ #> single<# } #>">\n            <div class="mpad_cpc_ft_hd">\n                <# if(avatar){ #><!--??????-->\n                <span class="<# if(isDownload){ #> mpad_cpc_avatar<# }else{ #> mpad_cpc_avatar_round<# } #>" style="background: url(<#=avatar#>) no-repeat center; background-size: contain;"></span>\n                <# } #>\n                \n                \n                <div class="mpad_cpc_ft_msg">\n                    <!--???title?????????-->\n                    <# if(!!title){ #>\n                        <span class="mpad_cpc_ft_msg_title"><#=title#></span>\n                        <# if(!!price){ #>\n                        <span class="mpad_cpc_ft_msg_price">??<#=price#></span>\n                        <# } #>\n                    <# } #>\n                    <# if(!(tag_pos == \'left\' || tag_pos == \'right\')){ #><!--??????????????????-->\n                    <!--?????????title??????????????????????????????????????????????????????????????????title?????????????????????????????????????????????-->\n                    <div class="mpad_cpc_adTag_inner mpad_more_innertips_container <# if(!title && !price){ #> single<# } #> js_ad_opt_list_btn_<#=pos_type#>">??????<div href="javascript:;" class="mpad_more" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n                            <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                                <li class="mpad_more_list_ele">\n                                    <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">??????</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                    <# } #>\n                </div>\n            </div>\n            <a href="javascript:void(0);" class="mpad_cpc_btn js_ad_btn_<#=pos_type#>" id="js_ad_btn_<#=pos_type#>">\n                <# if(!!is_wx_app){ #><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt=""><# } #><#=btn_text#>\n            </a>\n        </div>\n    </div>\n</div>';
});define("a/appdialog_confirm.js",["widget/wx_profile_dialog_primary.css","a/a_utils.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_common/dom/event.js","a/appdialog_confirm.html.js"],function(n){
"use strict";
n("widget/wx_profile_dialog_primary.css");
var o=n("a/a_utils.js"),e=n("biz_wap/jsapi/core.js"),i=n("biz_common/tmpl.js"),a=n("biz_common/dom/event.js"),c=n("a/appdialog_confirm.html.js"),m=function(n){
if(o.isVideoSharePageOnlyAd())return void e.invoke("confirmDialog",{
title:"???????????????????????????",
contentDesc:n.app_name,
confirmText:"??????",
cancelText:"??????",
msgIconUrl:n.app_img_url,
msgIconWidth:50,
msgIconHeight:50
},function(o){
o.err_msg.indexOf("confirmDialog:ok")>-1?n.onOk&&n.onOk():n.onCancel&&n.onCancel();
});
var m=document.createElement("div");
m.innerHTML=i.tmpl(c,n),document.body.appendChild(m),a.on(m.getElementsByClassName("js_ok")[0],"click",function(){
n.onOk&&n.onOk(),document.body.removeChild(m);
}),a.on(m.getElementsByClassName("js_cancel")[0],"click",function(){
n.onCancel&&n.onCancel(),document.body.removeChild(m);
});
};
return m;
});define("biz_common/dom/offset.js",[],function(){
"use strict";
function f(f){
for(var t=0;f.offsetParent;)t+=f.offsetTop,f=f.offsetParent;
return t;
}
return{
getOffsetTop:f
};
});define("a/video.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","biz_wap/utils/ajax.js","biz_wap/utils/device.js"],function(e){
"use strict";
function t(e,t){
d("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t);
}
function o(){
u({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST"
});
}
function i(e,t,o){
var i;
return function(){
var n=this,r=arguments,d=function(){
i=null,o||e.apply(n,r);
},a=o&&!i;
clearTimeout(i),i=setTimeout(d,t),a&&e.apply(n,r);
};
}
function n(e){
var n=document.getElementById("js_video_container");
e.videoContainer&&(n=e.videoContainer);
var d=null,p=e.rl||"",u="";
if(p){
p=p.split("?"),p=p.length>1?p[1]:"";
var m=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),f=p.match(m);
f&&(u=unescape(f[2]));
}
window.__video_report_data={
aid:e.aid,
traceid:e.traceid,
user_uin:window.user_uin,
appmsg_id:mid,
item_idx:idx,
viewid:u,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var v=null,y=!0,g=!1;
if(_.isAndroid&&_.gtVersion("6.6.6",!0)&&(g=!0),console.log(n),n){
console.log("player is begin"),d=new s({
container:n,
cover:e.video_info.thumbUrl,
width:n.offsetWidth,
height:n.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth),
muted:y,
ad_muted_btn:y,
always_hide_loading:!0,
src:e.video_info.videoUrl,
pt:e.pt,
autoHide:!0,
blockTouchVideo:!0,
onError:function(o){
console.log("????????????",o),t(129,e.report_param),n.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+e.video_info.thumbUrl+"); height:"+l.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
t(130,e.report_param),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,d.replay(),o();
},
onTimeupdate:function(e,t){
2==window.__video_report_data.report_type&&(window.__video_report_data.report_type=3,
o()),window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*t.currentTime,
window.__video_report_data.video_duration=1e3*d.__getDuration(),w||(window.__video_report_data.report_type=3,
o(),w=1);
}
}),d._showPlayer(),d.setSrc(e.video_info.videoUrl,"auto");
var h=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,b=document.documentElement.clientHeight||window.innerHeight,j=i(function(){
if(3==window.__video_report_data.play_type)return void r.off(window,"scroll",j);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(h=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
b=document.documentElement.clientHeight||window.innerHeight,d.isPlay()&&(l.offsetTop>h+b-l.offsetHeight/2||l.offsetTop+l.offsetHeight/2<h))d.pause4outer();else if(!d.isPlay()&&c.canSupportAutoPlay&&("wifi"==window.networkType||"4g"==window.networkType)&&!(l.offsetTop>h+b+l.offsetHeight/2||l.offsetTop+l.offsetHeight<h-l.offsetHeight/2)){
if(_.isAndroid&&!g)return;
a.invoke("getBackgroundAudioState",{},function(o){
if(/:ok$/.test(o.err_msg)&&1*o.paused==0&&o.src);else{
if(window.no_vedio_ad&&1==window.no_vedio_ad&&"56"==window.ascene)return;
0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(t(131,e.report_param),
_.isIOS&&d.triggerMuted(y),d._trigger("beginPlay")):d.play4outer();
}
});
}
},500);
r.on(window,"scroll",j),j(),v=function(){
window.setTimeout(function(){
d.triggerMuted(y);
},1e3);
},this.adPlayer=d;
}
r.on(document.getElementById("js_video_container"),"tap",function(o){
if(o.target.className.indexOf("js_muted_btn")>-1)"true"==d.video.getAttribute("muted")?(d.triggerMuted(!1),
y=!1):(d.triggerMuted(!0),y=!0),t(132,e.report_param);else if(!d.isPlay())return d.__beginPlayHandler(),
d.triggerMuted(!0),t(133,e.report_param),void(window.__video_report_data.play_type=2);
}),r.on(window,"resize",function(){
setTimeout(function(){
var t=(l.clientWidth,n.offsetWidth),o=n.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth);
d.setHeight(o),d.setWidth(t),l.style.width=t,l.style.height=o;
},0);
});
}
var r=e("biz_common/dom/event.js"),d=e("biz_common/utils/report.js"),a=e("biz_wap/jsapi/core.js"),_=e("biz_wap/utils/mmversion.js"),p=e("a/a_report.js"),s=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),l=(p.AdClickReport,e("biz_common/utils/url/parse.js"),
document.getElementById("js_bottom_ad_area")),u=e("biz_wap/utils/ajax.js"),w=!1,c=e("biz_wap/utils/device.js");
return n;
});define("a/tpl/crt_tpl_manager.js",["a/tpl/crt_size_map.js","biz_common/tmpl.js","a/tpl/mpda_bottom_tpl.html.js","a/a_config.js","biz_wap/jsapi/core.js"],function(t){
"use strict";
function r(t,r,a,e){
this.crtSize=t,this.data=r,this.crtData=i(t,r),this.wrapper=a,this.extra=e,this.isInitAppStatus=!1,
this.updateData=function(t){
this.data=t,this.extra&&this.extra.customUpdataFunc?this.extra.customUpdataFunc(this.wrapper,this.data):o(this.crtSize,this.data,this.wrapper);
},this.getData=function(){
return this.data;
},this.getCrtData=function(){
return this.crtData;
},this.getWrapperElm=function(){
return this.wrapper;
},o(this.crtSize,this.data,this.wrapper),this.extra&&this.extra.afterRenderFunc&&this.extra.afterRenderFunc(this.wrapper,this.data);
}
function a(t,r){
var a,e,i;
if(!p[t])return console.error("[??????????????????]??????????????????crt_size:",t),!1;
if(p[t].multiLogic)for(var n=0;n<p[t].multiLogic.length;n++)if(e=p[t].multiLogic[n],
e.selection){
i=!0;
for(var s in e.selection)e.selection[s]!=r[s]&&(i=!1);
if(i){
a=e;
break;
}
}else console.error("crt multiLogic need a selection param"),a=!1;else a=p[t];
return a;
}
function e(t,r){
var e=!1,i=a(t,r);
return i&&i.tpl&&(e=i.tpl),e;
}
function i(t,r){
var e={},i=a(t,r);
return i&&i.renderData&&(e=i.renderData),e;
}
function n(t,r,e){
var i=a(t,r);
if(i&&i.paramsAlias)for(var n in i.paramsAlias)e[n]=e[i.paramsAlias[n]];
return e;
}
function s(t,r,e){
var i=a(t,r);
return i&&i.paramsPreHandler&&(e=i.paramsPreHandler(e)),e;
}
function o(t,r,a){
var o=e(t,r),p=c(r,i(t,r)),m="";
if(p=n(t,r,p),p=s(t,r,p),console.log("crt final render data",p),!o)return console.error("[??????????????????] ???????????????",t),
"";
try{
m=l.tmpl(o,p);
}catch(f){
console.error("[??????????????????] ??????????????????",t,r,p,o),console.log(f);
}
return p.pos_type==h.AD_POS.POS_BOTTOM&&(m=l.tmpl(u,{
adTpl:m
})),console.log("[??????????????????] crtSize: ",t,"???????????????",p),a.innerHTML=m,p;
}
function c(t,r){
for(var a in r)t[a]=r[a];
return t;
}
{
var p=t("a/tpl/crt_size_map.js"),l=t("biz_common/tmpl.js"),u=t("a/tpl/mpda_bottom_tpl.html.js"),h=t("a/a_config.js");
t("biz_wap/jsapi/core.js");
}
return{
renderAdData:o,
createCrtObject:r,
CRT_CONF:p
};
});define("a/cpc_a_tpl.html.js",[],function(){
return'<!--???title ????????????????????? class appmsg_card_context?????????title ??????????????????class appmsg_card_context-->\n<div id="js_cpc_area"  class="js_ad_link  <# if(exp_obj.icon_pos != \'left\' && exp_obj.icon_pos != \'right\'){ #> appmsg_card_context <# } #> appmsg_card_active mpda_cpc_context pages_reset" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n    <!--????????? "??????"-->\n    <# if(exp_obj.icon_pos == \'left\'){ #>\n    <div class="appmsg_card_hd mpda_cpc_hd">\n      <!--"??????" ??????-->\n      <div class="mpda_cpc_title mpda_cpc_title_left mpad_more_cps_left_container js_ad_opt_list_btn_<#=pos_type#>">??????\n        <!--???????????? begin-->\n        <div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>>\n                <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">??????</a>\n                        </li>\n                    </ul>\n        </div>\n        <!--???????????? end-->\n        </div>\n    </div>\n    <# } else if(exp_obj.icon_pos == \'right\'){ #>\n    <div class="appmsg_card_hd mpda_cpc_hd">\n      <!--"??????" ??????-->\n      <div class="mpda_cpc_title mpda_cpc_title_right mpad_more_cps_right_container js_ad_opt_list_btn_<#=pos_type#>">??????\n        <!--???????????? begin-->\n        <div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>>\n                <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">??????</a>\n                        </li>\n                    </ul>\n        </div>\n        \n        <!--???????????? end-->\n      </div>\n    </div>\n    <# } #>\n    <div class="mpda_cpc_inner">\n      <div class="appmsg_card_bd mpda_cpc_bd" style="background-image:url(<#=image_url#>)"></div>\n\n      <div class="appmsg_card_ft mpda_cpc_ft <# if(!exp_obj.price){ #> single<# } #>" style="z-index: 2;">\n          <# if(exp_obj.icon_pos == \'left\' || exp_obj.icon_pos == \'right\'){ #>\n\n          <# } else { #>\n          <span class="dropdown_opr_tips mpad_more_innertips_container js_ad_opt_list_btn_<#=pos_type#>">\n              ??????\n                <!--???????????? begin-->\n                <div href="javascript:;" class="mpad_more" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>>\n                    <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">??????</a>\n                        </li>\n                    </ul>\n                </div>\n                <!--???????????? end-->\n              <!--<span class="dropdown_opr_popover"></span>-->\n          </span>\n          <# } #>\n          <!--title ??????-->\n\n          <# if(!!exp_obj.sale_text){ #>\n          <span class="appmsg_card_msg">\n              <span class="appmsg_card_msg_title">\n                  <#=exp_obj.sale_text#>\n              </span>\n              <# if(!!exp_obj.price){ #>\n              <span class="appmsg_card_msg_supp price">\n                  ??<#=exp_obj.price#>\n              </span>\n              <# } #>\n          </span>\n          <# } #>\n\n          <# if(dest_type == 9){ #>\n            <a href="javascript:void(0);" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress">\n                <!-- ???????????????????????????canvas??????id -->\n                <#=exp_obj.btn_text#>\n            </a>  \n          <# }else if(dest_type == 6){#>\n            <a href="javascript:void(0);" class="appmsg_card_btn">\n              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt="">\n              <#=exp_obj.btn_text#>\n            </a>\n          <# }else{ #>\n            <a href="javascript:void(0);" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress" id="js_ad_btn_<#=pos_type#>">\n                  <!-- ????????????????????? -->\n                  <#=exp_obj.btn_text#>\n              </a> \n          <# } #>\n        </div>\n    </div>\n</div>\n';
});define("a/sponsor_a_tpl.html.js",[],function(){
return'<!--sponsor??????-->\n<div class="ct_mpda_area mpda_sponsor <#if(window.new_appmsg){#>appmsg_card_context<# } #>" id="js_ad_area">\n    <div class="ct_mpda_placeholder">\n        <p class="ct_mpda_tips">???????????????????????????????????????</p>\n    </div>\n    <div class="ct_mpda_inner js_ad_link" id="js_ad_inner" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>" data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <div class="ct_mpda_hd">\n            <# if(pt==108 || pt==109 || pt==110){ #>\n            <span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url(<#=image_url#>)"></span>\n            <# }else if(pt==116 || pt==117){ #>\n            <div id="js_video_container"></div>\n            <# }else{ #>\n            <span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url(<#=image_url#>)"></span>\n            <# } #>\n        </div>\n        <div class="ct_mpda_bd" id="js_ad_message">\n            <span class="ct_mpda_logo img_bg_cover" style="background-image:url(<#=biz_info.head_img#>)"></span>\n            <div class="ct_mpda_desc_box">\n                <p class="ct_mpda_title"><#=biz_info.nick_name#></p>\n                <div class="ct_mpda_details mpad_more_innerdetail_container" id="js_ad_detail">???????????????                    <!--<a class="ct_mpda_btn_about" id="js_btn_about">????????????</a>\n                    <a class="ct_mpda_btn_about" id="js_btn_complain">??????</a>-->\n                    <ul id="js_sponsor_opt_list" class="mpad_more_list" style="display: none">\n                        <li class="mpad_more_list_ele" id="js_btn_about">\n                            <a class="mpad_more_list_ele_container js_opt_item">????????????</a>\n                        </li>\n                        <li class="mpad_more_list_ele" id="js_btn_complain" style="display: none">\n                            <a class="mpad_more_list_ele_container js_opt_item">??????</a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <# if(dest_type==6){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">\n                <i class="icon26_weapp_blue"></i>\n                <# if(product_type==46) {#>\n                    ???????????????                <# }else{ #>\n                    ????????????                <# } #>\n            </a>\n            <# }else if(dest_type==9){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">????????????</a>\n            <# }else if(product_type==46){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">???????????????</a>\n            <# }else if(pt== 108||pt==116){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">????????????</a>\n            <# }else if(pt==109){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">????????????</a>\n            <# }else if(pt==110||pt==117){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">???????????????</a>\n            <# } #>\n            \n        </div>\n    </div>\n</div>\n';
});define("a/a_tpl.html.js",[],function(){
return'<div class="rich_media_extra" id="gdt_area">\n    <# if(pos_type==0){ #>\n        <#if(window.new_appmsg){#>\n        <div class="weui-loadmore weui-loadmore_line mod_title_context_primary mpad_more_container">\n            <span class="weui-loadmore__tips js_ad_opt_list_btn_<#=pos_type#>">??????                <!--???????????? begin-->\n                <div class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="display:none"<#}#>>\n                    <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                            <li class="mpad_more_list_ele">\n                                <a class="mpad_more_list_ele_container  js_complain_btn_<#=pos_type#>" href="javascript:;">??????</a>\n                            </li>\n                    </ul>\n                </div>\n                <!--???????????? end-->\n            </span>\n        </div>\n        <#}else{#>\n        <div class="rich_tips with_line title_tips mpad_more_center_container">\n            <span class="tips js_ad_opt_list_btn_<#=pos_type#>">??????</span>\n            <!--???????????? begin-->\n            <div class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>">\n                <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">??????</a>\n                        </li>\n                </ul>\n            </div>\n            <!--???????????? end-->\n        </div>\n        <# } #>\n    <# } #>\n    <div class="js_ad_link extra_link <# if(pt==107){ #>preview_img_primary<# } #>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <# if(!use_new_protocol){ #>\n            <# if(pt==1){ #>\n                <#=hint_txt#>\n                <img class="icon_arrow_gray" src="<%@GetResFullName($images_path$icon/common/icon_arrow_gray.png)%>">\n                <img class="icon_loading_white icon_after" style="display:none;" id="loading_<#=traceid#>" src="<%@GetResFullName($images_path$icon/common/icon_loading_white.gif)%>">\n            <!-- ???????????????????????????????????? -->\n            <# } else if (pt === 2 || pt === 107 || pt === 119 || pt === 139) { #>\n                <!--?????????logo-->\n                <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                    <div class="brand_logo"><img data-src="<#=logo#>" alt="logo??????" class="js_alazy_img"></div>\n                <# } #>\n                <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n                <# if(watermark_type!=0){ #>\n                    <i class="promotion_tag" id="js_promotion_tag">\n                    <# if(pt==119){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n\n                    <# if(watermark_type==1){ #>\n                        ????????????\n                    <# }else if (watermark_type==2){ #>\n                        ????????????\n                    <# }else if (watermark_type==3){ #>\n                        <#=longAppBtnText#>\n                    <# }else if (watermark_type==7){ #>\n                        ???????????????\n                    <# }else if (watermark_type==8){ #>\n                        ???????????????\n                    <# } #>\n                    </i>\n                <# } #>\n            <# }else if(pt==7||pt==120){ #>\n            <!-- ?????? -->\n            <div class="preview_group preview_card">\n                <div class="preview_group_inner card_inner">\n                    <div class="preview_group_info">\n                        <strong class="preview_group_title2"><#=hint_txt#></strong>\n                        <div class="preview_group_desc"><#=ad_desc#></div>\n                        <img data-src="<#=image_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                    <i class="promotion_tag">\n                        <# if(pt==120){ #>\n                        <span class="icon26_weapp_white"></span>\n                        <# } #>\n\n                        <# if (watermark_type==7){ #>\n                            ???????????????\n                        <# }else if (watermark_type==8){ #>\n                            ???????????????\n                        <# }else{ #>\n                            ????????????\n                        <# } #>\n                    </i>\n                </div>\n            </div>\n            <# }else if(pt==115){ #>\n            <div class="preview_group mod_follow_with_img">\n                <div class="wx_flex_layout">\n                    <div class="wx_flex_bd">\n                        <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                    </div>\n                    <div class="wx_flex_ft">\n                        <span class="radius_avatar"><img data-src="<#=biz_info.head_img#>" alt="" class="js_alazy_img"></span>\n                        <strong class="fwi_nickname"><#=biz_info.nick_name#></strong>\n                        <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn">??????</a>\n                        <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn" style="z-index: 2;">??????</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==100){ #>\n            <div class="preview_group follow <# if(!!biz_info.show_comm_attention_num){ #>with_tips<# } #>">\n                <div class="preview_group_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=biz_info.nick_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <# if(!!biz_info.show_comm_attention_num){ #>\n                        <div class="preview_group_desc weak_tips">???<#=biz_info.comm_attention_num#>???????????????</div>\n                        <# } #>\n                        <# if(!!biz_info.head_img){ #>\n                        <img data-src="<#=biz_info.head_img#>" alt="" class="preview_group_avatar br_radius js_alazy_img" >\n                        <# }else{ #>\n                        <img class="preview_group_avatar br_radius" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" alt="<#=biz_info.nick_name#>" >\n                        <# } #>\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="btn btn_inline btn_primary btn_line js_ad_btn">??????</a>\n                        <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="btn btn_inline btn_line  btn_primary js_ad_btn">??????</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==102){ #>\n            <div class="preview_group">\n                <div class="preview_group_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_group_avatar br_radius js_alazy_img">\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn btn_download"><#=shortAppBtnText#></a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==101){ #>\n            <div class="preview_group preview_card">\n                <div class="preview_group_inner card_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn"><#=shortAppBtnText#></a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==103||pt==104){ #>\n            <div class="preview_group obvious_app">\n                <div class="preview_group_inner">\n                    <div class="pic_app">\n                        <img data-src="<#=image_url#>" alt="" class="js_alazy_img">\n                    </div>\n                    <div class="info_app">\n                        <p class="name_app"><#=app_info.app_name#></p>\n                        <# if(pt==103){ #>\n                        <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._category#></span><em>|</em><span class="compacity"><#=app_info._app_size#></span></p>\n                        <# } else if(pt==104){ #>\n                        <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._app_size#></span><em>|</em><span class="compacity"><#=app_info._down_count#></span></p>\n                        <# } #>\n                        <!--????????????-->\n                        <p class="grade_app" id="js_app_rating_<#=pos_type#>">\n                            <!--\n                                ?????????star_half\n                                ?????????star_one\n                                ????????????star_one_half\n                                ?????????star_two\n                                ?????????star_three\n                                ?????????star_four\n                                ?????????star_five\n                            -->\n                            <span class="js_stars stars" style="display:none;"></span>\n                            <!--????????????\n                            <span class="scores">3.5</span>\n                            -->\n                            <span class="js_scores scores"></span>\n                        </p>\n                        <div class="dm_app">\n                            <a id="js_appdetail_action_<#=pos_type#>" class="ad_btn btn_download js_ad_btn"><#=shortAppBtnText#></a>\n                            <p class="extra_info">??????<# if(pt==103){ #>App Store<# }else{ #>???????????????<# } #></p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==105){ #>\n            <div class="mpda_card cardticket">\n                <div class="cardticket_hd cell">\n                    <div class="cell_hd">\n                        <span class="radius_avatar">\n                            <img class="avatar js_alazy_img" data-src="<#=card_info.card_logo_url#>" >\n                        </span>\n                    </div>\n                    <div class="cell_bd cell_primary"><#=card_info.card_title#></div>\n                    <div class="cell_ft">\n                        <a class="btn btn_plain_primary btn_inline js_ad_btn" id="js_card_action_<#=pos_type#>">??????</a>\n                    </div>\n                </div>\n                <div class="cardticket_ft">\n                    <div class="cardticket_theme"></div>\n                    <p class="cardticket_source tips_global"><#=card_info.card_brand_name#></p>\n                </div>\n            </div>\n            <# }else if(pt==106){ #>\n            <!-- ???????????? -->\n            <div class="preview_group preview_card preview_shop_card">\n                <div class="preview_group_inner shop_card_inner">\n                    <div class="preview_group_info">\n                        <strong class="preview_shop_card_title"><#=mp_shop_info.name#></strong>\n                        <div class="preview_shop_card_desc">\n                            <span class="preview_card_desc_meta btn_plain_primary preview_shop_card_btn_buy js_ad_btn" id="js_shop_action_<#=pos_type#>">??????</span>\n                            <span class="preview_card_desc_meta preview_shop_card_oldprice">&yen;<#=mp_shop_info.ori_price/100#></span>\n                            <span class="preview_card_desc_meta preview_shop_card_price">&yen;<#=mp_shop_info.cur_price/100#></span>\n                        </div>\n                        <img data-src="<#=mp_shop_info.img#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==111||pt==113||pt==112||pt==114){ #>\n            <!-- ???????????????????????????????????????????????????app?????? -->\n            <div class="preview_group download_app_with_desc js_download_app_card">\n                <div class="preview_group_inner" style="background-image:url(<#=image_url#>)">\n                    <div class="preview_group_hd">\n                        <div class="preview_group_hd_inner">\n                            <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                            <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                            <a id="js_appdetail_action_<#=pos_type#>" class="preview_group_btn js_ad_btn"><#=shortAppBtnText#></a>\n                            <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">??????</a>\n                            <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">??????</a> -->\n                            <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn with_processor"><i class="btn_processor" style="width:35%;"></i><span class="btn_processor_value">35%</span></a> -->\n                        </div>\n                    </div>\n                    <# if(pt==111||pt==113){ #>\n                    <div class="preview_group_bd">\n                        <div class="preview_group_desc"><#=hint_txt.split(\'|\')[0]#></div>\n                        <div class="preview_group_desc"><#=hint_txt.split(\'|\')[1] || ""#></div>\n                    </div>\n                    <div class="preview_group_ft"><div class="preview_group_download_info"><span class="download_size" ><#=app_info.app_size#></span>&nbsp;??????<# if(pt==111){ #>App Store<# }else{ #>???????????????<# } #></div></div>\n                    <# } #>\n                </div>\n            </div>\n            <# }else if(pt==122||pt==121){ #>\n            <!-- app??????????????? -->\n            <!--117 ????????? begin -->\n            <div class="preview_group mod_method117">\n                <div class="wx_flex_layout">\n                    <div class="wx_flex_bd">\n                        <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                    </div>\n                    <div class="wx_flex_ft">\n                        <span class="radius_avatar"><img data-src="<#=app_info.icon_url#>" alt="" class="js_alazy_img"></span>\n                        <strong class="fwi_nickname"><#=app_info.app_name#></strong>\n                        <a id="js_appdetail_action_<#=pos_type#>" class="wx_min_plain_btn primary js_ad_btn"><#=shortAppBtnText#></a>\n                        <!-- <a href="#" class="wx_min_plain_btn primary btn_progress">\n                            <span class="btn_progress_inner" style="width:37%;">\n                                <span class="btn_progress_bd" style="width:57px;">??????</span>\n                            </span>\n                            ??????\n                        </a> -->\n                    </div>\n                </div>\n            </div>\n            <!--117 end-->\n            <!--???????????? begin-->\n            <# } else if (pt === 125) { #>\n            <div class="da_area">\n              <div class="da_inner">\n                <!--????????????-->\n                <div class="da_hd">\n                  <div class="da_video_area">\n                    <!--?????????-->\n                    <div id="js_video_container"></div>\n                  </div>\n                </div>\n                <!--????????????-->\n                <div class="da_bd">\n                  <div class="da_brand_info">\n                    <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                    <div class="da_brand_info_content">\n                      <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                    </div>\n                  </div>\n                  <a class="da_btn_more">\n                    <# if(dest_type==6){ #><span class="icon26_weapp_blue"></span><# } #>\n                    \n                    <# if (dest_type==9){ #>\n                        ????????????\n                    <# }else if (watermark_type==7){ #>\n                        ???????????????\n                    <# }else if (watermark_type==8){ #>\n                        ???????????????\n                    <# }else if (product_type==46){ #>\n                        ???????????????\n                    <# }else{ #>\n                        ????????????\n                    <# } #>\n                </a>\n                </div>\n              </div>\n            </div>\n            <!--???????????? end-->\n            <# } else if (pt === 140) { #>\n            <!--???banner????????????-->\n            <div class="mpad_smallbanner_msg">\n                <div class="mpad_smallbanner_msg_inner">\n                    <div class="mpad_smallbanner_msg_hd" style="background: url(<#=shopImage.image_url#>) no-repeat left center; background-size: cover;">\n                    </div>\n                    <div class="mpad_smallbanner_msg_ft">\n                        <div class="mpad_smallbanner_msg_ft_hd">\n                            <strong class="mpad_smallbanner_msg_title"><#=hint_txt#></strong>\n                            <div class="mpad_smallbanner_msg_tags_container">\n                                <# shopImage.mp_tags && shopImage.mp_tags.forEach(function (value, idx) { #>\n                                <span class="mpad_smallbanner_msg_tag"><span class="mpad_smallbanner_msg_tag_inner"><#=value#></span></span>\n                                <# }); #>\n                            </div>\n                        </div>\n                        <span class="mpad_smallbanner_info_btn <# if(dest_type==6){ #>with_icon<# } #>" id="js_ad_btn_<#=pos_type#>">\n                            <# if (dest_type === 6) { #><img class="ic ic_weapp" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTUgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjMgKDUxMTY3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TbGljZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSIyMDE4LzAyLzIzLeWkmuaooeadv+WwneivleeovyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTEwLjc1LDEgQzkuOTIzMjUsMSA5LjE1MzUsMS4yMjc4ODg4OSA4LjUsMS42MTU0ODE0OCBDNy4zMDEyNSwyLjMyNjg4ODg5IDYuNSwzLjU4NDI5NjMgNi41LDUuMDE4NTE4NTIgTDYuNSwxMC45ODE0ODE1IEM2LjUsMTIuMDU1MzMzMyA1LjQ5MjUsMTIuOTI1OTI1OSA0LjI1LDEyLjkyNTkyNTkgQzMuMDA3MjUsMTIuOTI1OTI1OSAyLDEyLjA1NTMzMzMgMiwxMC45ODE0ODE1IEMyLDEwLjIxNzE4NTIgMi41MTE1LDkuNTU3ODg4ODkgMy4yNTM3NSw5LjI0MDAzNzA0IEMzLjMwNzI1LDkuMjE3MjIyMjIgMy4zNjE1LDkuMTk1NDQ0NDQgMy40MTcyNSw5LjE3NjI1OTI2IEMzLjg4NDUsOC45ODE4MTQ4MSA0LjI4NTI1LDguNjE2Nzc3NzggNC40MzQsOC4xOTI4ODg4OSBDNC42NTM3NSw3LjU2NzAzNzA0IDQuMjQ0NzUsNy4wNTk5MjU5MyAzLjUyMDc1LDcuMDU5OTI1OTMgQzMuMzQwMjUsNy4wNTk5MjU5MyAzLjE1NzI1LDcuMDkxNTU1NTYgMi45ODA3NSw3LjE0ODU5MjU5IEMyLjk4LDcuMTQ4ODUxODUgMi45NzkyNSw3LjE0OTExMTExIDIuOTc4MjUsNy4xNDkzNzAzNyBDMS45MzE1LDcuNDYxIDEuMDU3NzUsOC4xNDQ0MDc0MSAwLjUzMzI1LDkuMDM3MDM3MDQgQzAuMTk0NSw5LjYxMzg4ODg5IDAsMTAuMjc2Mjk2MyAwLDEwLjk4MTQ4MTUgQzAsMTMuMTk3MzcwNCAxLjkwNjUsMTUgNC4yNSwxNSBDNS4wNzY3NSwxNSA1Ljg0NjUsMTQuNzcyMTExMSA2LjUsMTQuMzg0NTE4NSBDNy42OTg3NSwxMy42NzMxMTExIDguNSwxMi40MTU3MDM3IDguNSwxMC45ODE0ODE1IEw4LjUsNS4wMTg1MTg1MiBDOC41LDMuOTQ0NjY2NjcgOS41MDcyNSwzLjA3NDA3NDA3IDEwLjc1LDMuMDc0MDc0MDcgQzExLjk5MjUsMy4wNzQwNzQwNyAxMywzLjk0NDY2NjY3IDEzLDUuMDE4NTE4NTIgQzEzLDUuODE1NDgxNDggMTIuNDQ1MjUsNi41MDA0NDQ0NCAxMS42NTEsNi44MDA2NjY2NyBDMTEuMTM4NzUsNi45Nzg3Nzc3OCAxMC43MTksNy4zNjMyNTkyNiAxMC41NTksNy44MTg3Nzc3OCBDMTAuMzQwNSw4LjQ0MTUxODUyIDEwLjc0NzUsOC45NDY1NTU1NiAxMS40NjgyNSw4Ljk0NjU1NTU2IEMxMS42MzE1LDguOTQ2NTU1NTYgMTEuNzk2NSw4LjkxNzUxODUyIDExLjk1NzI1LDguODcwMzMzMzMgQzExLjk4MzUsOC44NjI4MTQ4MSAxMi4wMDk1LDguODU0NTE4NTIgMTIuMDM1NSw4Ljg0NjQ4MTQ4IEMxMy4wNzYsOC41MzMwMzcwNCAxMy45NDQ1LDcuODUxNzAzNyAxNC40NjY1LDYuOTYyOTYyOTYgQzE0LjgwNTUsNi4zODYzNzAzNyAxNSw1LjcyMzcwMzcgMTUsNS4wMTg1MTg1MiBDMTUsMi44MDI2Mjk2MyAxMy4wOTM1LDEgMTAuNzUsMSIgaWQ9IlBhZ2UtMSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=" alt="?????????"><# } #><div class="mpad_smallbanner_info_btn_inner">?????????</div>\n                        </span>\n                        <!--hardcode ??????icon ???<span class="mpad_smallbanner_info_btn with_icon" id="js_ad_btn_<#=pos_type#>">\n                            <img class="ic ic_weapp" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTUgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjMgKDUxMTY3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TbGljZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSIyMDE4LzAyLzIzLeWkmuaooeadv+WwneivleeovyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTEwLjc1LDEgQzkuOTIzMjUsMSA5LjE1MzUsMS4yMjc4ODg4OSA4LjUsMS42MTU0ODE0OCBDNy4zMDEyNSwyLjMyNjg4ODg5IDYuNSwzLjU4NDI5NjMgNi41LDUuMDE4NTE4NTIgTDYuNSwxMC45ODE0ODE1IEM2LjUsMTIuMDU1MzMzMyA1LjQ5MjUsMTIuOTI1OTI1OSA0LjI1LDEyLjkyNTkyNTkgQzMuMDA3MjUsMTIuOTI1OTI1OSAyLDEyLjA1NTMzMzMgMiwxMC45ODE0ODE1IEMyLDEwLjIxNzE4NTIgMi41MTE1LDkuNTU3ODg4ODkgMy4yNTM3NSw5LjI0MDAzNzA0IEMzLjMwNzI1LDkuMjE3MjIyMjIgMy4zNjE1LDkuMTk1NDQ0NDQgMy40MTcyNSw5LjE3NjI1OTI2IEMzLjg4NDUsOC45ODE4MTQ4MSA0LjI4NTI1LDguNjE2Nzc3NzggNC40MzQsOC4xOTI4ODg4OSBDNC42NTM3NSw3LjU2NzAzNzA0IDQuMjQ0NzUsNy4wNTk5MjU5MyAzLjUyMDc1LDcuMDU5OTI1OTMgQzMuMzQwMjUsNy4wNTk5MjU5MyAzLjE1NzI1LDcuMDkxNTU1NTYgMi45ODA3NSw3LjE0ODU5MjU5IEMyLjk4LDcuMTQ4ODUxODUgMi45NzkyNSw3LjE0OTExMTExIDIuOTc4MjUsNy4xNDkzNzAzNyBDMS45MzE1LDcuNDYxIDEuMDU3NzUsOC4xNDQ0MDc0MSAwLjUzMzI1LDkuMDM3MDM3MDQgQzAuMTk0NSw5LjYxMzg4ODg5IDAsMTAuMjc2Mjk2MyAwLDEwLjk4MTQ4MTUgQzAsMTMuMTk3MzcwNCAxLjkwNjUsMTUgNC4yNSwxNSBDNS4wNzY3NSwxNSA1Ljg0NjUsMTQuNzcyMTExMSA2LjUsMTQuMzg0NTE4NSBDNy42OTg3NSwxMy42NzMxMTExIDguNSwxMi40MTU3MDM3IDguNSwxMC45ODE0ODE1IEw4LjUsNS4wMTg1MTg1MiBDOC41LDMuOTQ0NjY2NjcgOS41MDcyNSwzLjA3NDA3NDA3IDEwLjc1LDMuMDc0MDc0MDcgQzExLjk5MjUsMy4wNzQwNzQwNyAxMywzLjk0NDY2NjY3IDEzLDUuMDE4NTE4NTIgQzEzLDUuODE1NDgxNDggMTIuNDQ1MjUsNi41MDA0NDQ0NCAxMS42NTEsNi44MDA2NjY2NyBDMTEuMTM4NzUsNi45Nzg3Nzc3OCAxMC43MTksNy4zNjMyNTkyNiAxMC41NTksNy44MTg3Nzc3OCBDMTAuMzQwNSw4LjQ0MTUxODUyIDEwLjc0NzUsOC45NDY1NTU1NiAxMS40NjgyNSw4Ljk0NjU1NTU2IEMxMS42MzE1LDguOTQ2NTU1NTYgMTEuNzk2NSw4LjkxNzUxODUyIDExLjk1NzI1LDguODcwMzMzMzMgQzExLjk4MzUsOC44NjI4MTQ4MSAxMi4wMDk1LDguODU0NTE4NTIgMTIuMDM1NSw4Ljg0NjQ4MTQ4IEMxMy4wNzYsOC41MzMwMzcwNCAxMy45NDQ1LDcuODUxNzAzNyAxNC40NjY1LDYuOTYyOTYyOTYgQzE0LjgwNTUsNi4zODYzNzAzNyAxNSw1LjcyMzcwMzcgMTUsNS4wMTg1MTg1MiBDMTUsMi44MDI2Mjk2MyAxMy4wOTM1LDEgMTAuNzUsMSIgaWQ9IlBhZ2UtMSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=" alt="?????????"><div class="mpad_smallbanner_info_btn_inner">?????????</div>\n                        </span>-->\n                    </div>\n                </div>\n            </div>\n            <# } #>\n        <# }else{ #>\n            <!--?????????-->\n            <# if(material_type == 9){ #>\n            <!--??????-->\n            <div class="da_area">\n              <div class="da_inner">\n                <!--????????????-->\n                <div class="da_hd">\n                  <div class="da_video_area">\n                    <!--?????????-->\n                    <div id="js_video_container"></div>\n                  </div>\n                </div>\n                <!--????????????-->\n                <div class="da_bd">\n                  <div class="da_brand_info">\n                    <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                    <div class="da_brand_info_content">\n                      <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                    </div>\n                  </div>\n                  <# if (product_type==12 || product_type==19){ #>\n                  <!--<a id="js_ad_btn_<#=pos_type#>" class="da_btn_more wx_min_plain_btn ba_btn btn_progress">????????????</a>-->\n                  <a id="js_ad_btn_<#=pos_type#>" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress"><#=longAppBtnText#></a>\n                  <# }else{ #>\n                  <a class="da_btn_more">????????????</a>\n                  <# } #>\n                </div>\n              </div>\n            </div>\n            <# }else if(material_type == 2){ #>\n            <!--??????-->\n                <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                    <div class="brand_logo"><img data-src="<#=logo#>" alt="logo??????" class="js_alazy_img"></div>\n                <# } #>\n                    <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n                    <i class="promotion_tag" id="js_promotion_tag">\n                    <# if(dest_type==6){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n\n                    <# if (product_type==12 || product_type==19){ #>\n                        <#=longAppBtnText#>\n                    <# } #>\n                    </i>\n            <# } #>\n        <# } #>\n    </div>\n</div>\n';
});define("a/mpshop.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","biz_wap/utils/openUrl.js"],function(t){
"use strict";
function e(t,e){
s("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+t+e.report_param);
}
function i(t){
var i=t.adData,s=t.pos_type||0,a=i.tid,l=i.type,m=(i.adid,i.outer_id),c=i.url,j=i.rl,u={};
t.report_param=t.report_param||"";
var d=t.btn;
if(d){
o.on(d,"click",function(i){
if(!u[a]){
u[a]=!0;
var o,d,b,z,f=!!i&&i.target;
f&&(o=p.getX(f,"js_ad_link")+i.offsetX,d=p.getY(f,"js_ad_link")+i.offsetY,b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
z=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
n({
type:l,
report_type:2,
click_pos:0,
url:encodeURIComponent(c),
tid:a,
rl:encodeURIComponent(j),
__biz:biz,
pos_type:s,
pt:106,
pos_x:o,
pos_y:d,
ad_w:b||0,
ad_h:z||0
},function(){
u[a]=!1,e(61,t),_(r.join(c,{
outer_id:m
}));
});
}
return!1;
});
}
}
var o=t("biz_common/dom/event.js"),s=t("biz_common/utils/report.js"),a=t("a/a_report.js"),n=a.AdClickReport,p=(t("biz_wap/utils/ajax.js"),
t("biz_wap/utils/position.js")),r=(t("biz_wap/jsapi/core.js"),t("biz_common/utils/url/parse.js")),_=t("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
return i;
});define("a/wxopen_card.js",["biz_wap/jsapi/core.js","biz_common/utils/report.js","biz_wap/utils/mmversion.js","biz_common/utils/monitor.js","biz_wap/utils/openUrl.js"],function(e){
"use strict";
function i(e,i){
c("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+i);
}
function t(e){
var t=e.url||"";
t=t.replace(/&amp;/g,"&");
var n=t.indexOf("?"),c=0;
(119==e.pt||120==e.pt)&&(c=2),e.report_param="&tid="+e.traceid+"&ticket="+e.ticket+"&aid="+e.aid,
t.indexOf("?")>=0?t=t.slice(0,n)+".html"+t.slice(n):t+=".html";
var _="",l="";
if(document.getElementsByTagName("mpcpc")[0]&&document.getElementsByTagName("mpcpc")[0].dataset&&(_=document.getElementsByTagName("mpcpc")[0].dataset.category_id_list),
"undefined"==typeof w){
var w;
w=window.cgiData&&window.cgiData.__biz?window.cgiData.__biz:window.parent.biz;
}
l=e.traceid+":"+_+":"+w+":"+e.aid+":"+e.pos_type,console.log("sceneNote",l);
var g={
scene:1067,
sceneNote:l,
userName:e.weapp_info.original_id+"@app",
relativeURL:t,
appVersion:1
},f=!1,v=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(v){
var b=Number(v[1]),j=Number(v[2]),z=Number(v[3]);
b>6?f=!0:6===b&&j>5?f=!0:6===b&&5===j&&z>=3&&(f=!0);
}
return console.log("canJumpOnTap : ",f,e.weapp_info.original_id,navigator.userAgent),
f?(u.setSum(110696,0,1),o?u.setSum(110696,3,1):(o=!0,a=+new Date),r?+new Date-r<2e3&&(u.setSum(110696,4,1),
setTimeout(function(){
r=0;
},2e3)):r=+new Date,p?+new Date-p<3e3&&(u.setSum(110696,5,1),setTimeout(function(){
p=0;
},3e3)):p=+new Date,s?+new Date-s<4e3&&(u.setSum(110696,6,1),setTimeout(function(){
s=0;
},4e3)):s=+new Date,void m.invoke("openWeApp",g,function(t){
var n=+new Date-a;
"openWeApp:ok"===t.err_msg&&i(125+c,e.report_param),"system:function_not_exist"===t.err_msg&&(d("https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect"),
i(126+c,e.report_param)),u.setAvg(110696,2,n).send(),o=!1;
})):(d("https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect"),
void i(126+c,e.report_param));
}
function n(e){
m.invoke("preloadMiniProgramContacts",{
userNames:[e.weapp_info.original_id+"@app"]
},function(){}),m.invoke("preloadMiniProgramEnv",{
userNames:[e.weapp_info.original_id+"@app"]
},function(){});
}
var o,a,r,p,s,m=e("biz_wap/jsapi/core.js"),c=e("biz_common/utils/report.js"),u=(e("biz_wap/utils/mmversion.js"),
e("biz_common/utils/monitor.js")),d=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
return{
openWxopen:t,
startConnect:n
};
});