package com.cmsproj.admin.interceptor;

import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/*
用于页面跳转的拦截器
<property name="maintenanceStartTime" value="23" />
<property name="maintenanceEndTime" value="24" />
<property name="maintenanceMapping" value="/SpringMVC/maintenance.htm" />	
 */
public class MaintenanceInterceptor extends HandlerInterceptorAdapter{
    
	private int maintenanceStartTime;
	private int maintenanceEndTime;
	private String maintenanceMapping;

	public void setMaintenanceMapping(String maintenanceMapping) {
		this.maintenanceMapping = maintenanceMapping;
	}

	public void setMaintenanceStartTime(int maintenanceStartTime) {
		this.maintenanceStartTime = maintenanceStartTime;
	}

	public void setMaintenanceEndTime(int maintenanceEndTime) {
		this.maintenanceEndTime = maintenanceEndTime;
	}

	//before the actual handler will be executed
	public boolean preHandle(HttpServletRequest request, 
			HttpServletResponse response, Object handler)
	    throws Exception {

		Calendar cal = Calendar.getInstance();
		int hour = cal.get(Calendar.HOUR_OF_DAY);

		if (hour >= maintenanceStartTime && hour <= maintenanceEndTime) {
			//maintenance time, send to maintenance page
			response.sendRedirect(maintenanceMapping);
			return false;
		} else {
			return true;
		}

	}
}
