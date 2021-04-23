	var substate=0;	
	var rootpath = window.applicationPath === "" ? "" : window.applicationPath || "../..";
	
	$(".follow").click(function(e){
			var evt=e||window.event;
			evt.preventDefault();
			if(substate==0){
				substate=1;
				var userid=$(this).attr("data-id");
				var like=$(this).attr("data-like");	
				if(login==0){
					openPop("#login-pop");
				}else{//没有登录
					if(like=='0'){
						likeUser(userid,this);
					}else{
						cancleUser(userid,this);
					}
				}
			}
		});
		

		function cancleUser(userId,thisob){
			$.ajax({
				   type: "GET",
				   url: rootpath+"/user/cancleLikeUserSave/"+userId,
				   success: function(msg){
					   substate=0;
					   num=0;
					   var sideLiked="#sideLiked"+userId;
					   
					   if(!isNaN(parseInt($(sideLiked).text()))){
						   num=parseInt($(sideLiked).text())-1;
					   }
					   $(sideLiked).text(num);
					   $(thisob).text("关注");
					   $(thisob).attr("data-like","0");
				   },
                error: function(data) {
                   alert("取消失败！");
                }
			});
		}

 		function likeUser(userId,thisob){
			$.ajax({
				   type: "GET",
				   url: rootpath+"/user/likeUserSave/"+userId,
				   success: function(msg){
					   substate=0;
					   num=1;
					   var sideLiked="#sideLiked"+userId;
					   
					   if(!isNaN(parseInt($(sideLiked).text()))){
						   num=parseInt($(sideLiked).text())+1;
					   }
					   $(sideLiked).text(num);
					   $(thisob).text("已关注");
					   $(thisob).attr("data-like","1");
				   },
                error: function(data) {
                   alert("关注失败！");
                }
			});
	 	}