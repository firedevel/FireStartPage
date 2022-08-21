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

