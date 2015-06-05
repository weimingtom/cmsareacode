package com.cmsproj.admin.controller;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.web.servlet.ModelAndView;

import com.cmsproj.admin.model.Yb_area;

public class AreaController extends BaseController {
	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest req,
			HttpServletResponse resp) throws Exception {
		String act = req.getParameter("act");
		//-----------------------
		if (act == null) {
			ModelAndView result = new ModelAndView("front/area");
			return result;
		} else if("queryCities".equals(act)) {
	        resp.setHeader("Content-Language", "zh-CN");
	        resp.setContentType("text/json;charset=UTF-8");
	        resp.setCharacterEncoding("UTF-8");
	        
			Map<String, Object> result = new HashMap<String, Object>();
			int level=2;//市
			List<Yb_area> list = this.getAreaService().queryYbAreaCitiesAndProvinces(level, false);
			result.put("sucess", true);
			result.put("cities", list);
			PrintWriter writer =  resp.getWriter();
			writer.write(JSONObject.fromObject(result).toString());
			writer.flush();
		} else if("queryProvinces".equals(act)) {
	        resp.setHeader("Content-Language", "zh-CN");
	        resp.setContentType("text/json;charset=UTF-8");
	        resp.setCharacterEncoding("UTF-8");
	        
			Map<String, Object> result = new HashMap<String, Object>();
			int level=1;//省
			List<Yb_area> list = getAreaService().queryYbAreaCitiesAndProvinces(level, false);
			result.put("sucess", true);
			result.put("provinces", list);
			PrintWriter writer =  resp.getWriter();
			writer.write(JSONObject.fromObject(result).toString());
			writer.flush();
		} else if("queryAllAreas".equals(act)) {
	        resp.setHeader("Content-Language", "zh-CN");
	        resp.setContentType("text/json;charset=UTF-8");
	        resp.setCharacterEncoding("UTF-8");
	        
			Map<String, Object> result = new HashMap<String, Object>();
			int level=3;//区县
			List<Yb_area> list = getAreaService().queryYbAreaCitiesAndProvinces(level, false);
			result.put("sucess", true);
			result.put("areas", list);
			PrintWriter writer =  resp.getWriter();
			writer.write(JSONObject.fromObject(result).toString());
			writer.flush();
		} else if("queryAllTowns".equals(act)) {
	        resp.setHeader("Content-Language", "zh-CN");
	        resp.setContentType("text/json;charset=UTF-8");
	        resp.setCharacterEncoding("UTF-8");
			
			Map<String, Object> result = new HashMap<String, Object>();
			int level=4;//街道乡镇
			List<Yb_area> list = getAreaService().queryYbAreaCitiesAndProvinces(level, false);
			result.put("sucess", true);
			result.put("towns", list);
			PrintWriter writer =  resp.getWriter();
			writer.write(JSONObject.fromObject(result).toString());
			writer.flush();
		} else if("queryTownsByParentCode".equals(act)) {
	        resp.setHeader("Content-Language", "zh-CN");
	        resp.setContentType("text/json;charset=UTF-8");
	        resp.setCharacterEncoding("UTF-8");
			
			Map<String, Object> result = new HashMap<String, Object>();
			String parentCode = req.getParameter("countryIdAll");
			int level=4;//街道乡镇
			List<Yb_area> list = getAreaService().queryYbAreaTownsByParentCode(level,parentCode,false);
			result.put("sucess", true);
			result.put("towns", list);
			PrintWriter writer =  resp.getWriter();
			writer.write(JSONObject.fromObject(result).toString());
			writer.flush();
		}
		
		//-----------------------
				
		return null;
	}
}
