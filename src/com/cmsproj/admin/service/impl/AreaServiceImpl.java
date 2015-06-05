package com.cmsproj.admin.service.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.dao.DataAccessException;

import com.cmsproj.admin.dao.YbAreaDao;
import com.cmsproj.admin.model.Yb_area;
import com.cmsproj.admin.service.AreaService;

public class AreaServiceImpl implements AreaService {
	private YbAreaDao ybAreaDao;

	public YbAreaDao getYbAreaDao() {
	    return ybAreaDao;
	}

	public void setYbAreaDao(YbAreaDao ybAreaDao) {
	    this.ybAreaDao = ybAreaDao;
	}
	
	//--------------------------------------

	public List<Yb_area> queryYbArea(String sql, Object[] args,
			final boolean useFullname) throws DataAccessException {
		return ybAreaDao.queryYbArea(sql, args, useFullname);
	}
	
	public Yb_area getYbAreaByResultSet(ResultSet rs, boolean useFullname)
			throws SQLException {
		return ybAreaDao.getYbAreaByResultSet(rs, useFullname);
	}
	
	public List<Yb_area> queryYbAreaCitiesAndProvinces(int level,
			boolean useFullname) throws DataAccessException {
		return ybAreaDao.queryYbAreaCitiesAndProvinces(level, useFullname);
	}
	
	public List<Yb_area> queryYbAreaTownsByParentCode(int level,
			String parentCode, boolean useFullname) {
		return ybAreaDao.queryYbAreaTownsByParentCode(level, parentCode, useFullname);
	}
	
	public String getYbAreaFullnameByAreaCodeID(int areaCode) {
		return ybAreaDao.getYbAreaFullnameByAreaCodeID(areaCode);
	}
	
	public String getYbAreaFullnameByAreaCode(String codeStr) {
		return ybAreaDao.getYbAreaFullnameByAreaCode(codeStr);
	}
	
	public List<Yb_area> getYbAreaSonByParentsID(int id) {
		return ybAreaDao.getYbAreaSonByParentsID(id);
	}
	
	//--------------------------------------
}
