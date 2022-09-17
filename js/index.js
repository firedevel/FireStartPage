var click = 0; //堆屎

//隐藏动画
function setHidden(e,bool){
	if (bool){
		e.animate({opacity:'0'}, 200, function () {
			//过渡(css, 毫秒, 回调)
        	e.addClass("hidden");
        });
	}else{
		e.css("opacity","0");
		e.removeClass("hidden");
		e.animate({opacity:'1'}, 200);
	}

}


//引擎字典
var engineList = {
	"Bing":"https://cn.bing.com/search?q=",
	"百度":"https://www.baidu.com/s?wd="
}

if(localStorage.getItem('engineList') == null){
	localStorage.setItem('engineList',JSON.stringify(engineList));
	engineList = JSON.parse(localStorage.getItem('engineList'));
}else{
	engineList = JSON.parse(localStorage.getItem('engineList'));
}


//引擎列表初始化
function refeshList(list,ul){
	for (var key in list) { 
   		ul.append("<li>" + key + "</li>");
	}
}
refeshList(engineList,$(".sbar-sel-drop-down ul"));

//初始化引擎选择
if ($.cookie('search') == undefined){
	setSearch("Bing");
}

var search = $.cookie('search');
$("#select-btn").text(search);
selectList(".sbar-sel-drop-down ul li", search);

function setSearch(sets){
	$.cookie('search', sets);
	$("#select-btn").text(sets);
}
function selectList(sets,list){
	$(sets + ":not(this)").removeClass("selected");
	$(sets+":contains('" + list + "')").addClass("selected");
}
//菜单显示、隐藏
$("#select-btn").click(function() {
    setHidden($("#sbar-sel-drop-down"),false);
});
$("body").click(function() {
	click += 1;
	if (click == 2){
		setHidden($("#sbar-sel-drop-down"),true);
		click = 0;
	}
});




//菜单选择生效
$(".sbar-sel-drop-down ul li").click(function(){
	search = $(this).text();
	setSearch(search);
	selectList(".sbar-sel-drop-down ul li", search);
});

//搜索
function searchNow(question,list,engine){
	window.open(list[engine] + question);
}


$("#sbar-input").keydown(function (event) {
	if(event.keyCode == "13"){
		$("#sbar-btn").click();
	}
});
$("#sbar-btn").click(function () {
	searchNow($("#sbar-input").val(),engineList,search);
});

//背景特效
$("#sbar-input").on("focus", function() {
	deepEffect(true);
	hitokoto(function(data){
		$("#hitoko-content").text(data.hitokoto);
		$("#hitoko-author").text("--" + data.from);
		setHidden($("#hitoko-bar"),false);
		setHidden($("#link-bar"),true);
	}); //刷新一言
	
});

$("#sbar-input").on("blur", function() {
	deepEffect(false);
	setHidden($("#hitoko-bar"),true);
	setHidden($("#link-bar"),false);
});

function deepEffect(use){
	if (use){
		$(".bg-img").addClass("bg-deep");
		$(".sbar").addClass("sbar-deep");
	}else{
		$(".bg-img").removeClass("bg-deep");
		$(".sbar").removeClass("sbar-deep");
	}
}

//一言
hitokoto($("#hitoko-content"),$("#hitoko-author"));//第一次刷新
function hitokoto(callback){
  $.ajax({
    type: 'GET',
    url: 'https://v1.hitokoto.cn',
    success (data) {
		//text.attr('href', 'https://hitokoto.cn/?uuid=' + data.uuid);
		callback(data);
    },
    error (jqXHR, textStatus, errorThrown) {
      // 错误信息处理
      console.error(textStatus, errorThrown)
    }
  });

}
//毛大佬的
//{"id":1266,"uuid":"3b7b75c3-d73a-4369-b9c0-6c8002940bb6","hitokoto":"腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。","type":"g","from":"滕王阁序","from_who":null,"creator":"毛毛毛布斯","creator_uid":562,"reviewer":0,"commit_from":"web","created_at":"1507184728","length":24}


//二级页面




//时间
function showTime() {
    var date = new Date()
    // 时分秒
    var hour = date.getHours();
	if (date.getMinutes() < 10){
		var minute = "0" + date.getMinutes();
	}else{
		var minute = date.getMinutes();
	}
    var secondPro = (date.getSeconds() * 1.6)
    // 实时显示
	$("#time").text(hour + ":" + minute);
	$("#time-pro").css("width", secondPro + "%");
}
setInterval('showTime()', 1000);


//模态框
var thisModel;
$("#model-btn").click(function(){
	thisModel = $("#" + $(this).attr("model-open"));
	setHidden(thisModel,false);
});
			

$("#model-close").click(function(){
	setHidden(thisModel,true);
});
