package com.cmsproj.admin.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.dao.DataAccessException;

import com.cmsproj.admin.model.Yb_area;

public interface AreaService {
	public List<Yb_area> queryYbArea(String sql, Object[] args,
			final boolean useFullname) throws DataAccessException;
	public Yb_area getYbAreaByResultSet(ResultSet rs, boolean useFullname)
			throws SQLException;
	public List<Yb_area> queryYbAreaCitiesAndProvinces(int level,
			boolean useFullname) throws DataAccessException;
	public List<Yb_area> queryYbAreaTownsByParentCode(int level,
			String parentCode, boolean useFullname);
	public String getYbAreaFullnameByAreaCodeID(int areaCode);
	public String getYbAreaFullnameByAreaCode(String codeStr);
	public List<Yb_area> getYbAreaSonByParentsID(int id);
}
