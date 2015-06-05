package com.cmsproj.admin.controller;

import org.springframework.web.servlet.mvc.AbstractController;

import com.cmsproj.admin.service.AdminService;
import com.cmsproj.admin.service.AreaService;

public abstract class BaseController extends AbstractController {
	protected AdminService adminService;
	protected AreaService areaService;
	
	public void setAdminService(AdminService adminService) {
		this.adminService = adminService;
	}
	
	public AdminService getAdminService() {
		return this.adminService;
	}

	public AreaService getAreaService() {
		return areaService;
	}

	public void setAreaService(AreaService areaService) {
		this.areaService = areaService;
	}
}
