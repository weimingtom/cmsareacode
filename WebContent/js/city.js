$(function() {
	$(".proCitySelAll").click(function(event) {
		if ($("body").data("CitysAll") == null) {
			sendAllCitiesAjax();//获取所有的城市
		}
		$(this).select();
		$(".provinceCity").hide();
		$(".provinceCityAll").hide();
		$("#dimCityQuery").hide();
		var o2 = $(this).offset();
		var l2 = o2.left;
		var t2 = o2.top;
		var h2 = $(this).height();
		$(".provinceCityAll").css("top", t2 + h2 - 1).css("left", l2).toggle();
		$(".provinceCityAll").click(function(event) {
			event.stopPropagation();
		});
		event.stopPropagation();
		$("html").click(function() {
			$(".provinceCityAll").hide();
		});
		$("input.proCitySelAll").removeClass("current2");
		$(this).addClass("current2");
		$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
		$(".provinceCityAll").find(".tabs").find("a[tb=provinceAll]").addClass("current");
		$(".provinceCityAll").find(".con").children().hide();
		$(".provinceCityAll").find(".con").find(".provinceAll").show();
		if ($("body").data("allProvinces") == null) {
			sendAllProvinceAjax();
		}
		if ($("body").data("allCountys") == null) {
			sendAllCountiesAjax();
		}
		if ($("body").data("allTowns") == null) {
			//sendAllTownsAjax();
		}
		$(".provinceCityAll").find(".tabs").find("a").click(function() {
			if ($(this).attr("tb") == "cityAll" && $(".provinceAll .list .current").val() == null) {
				return;
			};
			if ($(this).attr("tb") == "countyAll" && $(".cityAll .list .current").val() == null && $(".hotCityAll .list .current").val() == null) {
				return;
			};
			if ($(this).attr("tb") == "townAll" && $(".countyAll .list .current").val() == null && $(".hotCountryAll .list .current").val() == null) {
				return;
			};
			$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
			$(this).addClass("current");
			var tb = $(this).attr("tb");
			$(".provinceCityAll").find(".con").children().hide();
			$(".provinceCityAll").find(".con").find("." + tb).show();
		});
	});
}); 
$(function() {
	$(".proCitySelAll_Img").click(function(event) {
		event.stopPropagation();
		$(this).prev().trigger("click");
	});
});
function wrongMsg(object, msg) {
	$(".wrongMsg").text(msg);
	object.addClass("wrong");
}
$(function() {
	var picNum = $("div.flashPic img").size();
	var isNum = 0;
	var str = [];
	var imgDiv = $("div.flashPic");
	var $div = $("div.picNum");
	imgDiv.find("img").hide().eq(0).show();
	for (var i = 0; i < picNum; i++) {
		str[i] = "<a href='javascript:'>" + (i + 1) + "</a>";
	}
	$div.html(str.join(""));
	$div.find("a:eq(0)").addClass("on");
	function MovePic() {
		if ((isNum + 1) >= picNum) {
			isNum = 0;
		}
		 else {
			isNum = isNum + 1;
		}
		imgDiv.find("img").hide().eq(isNum).fadeIn(500);
		$div.find("a").removeClass("on").eq(isNum).addClass("on");
	}
	var setFn = setInterval(MovePic, 4000);
	$div.find("a").click(function() {
		clearInterval(setFn);
		var j = $(this).index();
		$div.find("a").removeClass("on").siblings().eq(j).addClass("on");
		imgDiv.find("img").hide();
		imgDiv.find("img").eq(j).fadeIn(500);
		isNum = j;
		setFn = setInterval(MovePic, 4000);
	});
});

$(function() {
	
	var clkIndex;
	var currentClass;
	var allCitys;
	var allProvinces;
	var allCountys;
	var allTowns;
	var townsAll;
	var thisObj;
	var dimCityDiv = "<div id='dimCityQuery'><ul></ul></div>";
	$("body").append(dimCityDiv);
	$("body").delegate(".proCityQuery,.proCityQueryAll", ($.browser.opera ? "keypress": "keyup"),
	function(event) {

		if ($("#dimCityQuery:visible").size() == 0) {
			$(".backifname").hide();
		}
		$(".provinceCity").hide();
		$(".provinceCityAll").hide();
		if ($(this).hasClass("proCityQueryAll"))
		 {
			if ($("body").data("allProvinces") == null) {
				sendAllProvinceAjax();
			}
			if ($("body").data("CitysAll") == null) {
				sendAllCitiesAjax();
			}
			if ($("body").data("allCountys") == null) {
				sendAllCountiesAjax();
			}
			if ($("body").data("allTowns") == null) {
				sendAllTownsAjax();
			}
			
			currentClass = "proCityQueryAll";
			clkIndex = $("body").find(".proCityQueryAll").index(this);
			allCitys = $("body").data("CitysAll");
			allProvinces = $("body").data("allProvinces");
			allCountys = $("body").data("allCountys");
			allTowns = $("body").data("allTowns");
			
			thisObj = $(this);
		}
		if ($(this).hasClass("proCityQuery"))
		 {
			if ($("body").data("allExistProvinces") == null) {
				sendProvinceAjax();
			}
			if ($("body").data("allExistCitys") == null) {
				sendCitiesAjax();
			}
			if ($("body").data("allExistCountys") == null) {
				sendCountiesAjax();
			}
			if ($("body").data("allExistTowns") == null) {
				sendTownsAjax();
			}
			currentClass = "proCityQuery";
			clkIndex = $("body").find(".proCityQuery").index(this);
			allCitys = $("body").data("allExistCitys");
			allProvinces = $("body").data("allExistProvinces");
			allCountys = $("body").data("allExistCountys");
			allTowns = $("body").data("allExistTowns");
			thisObj = $(this);
		}
		lastKeyPressCode = event.keyCode;
		switch (lastKeyPressCode) {
		case 40:
			$("#dimCityQuery").trigger("selNext");
			return false;
			break;
		case 38:
			$("#dimCityQuery").trigger("selPrev");
			return false;
			break;
		case 13:
			$("#dimCityQuery").trigger("enter");
			return false;
			break;
		}
		v = $.trim($(this).val());
		if (v == "" || v == null) {
			return false;
		}
		$(".provinceCity").hide();
		var o = $(this).offset();
		var l = o.left;
		var t = o.top;
		var w = $(this).width();
		var h = $(this).height();
		var htmlArr = [];
		var autoWidth;
		for (i = 0; i < allCountys.length; i++) {
			if (v.toUpperCase() === allCountys[i].pinYinChar.substring(0, v.length)) {
				htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCountys[i].provinceId + " cityId=" + allCountys[i].cityId + " countyId=" + allCountys[i].id + ">" + allCountys[i].cityName + "-" + allCountys[i].areaName + " (<span style='color:red'>" + v.toUpperCase() + "</span>" + allCountys[i].pinYinChar.substring(v.length, allCountys[i].pinYinChar.length) + ")</a></li>";
				if (htmlArr.length > 9) {
					break;
					return false;
				}
				autoWidth = autoWidth < (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYinChar).length ? (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYinChar).length: autoWidth;
				continue;
			};
			if (v === allCountys[i].areaName.substring(0, v.length)) {
				htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCountys[i].provinceId + " cityId=" + allCountys[i].cityId + " countyId=" + allCountys[i].id + ">" + allCountys[i].cityName + "-" + "<span style='color:red'>" + v + "</span>" + allCountys[i].areaName.substring(v.length, allCountys[i].areaName.length) + " (" + allCountys[i].pinYinChar + ")</a></li>";
				if (htmlArr.length > 9) {
					break;
					return false;
				}
				autoWidth = autoWidth < (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYinChar).length ? (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYinChar).length: autoWidth;
				continue;
			};
			if (v.toLowerCase() === allCountys[i].pinYin.substring(0, v.length)) {
				htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCountys[i].provinceId + " cityId=" + allCountys[i].cityId + " countyId=" + allCountys[i].id + ">" + allCountys[i].cityName + "-" + allCountys[i].areaName + " (<span style='color:red'>" + v.toLowerCase() + "</span>" + allCountys[i].pinYin.substring(v.length, allCountys[i].pinYin.length) + ")</a></li>"
				if (htmlArr.length > 9) {
					break;
					return false;
				}
				autoWidth = autoWidth < (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYin).length ? (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYin).length: autoWidth;
				continue;
			};
		}
		for (i = 0; i < allCitys.cities.length; i++) {
			if (v.toUpperCase() === allCitys.cities[i].cityShortPY.substring(0, v.length)) {
				htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCitys.cities[i].provinceId + " cityId=" + allCitys.cities[i].id + ">" + allCitys.cities[i].name + " (<span style='color:red'>" + v.toUpperCase() + "</span>" + allCitys.cities[i].cityShortPY.substring(v.length, allCitys.cities[i].cityShortPY.length) + ")</a></li>";
				if (htmlArr.length > 9) {
					break;
					return false;
				}
				autoWidth = autoWidth < (allCitys.cities[i].name + allCitys.cities[i].cityShortPY).length ? (allCitys.cities[i].name + allCitys.cities[i].cityShortPY).length: autoWidth;
				continue;
			};
			if (v === allCitys.cities[i].name.substring(0, v.length)) {
				htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCitys.cities[i].provinceId + " cityId=" + allCitys.cities[i].id + "><span style='color:red'>" + v + "</span>" + allCitys.cities[i].name.substring(v.length, allCitys.cities[i].name.length) + " (" + allCitys.cities[i].cityShortPY + ")</a></li>";
				if (htmlArr.length > 9) {
					break;
					return false;
				}
				autoWidth = autoWidth < (allCitys.cities[i].name + allCitys.cities[i].cityShortPY).length ? (allCitys.cities[i].name + allCitys.cities[i].cityShortPY).length: autoWidth;
				continue;
			};
			if (v.toLowerCase() === allCitys.cities[i].cityPinyin.substring(0, v.length)) {
				htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCitys.cities[i].provinceId + " cityId=" + allCitys.cities[i].id + ">" + allCitys.cities[i].name + " (<span style='color:red'>" + v.toLowerCase() + "</span>" + allCitys.cities[i].cityPinyin.substring(v.length, allCitys.cities[i].cityPinyin.length) + ")</a></li>"
				if (htmlArr.length > 9) {
					break;
					return false;
				}
				autoWidth = autoWidth < (allCitys.cities[i].name + allCitys.cities[i].cityPinyin).length ? (allCitys.cities[i].name + allCitys.cities[i].cityPinyin).length: autoWidth;
				continue;
			};
		};
		if (htmlArr == "" || htmlArr == null) {
			$("#dimCityQuery ul").html("<li class='none'>对不起,没有找到该城市</li>");
			return false;
		} else {
			$("#dimCityQuery ul").html(htmlArr.join("")).find("li:first").addClass("current");
		};
		if (autoWidth < 200) {
			autoWidth = 200;
		}
		$("#dimCityQuery").css("width", autoWidth).css("top", t + h - 1).css("left", l).show();
		$(".backifname").show();
		$("html").click(function() {
			$("#dimCityQuery").hide();
			$(".backifname").hide();
		});
	});
	$("body").delegate("#dimCityQuery li", "hover",
	function() {
		$(this).addClass("current").siblings().removeClass("current");
	},
	function() {
		$(this).removeClass("current");
	});
	$("#dimCityQuery").delegate("", "selNext",
	function() {
		var next = $(this).find("li.current").next();
		if (next.size() > 0) {
			next.addClass("current").siblings().removeClass("current");
		}
		 else {
			$("#dimCityQuery li").removeClass("current").first().addClass("current");
		};
	});
	$("#dimCityQuery").delegate("", "selPrev",
	function() {
		var prev = $(this).find("li.current").prev();
		if (prev.size() > 0) {
			prev.addClass("current").siblings().removeClass("current");
		}
		 else {
			$("#dimCityQuery li").removeClass("current").last().addClass("current");
		};
	});
	$("#dimCityQuery").delegate("", "enter",
	function(event) {
		var cur = $(this).find("li.current");
		if (cur.size() > 0) {
			cur.find("a").trigger("click");
		};
	});
	$("body").delegate("#dimCityQuery li a.allcityClass", "click",
	function() {
		var vm = $(this).text();
		var provinceId = $(this).attr("provinceId");
		var cityId = $(this).attr("cityId");
		var countyId = $(this).attr("countyId");
		var provinceName;
		var cityName;
		var rtn;
		for (i = 0; i < allProvinces.length; i++) {
			if (allProvinces[i].id == provinceId) {
				provinceName = allProvinces[i].provinceName;
			};
		}
		for (i = 0; i < allCitys.cities.length; i++) {
			if (allCitys.cities[i].id == cityId) {
				cityName = allCitys.cities[i].name;
			}
		}
		if (currentClass == "proCityQueryAll") {
			$("body").data("pAllId", provinceId);
			$("body").data("cAllId", cityId);
			$("body").data("aAllId", countyId);
			$("body").data("pAllName", provinceName);
			$("body").data("nameOfCityAll", cityName);
		}
		if (currentClass == "proCityQuery") {
			$("body").data("pId", provinceId);
			$("body").data("cId", cityId);
			$("body").data("aId", countyId);
			$("body").data("pName", provinceName);
			$("body").data("nameOfCity", cityName);
		}
		vm = vm.split("(");
		countyName = $.trim(vm[0]);
		if (countyId == null || countyName == cityName)
		 {
			if (currentClass == "proCityQuery")
			 {
				thisObj.trigger("click");
				counties = [];
				var j = 0;
				$.each(allCountys,
				function(i, county) {
					if (county.cityId == cityId) {
						counties[j++] = county;
					}
				});
				countyTotalPage = Math.ceil(counties.length / p_pageSize);
				$(".provinceCity").find(".tabs").find("a").removeClass("current");
				$(".provinceCity .tabs").find("#county").addClass("current");
				$(".con .city .list a").removeClass("current");
				$(".provinceCity").find(".con").children().hide();
				$(".provinceCity").find(".con").find(".county").show();
				$(".con .provinceAll .list a").removeClass("current");
				countyPage(1);
			}
			 else if (currentClass == "proCityQueryAll")
			 {
				thisObj.trigger("click");
				countiesAll = [];
				var j = 0;
				$.each(allCountys,
				function(i, county) {
					if (county.cityId == cityId && county.areaName != cityName) {
						countiesAll[j++] = county;
					}
				});
				countyTotalPageAll = Math.ceil(countiesAll.length / p_pageSize);
				$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
				$(".provinceCityAll .tabs").find("#countyAll").addClass("current");
				$(".con .cityAll .list a").removeClass("current");
				$(".provinceCityAll").find(".con").children().hide();
				$(".provinceCityAll").find(".con").find(".countyAll").show();
				$(".con .provinceAll .list a").removeClass("current");
				allCountyPage(1);
			}
		}
		 else
		 {
			rtn = provinceName + "-" + countyName;
			if (currentClass == "proCityQueryAll")
			 {
				$("body").find(".proCityQueryAll").eq(clkIndex).val(rtn);
				$("body").find(".proCityQueryAll").eq(clkIndex).trigger("change");
				$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
				$(".provinceCityAll").find(".tabs").find("a[tb=hotCityAll]").addClass("current");
				$(".provinceCityAll .con .list a").removeClass("current");
				$(".provinceCityAll .con .list a input").removeClass("current");
			}
			if (currentClass == "proCityQuery")
			 {
				$("body").find(".proCityQuery").eq(clkIndex).val(rtn);
				$("body").find(".proCityQuery").eq(clkIndex).trigger("change", [cityId, countyId]);
				$(".provinceCity").find(".tabs").find("a").removeClass("current");
				$(".provinceCity").find(".tabs").find("a[tb=hotCity]").addClass("current");
				$(".provinceCity .con .list a").removeClass("current");
				$(".provinceCity .con .list a input").removeClass("current");
			}
		}
		$("#dimCityQuery").hide();
		$(".backifname").hide();
		return false;
	});
	$(".nomarl").live("focus",
	function() {
		var ov = $.trim($(this).attr("ov"));
		var val = $.trim($(this).val());
		$(this).css({
			"color": "#000"
		});
		if (val == ov) {
			$(this).val("");
		}
	});
	$(".nomarl").live("blur",
	function() {
		var ov = $.trim($(this).attr("ov"));
		var val = $.trim($(this).val());
		if (val == "" || val == ov) {
			$(this).val(ov).css({
				"color": "#aaa"
			});
		}
	});
});

//选中省份查询对应的城市
function sendCitiesAjax() {
	$.ajax({
		type: "get",
		url: path+'?act=queryCities',
		async: true,
		dataType: "json",
		success: function(data) {
			cities = data.cities;
			$("body").data("allExistCitys", data);
			viewHotCities();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		 {
			//alert("网络繁忙，请稍后再试！");
			myCityAlert();
		}
	});
}


//选中城市查询对应的乡镇
function sendTownsAjax() {
	$.ajax({
		type: "get",
		url: path+'?act=queryAllTowns',
		async: true,
		dataType: "json",
		success: function(data) {
			cities = data.cities;
			$("body").data("allExistTowns", data);
			viewTowns();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		 {
			//alert("网络繁忙，请稍后再试！");
			myCityAlert();
		}
	});
}


//查询得到热门城市列表html
function viewHotCities() {
	$.each(cities,
	function(i, city) {
		if (city.hotCity) {
			$(".hotCity .list ul").append("<li><a><input type='button' style='background:none;border:0px;cursor: pointer;' onclick=hotCityAddrInput(\'" + city.provinceId + "," + city.id + "," + city.name + "\') id='" + city.id + "' value='" + city.name + "'></a></li>");
		}
	});
}

//查询得到乡镇列表htnl
function viewTowns() {
	$.each(cities,
	function(i, city) {
		if (city.hotCity) {
			$(".townAll .list ul").append("<li><a><input type='button' style='background:none;border:0px;cursor: pointer;' onclick=hotCityAddrInput(\'" + city.provinceId + "," + city.id + "," + city.name + "\') id='" + city.id + "' value='" + city.name + "'></a></li>");
		}
	});
}

$(function() {
	
	//点击上一个，下一个
	$(".province .pre a").bind('click',
	function() {
		var provincePage = parseInt($('#provincePage').html());
		if (provincePage == 1) {
			return;
		}
		viewProvince(provincePage - 1);
	});
	$(".city .pre a").bind('click',
	function() {
		var cityPages = parseInt($('#cityPage').html());
		if (cityPages == 1) {
			return;
		}
		cityPage(cityPages - 1);
	});
	$(".county .pre a").bind('click',
	function() {
		var countyPages = parseInt($('#countyPage').html());
		if (countyPages == 1) {
			return;
		}
		countyPage(countyPages - 1);
	});
	$(".province .next a").bind('click',
	function() {
		var provincePage = parseInt($('#provincePage').html());
		provinceTotalPage = countProvincePages();
		if (provincePage == provinceTotalPage) {
			return;
		}
		viewProvince(provincePage + 1);
	});
	$(".city .next a").bind('click',
	function() {
		if ($(this).hasClass("can")) {
			var cityPages = parseInt($('#cityPage').html());
			cityPage(cityPages + 1);
		}
	});
	$(".county .next a").bind('click',
	function() {
		if ($(this).hasClass("can")) {
			var countyPages = parseInt($('#countyPage').html());
			countyPage(countyPages + 1);
		}
	});
});




function json2str(o) {
	var arr = [];
	var fmt = function(s) {
		if (typeof s == 'object' && s != null) return json2str(s);
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'": s;
	};
	for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
	return '{' + arr.join(',') + '}';
}




function countProvincePages() {
	provinceTotalPage = Math.ceil(provinces.length / p_pageSize);
	return provinceTotalPage;
}
function viewProvince(page) {
	$(".province .list ul li").remove();
	if (page == 1) {
		$(".province .pre a").removeClass("can");
		$(".province .next a").addClass("can");
	} else {
		$(".province .pre a").addClass("can");
		$(".province .next a").addClass("can");
	}
	var end;
	var start;
	if (page == provinceTotalPage) {
		start = (page - 1) * p_pageSize;
		end = provinces.length;
		$(".province .next a").removeClass("can");
	} else {
		start = (page - 1) * p_pageSize;
		end = start + p_pageSize;
	}
	for (var i = start; i < end; i++) {
		var p_id = provinces[i].id;
		var p_name = provinces[i].provinceName;
		if (provinces[i].provinceName == '内蒙古自治区') {
			p_name = '内蒙古';
		} else if (provinces[i].provinceName == '黑龙江省') {
			p_name = '黑龙江';
		} else {
			p_name = provinces[i].provinceName.substr(0, 2);
		}
		var li = $('<li><a style="background: none repeat scroll 0% 0% transparent; border: 0px none;" href="javascript:onclick=viewCities(' + i + ');" id="' + p_id + '">' + p_name + '</a></li>');
		$(".province .list ul").append(li);
	}
	$(".province .list #provincePage").remove();
	$(".province .list").append("<label id='provincePage' style='display:none;'>" + page + "</label>");
}
function viewCities(i) {
	proId = provinces[i].id;
	$("body").data("pName", provinces[i].provinceName);
	$("body").data("pId", proId);
	citys = [];
	var j = 0;
	$.each(cities,
	function(i, city) {
		if (city.provinceId == proId) {
			citys[j++] = city;
		}
	});
	cityTotalPage = Math.ceil(citys.length / p_pageSize);
	$(".provinceCity").find(".tabs").find("a").removeClass("current");
	$(".provinceCity .tabs").find("#city").addClass("current");
	$(".con .province .list a").removeClass("current");
	$(".con .province .list a[id='" + proId + "']").addClass("current");
	$(".provinceCity").find(".con").children().hide();
	$(".provinceCity").find(".con").find(".city").show();
	cityPage(1);
}
function cityPage(page) {
	$(".city .list ul li").remove();
	$(".cityAll .list ul li").remove();
	if (page == 1) {
		$(".city .pre a").removeClass("can");
	} else {
		$(".city .pre a").addClass("can");
	}
	var start;
	var end;
	if (page <= 1) {
		page = 1;
		$(".city .pre a").removeClass("can");
		$(".city .next a").addClass("can");
	}
	if (cityTotalPage == 1) {
		$(".city .next a").removeClass("can");
		$(".city .pre a").removeClass("can");
	}
	if (page >= cityTotalPage) {
		page = cityTotalPage;
		$(".city .next a").removeClass("can");
		start = (page - 1) * p_pageSize;
		end = citys.length;
	} else if (page == 1) {
		start = (page - 1) * p_pageSize;
		end = start + p_pageSize;
		$(".city .pre a").removeClass("can");
		$(".city .next a").addClass("can");
	} else {
		start = (page - 1) * p_pageSize;
		end = start + p_pageSize;
		$(".city .next a").addClass("can");
		$(".city .pre a").addClass("can");
	}
	for (var i = start; i < end; i++) {
		var c_id = citys[i].id;
		var cityName = citys[i].name.substr(0, 4);
		var li = $('<li><a href="javascript:onclick=viewCounties(' + i + ')" id="' + c_id + '">' + cityName + '</a></li>');
		$(".city .list ul").append(li);
	}
	$(".city .list #cityPage").remove();
	$(".city .list").append("<label id='cityPage' style='display:none;'>" + page + "</label>");
}
function viewCounties(i) {
	cityId = citys[i].id;
	$("body").data("cId", cityId);
	var nameOfCity = $.trim(citys[i].name);
	$("body").data("nameOfCity", nameOfCity);
	counties = [];
	var j = 0;
	$.each(areas,
	function(i, county) {
		if (county.cityId == cityId) {
			counties[j++] = county;
		}
	});
	countyTotalPage = Math.ceil(counties.length / p_pageSize);
	$(".provinceCity").find(".tabs").find("a").removeClass("current");
	$(".provinceCity .tabs").find("#county").addClass("current");
	$(".con .city .list a").removeClass("current");
	$(".con .city .list a[id='" + cityId + "']").addClass("current");
	$(".provinceCity").find(".con").children().hide();
	$(".provinceCity").find(".con").find(".county").show();
	countyPage(1);
}
function countyPage(page) {
	var nameValue = $("input.current1").attr("name");
	var nameOfProvince = $("body").data("pName");
	var cityCurName = $("body").data("nameOfCity");
	$("input.current1").removeClass("iGrays");
	$("input.current1").val(nameOfProvince + "-" + cityCurName);
	$(".county .list ul li").remove();
	if (page == 1) {
		$(".county .pre a").removeClass("can");
	} else {
		$(".county .pre a").addClass("can");
	}
	var start;
	var end;
	if (page <= 1) {
		page = 1;
		$(".county .pre a").removeClass("can");
		$(".county .next a").addClass("can");
	}
	if (countyTotalPage == 1) {
		$(".county .next a").removeClass("can");
		$(".county .pre a").removeClass("can");
	}
	if (page >= countyTotalPage) {
		page = countyTotalPage;
		$(".county .next a").removeClass("can");
		start = (page - 1) * p_pageSize;
		end = counties.length;
	} else if (page == 1) {
		start = (page - 1) * p_pageSize;
		end = start + p_pageSize;
		$(".county .pre a").removeClass("can");
		$(".county .next a").addClass("can");
	} else {
		start = (page - 1) * p_pageSize;
		end = start + p_pageSize;
		$(".county .next a").addClass("can");
		$(".county .pre a").addClass("can");
	}
	for (var i = start; i < end; i++) {
		var c_id = counties[i].id;
		var countyName = counties[i].areaName.substr(0, 4);;
		var li = $('<li><a href="javascript:onclick=addrInput(' + i + ')" id="' + c_id + '">' + countyName + '</a></li>');
		$(".county .list ul").append(li);
	}
	$(".county .list #countyPage").remove();
	$(".county .list").append("<label id='countyPage' style='display:none;'>" + page + "</label>");
}
function addrInput(i) {
	var countyId = $.trim(counties[i].id);
	$(".con .hotCity .list a input").removeClass("current");
	$(".con .hotCity .list a input[id='" + cityId + "']").addClass("current");
	$(".con .county .list a").removeClass("current");
	$(".con .county .list a[id='" + countyId + "']").addClass("current");
	proId = $("body").data("pId");
	cityId = $("body").data("cId");
	var p = null;
	$.each(provinces,
	function(i, province) {
		if (province.id == proId) {
			p = province.provinceName;
			return false;
		}
	});
	var c = null;
	$.each(cities,
	function(i, city) {
		if (city.id == cityId) {
			c = city.name;
			return false;
		}
	});
	var a = null;
	$.each(counties,
	function(i, county) {
		if (county.id == countyId) {
			a = county.areaName;
			return false;
		}
	});
	$("input.current1").removeClass("iGrays");
	$(".provinceCity").hide();
	var rtn = p + "-" + c + "-" + a;
	$("input.current1").val(rtn);
	$(".backifname").hide();
	var nameValue = $("input.current1").attr("name");
	if (nameValue == 'order.sdeptProCity')
	 {
		$("#deptCityId").val(cityId);
		$("input[name='order.sdeptProCity']").trigger("change", [cityId, countyId]);
	}
	if (nameValue == 'consignor.deptProCity')
	 {
		$("input[name='consignor.deptProCity']").trigger("change", [cityId, countyId]);
	}
	if (nameValue == 'template.sdeptProCity')
	 {
		$("input[name='template.sdeptProCity']").trigger("change", [cityId, countyId]);
	}
}

var allProvinces = null;
var allCities = null;
var allAreas = null;
var allProId = null;
var cityIdAll = null;
var townIdAll = null;
var countryIdAll=null;
var provinceAllTotalPage = null;
var pa_pageSize = 12;
var pa_currentPage = 1;
function sendAllProvinceAjax() {
	$.ajax({
		type: "get",
		url: path+"?act=queryProvinces",
		async: true,
		dataType: "json",
		success: function(data) {
			allProvinces = data.provinces;
			$("body").data("allProvinces", allProvinces);
			viewAllProvince(1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		 {
			//alert(textStatus);
			myCityAlert();
		}
	});
}

//获取热门城市json
function sendAllCitiesAjax() {
	$.ajax({
		type: "get",
		url: path+'?act=queryCities',
		async: true,
		dataType: "json",
		success: function(data) {
			allCities = data.cities;
			$("body").data("CitysAll", data);
			viewAllHotCities();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		 {
			//alert(textStatus);
			myCityAlert();
		}
	});
}

//获取区县json
function sendAllCountiesAjax()
 {
	$.ajax({
		type: "get",
		url: path+'?act=queryAllAreas',
		async: true,
		dataType: "json",
		success: function(data) {
			allAreas = data.areas;
			$("body").data("allCountys", data.areas);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		 {
			//alert("网络繁忙，请稍后再试！");
			myCityAlert();
		}
	});
}

//获取镇乡json
function sendAllTownsAjax()
 {
	$.ajax({
		type: "get",
		url: path+'?act=queryAllTowns',
		async: true,
		dataType: "json",
		success: function(data) {
			allTowns = data.towns;
			$("body").data("allTowns", data.towns);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		 {
			//alert("网络繁忙，请稍后再试！");
			myCityAlert();
		}
	});
}


function viewAllHotCities() {
	$.each(allCities,
	function(i, city) {
		if (city.hotCity) {
			$(".hotCityAll .list ul").append("<li><a><input type='button' style='background:none;border:0px;cursor: pointer;' onclick=hotCityAddrInputAll(\'" + city.provinceId + "," + city.id + "," + city.name + "\') id='" + city.id + "' value='" + city.name + "'></a></li>");
		}
	});
}

$(function() {
	$(".provinceAll .pre a").bind('click',
	function() {
		var provincePage1 = parseInt($('#provincePage1').html());
		if (provincePage1 == 1) {
			return;
		}
		viewAllProvince(provincePage1 - 1);
	});
	$(".cityAll .pre a").bind('click',
	function() {
		var cityPages1 = parseInt($('#cityPage1').html());
		if (cityPages1 == 1) {
			return;
		}
		allCityPage(cityPages1 - 1);
	});
	$(".countyAll .pre a").bind('click',
	function() {
		var countyPages = parseInt($('#countyPage1').html());
		if (countyPages == 1) {
			return;
		}
		allCountyPage(countyPages - 1);
	});
	
	$(".townAll .pre a").bind('click',
			function() {
				var townPages = parseInt($('#townPage1').html());
				if (townPages == 1) {
					return;
				}
				allTownPage(townPages - 1);
	});
	
	$(".provinceAll .next a").bind('click',
	function() {
		var provincePage1 = parseInt($('#provincePage1').html());
		provinceAllTotalPage = countAllProvincePages();
		if (provincePage1 >= provinceAllTotalPage) {
			return;
		}
		viewAllProvince(provincePage1 + 1);
	});
	$(".cityAll .next a").bind('click',
	function() {
		if ($(this).hasClass("can")) {
			var cityPages1 = parseInt($('#cityPage1').html());
			allCityPage(cityPages1 + 1);
		}
	});
	$(".countyAll .next a").bind('click',
	function() {
		if ($(this).hasClass("can")) {
			var countyPages = parseInt($('#countyPage1').html());
			allCountyPage(countyPages + 1);
		}
	});
	
	$(".townAll .next a").bind('click',
			function() {
				if ($(this).hasClass("can")) {
					var countyPages = parseInt($('#townPage1').html());
					allTownPage(countyPages + 1);
				}
			});
})

function json2str(o) {
	var arr = [];
	var fmt = function(s) {
		if (typeof s == 'object' && s != null) return json2str(s);
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'": s;
	};
	for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
	return '{' + arr.join(',') + '}';
}
function countAllProvincePages() {
	provinceAllTotalPage = Math.ceil(allProvinces.length / pa_pageSize);
	return provinceAllTotalPage;
}

//省页
function viewAllProvince(page) {
	$(".provinceAll .list ul li").remove();
	if (page == 1) {
		$(".provinceAll .pre a").removeClass("can");
		$(".provinceAll .next a").addClass("can");
	} else {
		$(".provinceAll .pre a").addClass("can");
		$(".provinceAll .next a").addClass("can");
	}
	var end;
	var start;
	if (page == provinceAllTotalPage) {
		start = (page - 1) * pa_pageSize;
		end = allProvinces.length;
		$(".provinceAll .next a").removeClass("can");
	} else {
		start = (page - 1) * pa_pageSize;
		end = start + pa_pageSize;
	}
	for (var i = start; i < end; i++) {
		var p_id = allProvinces[i].area_code;
		var p_name = allProvinces[i].name;
		if (allProvinces[i].name == '内蒙古自治区') {
			p_name = '内蒙古';
		} else if (allProvinces[i].name == '黑龙江省') {
			p_name = '黑龙江';
		} else {
			p_name = allProvinces[i].name.substr(0, 2);
		}
		var li = $('<li><a style="background: none repeat scroll 0% 0% transparent; border: 0px none;" href="javascript:onclick=viewAllCities(' + i + ');" id="' + p_id + '">' + p_name + '</a></li>');
		$(".provinceAll .list ul").append(li);
	}
	$(".provinceAll .list #provincePage1").remove();
	$(".provinceAll .list").append("<label id='provincePage1' style='display:none;'>" + page + "</label>");
}
function viewAllCities(i) {
	allProId = allProvinces[i].area_code;
	$("body").data("pAllName", allProvinces[i].name);
	$("body").data("pAllId", allProId);
	allCitys = [];
	var j = 0;
	$.each(allCities,
	function(i, city) {
		if (city.parent_code == allProId) {
			allCitys[j++] = city;
		}
	});
	allCityTotalPage = Math.ceil(allCitys.length / pa_pageSize);
	$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
	$(".provinceCityAll .tabs").find("#cityAll").addClass("current");
	$(".con .provinceAll .list a").removeClass("current");
	$(".con .provinceAll .list a[id='" + allProId + "']").addClass("current");
	$(".provinceCityAll").find(".con").children().hide();
	$(".provinceCityAll").find(".con").find(".cityAll").show();
	allCityPage(1);
}




//加载区县
function viewAllCounties(i) {
	cityIdAll = allCitys[i].area_code;
	$("body").data("cAllId", cityIdAll);
	var cityname = $.trim(allCitys[i].name);
	$("body").data("nameOfCityAll", cityname);
	countiesAll = [];
	var j = 0;
	$.each(allAreas,
	function(i, countys) {
		if (countys.parent_code == cityIdAll) {
			countiesAll[j++] = countys;
		}
	});
	countyTotalPageAll = Math.ceil(countiesAll.length / pa_pageSize);
	$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
	$(".provinceCityAll .tabs").find("#countyAll").addClass("current");
	$(".con .cityAll .list a").removeClass("current");
	$(".con .cityAll .list a[id='" + cityIdAll + "']").addClass("current");
	$(".provinceCityAll").find(".con").children().hide();
	$(".provinceCityAll").find(".con").find(".countyAll").show();
	allCountyPage(1);
}


//加载镇乡街道
function viewAllTowns(i) {
	countryIdAll = countiesAll[i].area_code;//区县code
	$("body").data("tAllName", countiesAll[i].name);
	$("body").data("areaAllId", countryIdAll);
	
	//准备镇乡街道数据
	getTownData(countryIdAll);
	
	
}


function getTownData(countryIdAll){
	$.ajax({
		type: "get",
		url: path+"?act=queryTownsByParentCode&countryIdAll="+countryIdAll,
		async: true,
		dataType: "json",
		success: function(data) {
			$("body").data("allTowns", data.towns);
			townsAll = [];
			var j = 0;
			$.each(data.towns,
			function(i, town) {
				townsAll[j++] = town;
			});
			allTownTotalPage = Math.ceil(townsAll.length / pa_pageSize);
			$(".provinceCityAll").find(".tabs").find("a").removeClass("current");
			$(".provinceCityAll .tabs").find("#townAll").addClass("current");
			$(".con .townAll .list a").removeClass("current");
			$(".con .townAll .list a[id='" + allProId + "']").addClass("current");
			$(".provinceCityAll").find(".con").children().hide();
			$(".provinceCityAll").find(".con").find(".townAll").show();
			allTownPage(1);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		 {
			//alert("网络繁忙，请稍后再试！");
			myCityAlert();
			return null;
		}
	});
}


//街道页
function allTownPage(page) {
	var townCurrentName = $("body").data("tAllName");//FIXME:
	if ((townsAll == null || townsAll.length == 0) && townCurrentName !== "市辖区") {
		//FIXME:如果是市辖区不关闭
		var nameOfProvince = $("body").data("pAllName");//获取选中的省份
		var cityCurrentName = $("body").data("nameOfCityAll");//获取选中的城市
		var townCurrentName = $("body").data("tAllName");//FIXME:
		$("input.current2").removeClass("iGrays");
		//FIXME:
		$("input.current2").val(nameOfProvince + "-" + cityCurrentName + '-' + townCurrentName); //
		$(".provinceCityAll").hide();
		
		countyId = $("body").data("areaAllId");
		setMyAreaID(countyId);
		return;
	}

	$(".townAll .list ul li").remove();
	if (page == 1) {
		$(".townAll .pre a").removeClass("can");
	} else {
		$(".townAll .pre a").addClass("can");
	}
	var start;
	var end;
	if (page <= 1) {
		page = 1;
		$(".townAll .pre a").removeClass("can");
		$(".townAll .next a").addClass("can");
	}
	if (allTownTotalPage == 1) {
		$(".townAll .next a").removeClass("can");
		$(".townAll .pre a").removeClass("can");
	}
	if (page >= allTownTotalPage) {
		page = allTownTotalPage;
		$(".townAll .next a").removeClass("can");
		start = (page - 1) * pa_pageSize;
		end = townsAll.length;
	} else if (page == 1) {
		start = (page - 1) * pa_pageSize;
		end = start + pa_pageSize;
		$(".townAll .pre a").removeClass("can");
		$(".townAll .next a").addClass("can");
	} else {
		start = (page - 1) * pa_pageSize;
		end = start + pa_pageSize;
		$(".townAll .next a").addClass("can");
		$(".townAll .pre a").addClass("can");
	}
	for (var i = start; i < end; i++) {
		if (townsAll[i]) {
			var t_id = townsAll[i].area_code;
			var townName = townsAll[i].name.substr(0, 4);;
			var li = $('<li><a href="javascript:onclick=addrInputAll(' + i + ')" id="' + t_id + '">' + townName + '</a></li>');
			$(".townAll .list ul").append(li);
		}
	}
	$(".townAll .list #townPage1").remove();
	$(".townAll .list").append("<label id='townPage1' style='display:none;'>" + page + "</label>");
}

//城市页
function allCityPage(page) {
//	var nameOfProvince = $("body").data("pAllName");//获取选中的省份
//	$("input.current2").removeClass("iGrays");
//	//FIXME:
//	$("input.current2").val(nameOfProvince); // FIXME:
	
	if (allCitys == null || allCitys.length === 0) {
		//香港、澳门、台湾不显示
		var nameOfProvince = $("body").data("pAllName");//获取选中的省份
		$("input.current2").removeClass("iGrays");
		//FIXME:
		$("input.current2").val(nameOfProvince); // FIXME:
		$(".provinceCityAll").hide();
		setMyAreaID(allProId);
		return;
	}
	
	$(".cityAll .list ul li").empty();
	$(".cityAll .list ul li").remove();
	if (page == 1) {
		$(".cityAll .pre a").removeClass("can");
	} else {
		$(".cityAll .pre a").addClass("can");
	}
	var start;
	var end;
	if (page <= 1) {
		page = 1;
		$(".cityAll .pre a").removeClass("can");
		$(".cityAll .next a").addClass("can");
	}
	if (allCityTotalPage == 1) {
		$(".cityAll .next a").removeClass("can");
		$(".cityAll .pre a").removeClass("can");
	}
	if (page >= allCityTotalPage) {
		page = allCityTotalPage;
		$(".cityAll .next a").removeClass("can");
		start = (page - 1) * pa_pageSize;
		end = allCitys.length;
	} else if (page == 1) {
		start = (page - 1) * pa_pageSize;
		end = start + pa_pageSize;
		$(".cityAll .pre a").removeClass("can");
		$(".cityAll .next a").addClass("can");
	} else {
		start = (page - 1) * pa_pageSize;
		end = start + pa_pageSize;
		$(".cityAll .next a").addClass("can");
		$(".cityAll .pre a").addClass("can");
	}
	for (var i = start; i < end; i++) {
		var c_id = allCitys[i].area_code;
		var cityName = allCitys[i].name.substr(0, 4);
		var li = $('<li><a href="javascript:onclick=viewAllCounties(' + i + ')" id="' + c_id + '">' + cityName + '</a></li>');
		$(".cityAll .list ul").append(li);
	}
	$(".cityAll .list #cityPage1").remove();
	$(".cityAll .list").append("<label id='cityPage1' style='display:none;'>" + page + "</label>");
}

//乡镇页
function allCountyPage(page) {
//	var nameOfProvince = $("body").data("pAllName");//获取选中的省份
//	var cityCurrentName = $("body").data("nameOfCityAll");//获取选中的城市
//	$("input.current2").removeClass("iGrays");
//	//FIXME:
//	$("input.current2").val(nameOfProvince + "-" + cityCurrentName); //
	
	
	$(".countyAll .list ul li").remove();
	if (page == 1) {
		$(".countyAll .pre a").removeClass("can");
	} else {
		$(".countyAll .pre a").addClass("can");
	}
	var start;
	var end;
	if (page <= 1) {
		page = 1;
		$(".countyAll .pre a").removeClass("can");
		$(".countyAll .next a").addClass("can");
	}
	if (countyTotalPageAll == 1) {
		$(".countyAll .next a").removeClass("can");
		$(".countyAll .pre a").removeClass("can");
	}
	if (page >= countyTotalPageAll) {
		page = countyTotalPageAll;
		$(".countyAll .next a").removeClass("can");
		start = (page - 1) * pa_pageSize;
		end = countiesAll.length;
	} else if (page == 1) {
		start = (page - 1) * pa_pageSize;
		end = start + pa_pageSize;
		$(".countyAll .pre a").removeClass("can");
		$(".countyAll .next a").addClass("can");
	} else {
		start = (page - 1) * pa_pageSize;
		end = start + pa_pageSize;
		$(".countyAll .next a").addClass("can");
		$(".countyAll .pre a").addClass("can");
	}
	for (var i = start; i < end; i++) {
		var c_id = countiesAll[i].area_code;
		var countyName = countiesAll[i].name.substr(0, 4);;
		var li = $('<li><a href="javascript:onclick=viewAllTowns(' + i + ')" id="' + c_id + '">' + countyName + '</a></li>');
		$(".countyAll .list ul").append(li);
	}
	$(".countyAll .list #countyPage1").remove();
	$(".countyAll .list").append("<label id='countyPage1' style='display:none;'>" + page + "</label>");
}
/*添加到文本框*/
function addrInputAll(i) {
	var townId = $.trim(townsAll[i].area_code);
	$(".con .hotCityAll .list a input").removeClass("current");
	$(".con .hotCityAll .list a input[id='" + cityIdAll + "']").addClass("current");
	$(".con .townAll .list a").removeClass("current");
	$(".con .townAll .list a[id='" + townId + "']").addClass("current");
	allProId = $("body").data("pAllId");
	cityIdAll = $("body").data("cAllId");
	countyId = $("body").data("areaAllId");
	var p = null;
	$.each(allProvinces,
	function(i, province) {
		if (province.area_code == allProId) {
			p = province.name;
			return false;
		}
	});
	var c = null;
	$.each(allCities,
	function(i, city) {
		if (city.area_code == cityIdAll) {
			c = city.name;
			return false;
		}
	});
	
	var a = null;
	$.each(countiesAll,
	function(i, county) {
		if (county.area_code == countyId) {
			a = county.name;
			return false;
		}
	});
	
	var t = null;
	$.each(townsAll,
	function(i, town) {
		if (town.area_code == townId) {
			t = town.name;
			return false;
		}
	});
	var nameValue = $("input.current2");
	nameValue.removeClass("iGrays");
	$(".provinceCityAll").hide();
	var rtn = p + "-" + c + "-" + a +"-"+t;
	$("input.current2").val(rtn);
	setMyAreaID(townId);
	$(".backifname").hide();
	var nameValue = $("input.current2").attr("name");
	if (nameValue == "consignor.addrProCity") {
		$("#provinceId").val(allProId);
		$("#cityId").val(cityIdAll);
	}
	if (nameValue == "order.caddrProCity")
	 {
		$("input[name='order.caddrProCity']").trigger("change");
	}
	if (nameValue == "consigneeInfo.addrProCity")
	 {
		$("input[name='consigneeInfo.addrProCity']").trigger("change");
	}
	if (nameValue == 'template.caddrProCity')
	 {
		$("input[name='template.caddrProCity']").trigger("change");
	}
}

function setMyAreaID(id) {
	//console.log(id);
	$("#area").val(id);
}

function myCityAlert() {
	$("#cityMsg").text("系统繁忙");
}
