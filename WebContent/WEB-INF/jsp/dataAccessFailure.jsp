<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
</head>
<body>
<%
Exception ex = (Exception) request.getAttribute("exception");
%>
<h2>Data access failure: <%= ex.getMessage() %></h2>
<p/>
<%
ex.printStackTrace(new java.io.PrintWriter(out));
%>
<p/>
<br/>
<a href="/welcome.do">Home</a>
</body>
</html>
