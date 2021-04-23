

function setToTop() {
    $('body').append('<div id="toTop"  title="回到顶部"><span class="fa fa-arrow-circle-up fa-3x pui-text-blue-400"></span></div>');
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });

    $("#toTop").click(function () {
        //html works for FFX but not Chrome
        //body works for Chrome but not FFX
        //This strange selector seems to work universally
        $("html, body").animate({scrollTop: 0}, 200);
    });
}

function createEditorMd(divId, submitId, rootpath,height,markdown) {
    var editor = editormd(divId, {
        width: "100%",
        height:height,
        //autoHeight: true,
		markdown: markdown,
	    autoFocus: false,
	    toolbarAutoFixed:false,
	    codeFold : true,
	    watch : false,
        path: rootpath+"/static/editormd/lib/",
	    placeholder: "编辑采用Markdown格式",
        toolbarIcons: function() {
          return ["bold", "italic", "quote", "|", "h1", "h2", "h3", "h4", "|", "list-ul", "list-ol", "hr", "|", "link", "reference-link", "image", "code", "table", "code-block", "|", "watch", "preview", "fullscreen", "|", "help", "info"]
        },
        htmlDecode : true,

        saveHTMLToTextarea: true,
        imageUpload: true,
        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL: rootpath+"/static/editormd/upload_json.jsp",
	    onchange: function() {
	      $(submitId).attr('disabled', this.getMarkdown().trim() == "");
	    }
      });

	return editor;
}

function createkEditor(divId, rootpath,height){
	var editor =CKEDITOR.replace(divId, {
		// Define the toolbar: http://docs.ckeditor.com/#!/guide/dev_toolbar
		// The standard preset from CDN which we used as a base provides more features than we need.
		// Also by default it comes with a 2-line toolbar. Here we put all buttons in a single row.
		toolbar: [
			{ name: 'document', items: [ 'Source' ] },
			{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting' ] },
			{ name: 'colors', items: [ 'TextColor', 'BGColor'] },
			{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList','Blockquote' ] },
			{ name: 'links', items: [ 'Link', 'Unlink'] },
			{ name: 'insert', items: [ 'CodeSnippet', 'Image','Table','Mathjax' ] },
			{ name: 'tools', items: [ 'Maximize' ] },
			{ name: 'styles', items: [ 'Format', 'Styles' ] }
		],

		// Since we define all configuration options here, let's instruct CKEditor to not load config.js which it does by default.
		// One HTTP request less will result in a faster startup time.
		// For more information check http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-customConfig
		customConfig: '',
		

		// Enabling extra plugins, available in the standard-all preset: http://ckeditor.com/presets-all
		extraPlugins: 'tableresize,codesnippet,image2',

		// Remove the default image plugin because image2, which offers captions for images, was enabled above.
		removePlugins: 'image',
		filebrowserImageUploadUrl:rootpath+'/static/editormd/upload_ckedit.jsp',
		
		// See http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-codeSnippet_theme
		codeSnippet_theme: 'ir_black',

		/*********************** File management support ***********************/
		// In order to turn on support for file uploads, CKEditor has to be configured to use some server side
		// solution with file upload/management capabilities, like for example CKFinder.
		// For more information see http://docs.ckeditor.com/#!/guide/dev_ckfinder_integration

		// Uncomment and correct these lines after you setup your local CKFinder instance.
		// filebrowserBrowseUrl: 'http://example.com/ckfinder/ckfinder.html',
		// filebrowserUploadUrl: 'http://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
		/*********************** File management support ***********************/

		// Make the editing area bigger than default.
		height: height,

		// An array of stylesheets to style the WYSIWYG area.
		// Note: it is recommended to keep your own styles in a separate file in order to make future updates painless.
		contentsCss: [ rootpath+'/static/css/mystyles.css', rootpath+'/static/css/mystyles.css' ],

		// Reduce the list of block elements listed in the Format dropdown to the most commonly used.
		format_tags: 'p;h1;h2;h3;pre',
		// Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
		removeDialogTabs: 'image:advanced;link:advanced;link:target',

		// Define the list of styles which should be available in the Styles dropdown list.
		// If the "class" attribute is used to style an element, make sure to define the style for the class in "mystyles.css"
		// (and on your website so that it rendered in the same way).
		// Note: by default CKEditor looks for styles.js file. Defining stylesSet inline (as below) stops CKEditor from loading
		// that file, which means one HTTP request less (and a faster startup).
		// For more information see http://docs.ckeditor.com/#!/guide/dev_styles
		stylesSet: [
			/* Inline Styles */
			{ name: 'Marker',			element: 'span', attributes: { 'class': 'marker' } },
			{ name: 'Cited Work',		element: 'cite' },
			{ name: 'Inline Quotation',	element: 'q' },

			/* Object Styles */
			{
				name: 'Special Container',
				element: 'div',
				styles: {
					padding: '5px 10px',
					background: '#eee',
					border: '1px solid #ccc'
				}
			},
			{
				name: 'Compact table',
				element: 'table',
				attributes: {
					cellpadding: '5',
					cellspacing: '0',
					border: '1',
					bordercolor: '#ccc'
				},
				styles: {
					'border-collapse': 'collapse'
				}
			},
			{ name: 'Borderless Table',		element: 'table',	styles: { 'border-style': 'hidden', 'background-color': '#E6E6FA' } },
			{ name: 'Square Bulleted List',	element: 'ul',		styles: { 'list-style-type': 'square' } },

			/* Widget Styles */
			{ name: 'Illustration', type: 'widget', widget: 'image', attributes: { 'class': 'image-illustration' } },
			{ name: 'Featured snippet', type: 'widget', widget: 'codeSnippet', attributes: { 'class': 'code-featured' } },
			{ name: 'Featured formula', type: 'widget', widget: 'mathjax', attributes: { 'class': 'math-featured' } }
		]
	} );
	
	return editor;
}
var btnstate=0;

$(".care").click(function(){
	if(login==0){
		openPop("#login-pop");
	}else{
	if(btnstate==0){
		btnstate=1;
		var btn=$(this);
		var applicationPath = window.applicationPath === "" ? "" : window.applicationPath || "../..";
		var id=btn.attr("data");
				$.ajax({
					   type: "GET",
					   url: applicationPath+"/tags/subscribe/"+id,
					   success: function(msg){
						btnstate=0;	
						 if(msg.message=='save'){
							 btn.text("已关注");
							 btn.addClass('btn-info');
							 btn.removeClass('btn-default');
	
							 num=1;
							 var dot=".dot"+id;
							
							 if(!isNaN(parseInt($(dot).text()))){
								   num=parseInt($(dot).text())+1;
							 }
							 $(dot).text(num);
							 
						 }else if(msg.message=='del'){
							 btn.text("关注");
							 btn.addClass('btn-default');
							 btn.removeClass('btn-info');
	
							 num=0;
							 var dot=".dot"+id;
							   
							 if(!isNaN(parseInt($(dot).text()))){
								   num=parseInt($(dot).text())-1;
							 }
							 $(dot).text(num);
						 }
					   },
	                   error: function(data) {
	                      alert("操作失败！");
	             	}
			});
		}
	}
});


function hiddenImage(id){
	document.getElementById(id).innerHTML = '&nbsp;';
}

$(document).ready(function(){
	
    setToTop();
    $('pre').each(function(i, block) {
        hljs.highlightBlock(block);
    });
    //$('.editormd-preview-container pre').addClass("prettyprint linenums");

    //$('.content .body a').attr('target', '_blank');
   // $('.reply-content a ').attr('target', '_blank');
});


var CTOLIB = {};

CTOLIB.analyzeAt = function(text) {
	var usernames = [];
	
	String(text).replace(/[^@]*@([^\s@]{4,20})\s*/g, function (match, username) {
		usernames.push(username);
	});
	
	return usernames;
}

jQuery(document).ready(function($) {
	var rootpath = window.applicationPath === "" ? "" : window.applicationPath || "../..";
	//全局淡入淡出提示框 comTip
	window.comTip = function(msg){
		$("<div>").addClass("comTip").text(msg).appendTo("body");
		var timer = setInterval(function(){
			if($(".comTip").width()){
				clearInterval(timer);
				var	l = ($(window).width()-$(".comTip").outerWidth())/2;
				var	t = ($(window).height()-$(".comTip").outerHeight())/2;
				t = (t<0?0:t)+$(window).scrollTop();
				$(".comTip").css({left:l,top:t}).fadeIn(500);
				setTimeout(function(){
					$(".comTip").fadeOut(1000);
				},1800)
				setTimeout(function(){
					$(".comTip").remove()
				},3000)
			}
		},500)
	}

	// 全局公用弹出层方法
	// 弹层
	window.openPop = function(popid)
	{
		closePop();
		var pop = $(popid);
		var l = ($(window).width() - pop.outerWidth())/2;
		var t = ($(window).height() - pop.outerHeight())/2;
		t = (t<0 ? 0 : t) + $(window).scrollTop();
		pop.css({left:l,top:$(window).scrollTop(),opacity:0,display:'block'}).animate({left:l,top:t,opacity:1},500);
		$("#cto-overlay").css({width:$(document).width(),height:$(document).height()}).fadeIn(300);
	}

	// 关闭弹层
	window.closePop = function()
	{
		$(".pop").hide();
		$("#cto-overlay").fadeOut(300);
	}

	$("#cto-overlay").click(function(){closePop()});

	// 弹窗异步登录
	$('#login-pop .login-form form').on('submit', function(evt){
		evt.preventDefault();

		var username = $('#username').val(),
			passwd = $('#password').val();
		
		if (username == "") {
			
			$('#username').parent().addClass('has-error');
			return;
		}
		if (passwd == "") {
			$('#password').parent().addClass('has-error');
			return;
		}
		
  		if(passwd!=""){
  	 		$("#password").val($.md5(passwd));
  		}
  		
		$.post(rootpath+'/user/loginajax', $(this).serialize(), function(data){
			if (data.ok) {
				location.reload();
			} else {
				
				$('#login-pop .login-form .error').text(data.error).show();
			}
		});
	});

	$('#username, #passwd').on('focus', function(){$('#login-pop .login-form .error').hide();});

	
	var postLike = function(that, callback){
		if ($('#is_login_status').val() != 1) {
			openPop("#login-pop");
			return;
		}
		
		var objid = $(that).data('objid'),
			likeFlag = parseInt($(that).data('flag'), 10);

		if(btnstate==0){
			btnstate=1;
			$.post(rootpath+'/user/likeTopics/', {topicsId:objid, flag:likeFlag}, function(data){
				if (data.ok) {
					
					btnstate=0;
					
					var likeNum = parseInt($(that).children('.likenum').text(), 10);
					if($(that).children('.likenum').text()==''){
						likeNum=0;
					}
					// 已喜欢
					if (likeFlag==0) {
						$(that).data('flag', 1);
						comTip("感谢点赞！");
						$(that).addClass('hadlike').attr('title', '取消点赞');
						likeNum++;
					} else {
						$(that).data('flag', 0);
						comTip("已取消点赞！");
						$(that).removeClass('hadlike').attr('title', '我要点赞');
						likeNum--;
					}
	
					$(that).children('.likenum').text(likeNum);
	
					callback(likeNum, likeFlag);
				} else {
					alert(data.error);
				}
			});
		}
	}
	
	$('.page .like-btn').on('click', function(evt){
		evt.preventDefault();

		var that = this;
		postLike(that, function(likeNum, likeFlag){
			$('.page .meta .p-comment .like .likenum').text(likeNum);
		});
	});
	
});


	var $win = $(window);
	
	//默认的参数
	var default_options = {
	   element: null, //要加提示的元素，必填项
	   height:'auto',  //浮动层的高度
	   width:'auto',
	   message:null   //添加的提示信息，也可以在element的data-tip属性上加
	 };
	var kl=0;
	
	tipObj= {
	  
	  init:function(options){
	
	      this.render(options)
	  },
	  //创建浮动层的dom结构，并填加到body中
	  createDOM:function(element){
	      var that = this;
	      that.wrapper= $('<div class="tool-tip-box"></div> ');
	      $('body').append(this.wrapper);
	      return this;
	  },
	  //初始化
	  render:function(options){
	
	      var that = this,
	
	          //参数合并
	      options = $.extend(default_options,options),
	      msg = options.message !=null?options.message : options.element.data('tip');
	
	      that.createDOM(options.element);
	
	      that.wrapper.css({
	          width: options.width,
	          height:options.height
	      }).html(msg);
	      that.wrapper.addClass("animated flipInY");
	      that.setPosition(options.element);
	      
	      options.element.on('mouseleave',function(e){
	    	  setTimeout(function () {
	    		  if(kl==0){
	    			  that.wrapper.remove();
	    		  }
	    	  }, 300); 
	      });
	      
	      
	      that.wrapper.on('mouseleave',function(e){
	    	  setTimeout(function () {
	    		  kl=0;
	    		  that.wrapper.remove();
	    	  }, 100); 
	      });
	      
	      that.wrapper.on('mouseenter',function(e){
	    	  kl=1;
	      });
	      
	  },
	
	      //设置提示浮动层的位置，定位
	  setPosition:function(element){
		
	     var left = element.offset().left,
	         top = element.offset().top+element.height();
	
	      this.wrapper.css({
	          position:'absolute',
	          left:left,
	          top:top
	      });
	
	      return this;
	
	  }
	
	}
	
	//接口
	$.tip =$.Tip= function(options){
	  return tipObj.init(options);
	}
	
	   $(function(){
		      
		    enlargeImg();
	        $('.avatartp').on('mouseenter',function(e){
	        	
	    		var href=$(this).attr("href");
	    		var rootpath = window.applicationPath === "" ? "" : window.applicationPath || "../..";
	    		var par=href.substring(6,href.indexOf("."));
	    		var ob=$(this)[0];
	    		var obthis=$(this);
	            $.tip({
	                element:obthis,
	                message:"<i class='fa fa-refresh fa-spin fa-lg fa-fw'></i> "
	            });
	            
	    		$.get(rootpath+'/user/tooltip/'+par,function(data){
		            var $this = obthis;
		            $(".tool-tip-box").remove();
		            $.tip({
		                element:$this,
		                message:data
		            });
	    		});
	    		
	        })

	    })
	    
	//查看大图
	function enlargeImg() {
	  $("article img").click(function() {
	    $(this).after("<div onclick='closeImg()' class='enlargeImg_wrapper'></div>");
	    var imgSrc = $(this).attr('src');
	    $(".enlargeImg_wrapper").css("background-image", "url(" + imgSrc + ")");
	    $('.enlargeImg_wrapper').fadeIn(200);
	  })
	}
	//关闭并移除图层
	function closeImg() {
	  $('.enlargeImg_wrapper').fadeOut(200).remove();
	}

/**
 * Extra JS 
 */

$(function()
{

	$(document).ready(function () {
		
		$('[data-toggle="tooltip"]').tooltip();
		
		/** Disable form submit, but load stripe when creditcard is selected */
		$('#creditcard_continue').hide();		
		$('input[name="pay_method"]').change(function() {
			if(document.getElementById('creditcard_select').checked) {
				$('#payment_continue').hide();
				$('#creditcard_continue').show();
			}else{
			 	$('#payment_continue').show();
				$('#creditcard_continue').hide();
			}
			

		});		

			
		$('input[name="account_type"]').change(function() {
		    var isBusinessAccount = $('input:checked[name="account_type"]').val() == "business";

		    	$('.business_input').toggleClass("hide");
		   
		});

		
				
		$('.dropdown-menu input').click(function() {return false;})
		    .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
        .keydown('esc', function () {this.value='';$(this).change();});
		
			
		
		
		
				
	});	
});

