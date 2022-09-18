//更新日志
var updateLog = {
	"v1.0 2022/8/18": {
		"Fire起始页的第一个版本":"add",
		"目标：干翻梧桐起始页":"fixup"
	},
	"v1.1 2022/8/19": {
		"添加搜索栏引擎切换":"add",
		"添加景深特效":"add",
		"修复BUG若干":"fixup"
	},
	"v1.2 2022/8/20": {
		"模态框添加":"add",
		"修复BUG若干":"fixup"
	},
	"v1.3.1 2022/9/12": {
		"添加深色模式支持":"add"
	},
	"v1.3.2 2022/9/17": {
		"添加快捷链接":"add",
		"修复BUG若干":"fixup"
	},
	"v1.3.3 2022/9/18": {
		"添加一言点击":"add",
		"添加BUG若干":"add",
		"修复BUG若干":"fixup"
	}
}

function updateLogShow(list,div){
	var i = 0;
	for (var key in list) { 
		var childList;
		childList = list[key];
		div.append("<div class=\"card\" id=\"card" + i + "\"><h3>" + key + "</h3></div></br>");
		for (var skey in childList){
			div.children("#card" + i).append("<p><span class=\"vbar vbar-" + childList[skey] + "\"></span>" + skey + "</p>")
		}
		i++;
	}
}

updateLogShow(updateLog,$("#update-scroll"));




//底部链接
var link = [
	{
		"name":"CSDN",
		"keyword":"csdn",
		"golink":"https://blog.csdn.net/"
	}
]
var keyword = {};

if(localStorage.getItem('link') == null){
	localStorage.setItem('link',JSON.stringify(link));
	link = JSON.parse(localStorage.getItem('link'));
}else{
	link = JSON.parse(localStorage.getItem('link'));
}


function linkShow(list,div){
	$("#link-bar").empty();
	for (var key in list) { 
		div.append('<div id="link" golink="' + list[key]["golink"] + '"><img src="' + list[key]["golink"] + '/favicon.ico"><h5>'+ list[key]["name"] +'</h5></div>');
		keyword[list[key]["keyword"]] = list[key]["golink"];
	}
	$("#link-bar").append(
	'<div class="hidden" id="link-input"><input id="link-input-name" placeholder="名称"><br><input id="link-input-keyword" placeholder="简称"><br><input id="link-input-link" placeholder="链接"><br></div>'+
	'<div id="link-input-btn"><svg version="1.1"><line x1="20" y1="10" x2="20" y2="30" style="stroke-width:3"></line><line x1="10" y1="20" x2="30" y2="20" style="stroke-width:3"></line></svg></div>'
	);
	$("#link-bar").children("#link").click(function(){
		window.open($(this).attr('golink'))
	});
}

linkShow(link,$("#link-bar"));

function listenLink(){
	$("#link-input-link").keypress(function(event){
		if (event.keyCode == 13) {
			if(!$("#link-input-link").val() == '' && !$("#link-input-keyword").val() == '' && !$("#link-input-name").val() == ''){
				if ($("#link-input-link").val().substring(0,5) != "http://" || $("#link-input-link").val().substring(0,5) != "https://"){
					cachelist = {"name":$("#link-input-name").val(),"keyword":$("#link-input-keyword").val(),"golink":"https://"+$("#link-input-link").val()};
				}else{
					cachelist = {"name":$("#link-input-name").val(),"keyword":$("#link-input-keyword").val(),"golink":$("#link-input-link").val()};
				}
				link.push(cachelist);
					localStorage.setItem('link',JSON.stringify(link));
					link = JSON.parse(localStorage.getItem('link'));
				linkShow(link,$("#link-bar"));
				listenLink();
			}
			setHidden($("#link-input-btn"),false);
			setHidden($("#link-input"),true);
		}
	});


	$("#link-input-btn").click(function(){
		setHidden($("#link-input-btn"),true);
		setHidden($("#link-input"),false);
	});
}
listenLink();
