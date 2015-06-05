package com.cmsproj.admin.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 用于字符集转换，仅解决POST方式的乱码
 * @author Administrator
 *
 */
public class CharacterEncodingInterceptor extends HandlerInterceptorAdapter{
	private String encoding = "UTF-8";
	
	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}
	
	public boolean preHandle(HttpServletRequest request, 
			HttpServletResponse response, Object handler)
		    throws Exception {
		if (this.encoding != null) {
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
		}
		return true;
	}
}
