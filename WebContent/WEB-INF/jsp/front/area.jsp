<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="com.cmsproj.admin.model.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Language" content="zh-cn" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=2.0" />
<title>地区四级联动演示</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.4.2.js"></script>

<link href="<%=request.getContextPath() %>/css/cityLayout.css" type="text/css" rel="stylesheet"></link>
<script>
//var path="<%=request.getContextPath()%>/admin/area.jsp";
var path="";
</script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/city.js"></script>

</head>
<body>
选择行政区域名：
<input name="" id="start1" autocomplete="off" type="text" class="city_input  inputFocus proCityQueryAll proCitySelAll" readonly size="40" value=""></input>
<font id="cityMsg" color="red"></font>
<input type="hidden" name="street" id="street" value=""></input>
 行政区域代码：<input type="text" name="" id="area" size="50"></input>
<div class="provinceCityAll">
	<div class="tabs clearfix">
		<ul>
			<li><a href="javascript:" class="current" tb="provinceAll">省份</a></li>
			<li><a href="javascript:" tb="cityAll" id="cityAll">城市</a></li>
			<li><a href="javascript:" tb="countyAll" id="countyAll">区县</a></li>
			<li><a href="javascript:" tb="townAll" id="townAll">街道</a></li>
		</ul>
	</div>
	
	<div class="con">
		
		<div class="provinceAll invis">
			<div class="pre"><a></a></div>
			<div class="list">
				<ul></ul>
			</div>
			<div class="next"><a class="can"></a></div>
		</div>
		<div class="cityAll invis">
			<div class="pre"><a></a></div>
			<div class="list">
				<ul></ul>
			</div>
			<div class="next"><a class="can"></a></div>
		</div>
		<div class="countyAll invis">
			<div class="pre"><a></a></div>
			<div class="list">
				<ul></ul>
			</div>
			<div class="next"><a class="can"></a></div>
		</div>
		<div class="townAll invis">
			<div class="pre"><a></a></div>
			<div class="list">
				<ul></ul>
			</div>
			<div class="next"><a class="can"></a></div>
		</div>
	</div>
</div>
</body>
</html>
