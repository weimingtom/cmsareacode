package com.cmsproj.admin.dao.ibatis;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;

import com.cmsproj.admin.dao.YbAreaDao;
import com.cmsproj.admin.model.Yb_area;

public class YbAreaDaoImpl extends BaseDaoImpl implements YbAreaDao {
/*
	@Override
	public List<Article> getArticleList() {
		return queryForList("Article.getArticleList", null);
	}

	public List<Article> getArticleListByPage(Map<String, Object> map,
			int page, int rows) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.putAll(map);
		param.put("rows", rows);
		param.put("page", page);
		if (page > 1) {
			param.put("lastCount", (page - 1) * rows);
		} else {
			param.put("lastCount", 0);
		}
		return queryForList("Article.getArticleListByPage", param);
	}

	public int getArticleCount(Map<String, Object> map) {
		return (Integer) queryForObject("Article.getArticleCount", map);
	}

	public void saveArticle(Article article) {
		insert("Article.saveArticle", article);
	}

	public void updateArticle(Article article) {
		update("Article.updateArticle", article);
	}

	public void deleteArticleByIds(String ids) {
		delete("Article.deleteArticleByIds", ids);
	}

	public List<Article> getArticleById(Article article) {
		return queryForList("Article.getArticleById", article);
	}


 */
	
	
	public List<Yb_area> queryYbArea(String sql, Object[] args,
			final boolean useFullname) throws DataAccessException {
		JdbcTemplate t = new JdbcTemplate(getDataSource());
		final List<Yb_area> bl = new ArrayList<Yb_area>();
		t.query(sql, args, new RowCallbackHandler() {
			public void processRow(ResultSet rs) throws SQLException {
				bl.add(getYbAreaByResultSet(rs, useFullname));
			}
		});
		return bl;
	}

	public Yb_area getYbAreaByResultSet(ResultSet rs, boolean useFullname)
			throws SQLException {
		Yb_area b = new Yb_area();
		b.setId(rs.getInt("id"));
		b.setArea_code(rs.getString("area_code"));
		b.setParent_code(rs.getString("parent_code"));
		b.setName(rs.getString("name"));
		b.setLevel(rs.getInt("level"));
		b.setIs_end(rs.getInt("is_end"));
		if (useFullname) {
			b.setFullname(rs.getString("fullname"));
		}
		return b;
	}

	public List<Yb_area> queryYbAreaCitiesAndProvinces(int level,
			boolean useFullname) throws DataAccessException {
		String whereStr = "";
		if (level == 3) {
			// 排除没有下属区域的市辖区
			whereStr = " AND (name<>'市辖区' OR area_code in ('640501', '460201', '640301')) ";
		} else if (level == 4) {
			whereStr = " AND area_num < 300 ";
		}
		String sql = "select * from yb_area where level=? " + whereStr
				+ " order by area_code asc ";

		return queryYbArea(sql, new Object[] { level }, useFullname);
	}

	public List<Yb_area> queryYbAreaTownsByParentCode(int level,
			String parentCode, boolean useFullname) {
		String whereStr = "";
		if (level == 4) {
			whereStr = " AND area_num < 300 ";
		}
		String sql = "select * from yb_area where level=? and parent_code=? "
				+ whereStr + " order by area_code asc ";
		;

		return queryYbArea(sql, new Object[] { level, parentCode }, useFullname);
	}

	public String getYbAreaFullnameByAreaCodeID(int areaCode) {
		return getYbAreaFullnameByAreaCode(Integer.toString(areaCode));
	}

	public String getYbAreaFullnameByAreaCode(String codeStr) {
		String fullname = null;
		String sql = "select * from yb_area where area_code=?";
		List<Yb_area> results = queryYbArea(sql, new Object[] { codeStr }, true);
		if (results != null && results.size() > 0 && results.get(0) != null) {
			fullname = results.get(0).getFullname();
		}
		if (fullname == null) {
			fullname = "";
		}
		return fullname;
	}

	private String getYbAreaNameByAreaCodeID(int areaCode) {
		return getYbAreaNameByAreaCode(Integer.toString(areaCode));
	}

	private String getYbAreaNameByAreaCode(String codeStr) {
		String name = null;
		String sql = "select * from yb_area where area_code=?";
		List<Yb_area> results = queryYbArea(sql, new Object[] { codeStr }, true);
		if (results != null && results.size() > 0 && results.get(0) != null) {
			name = results.get(0).getName();
		}
		if (name == null) {
			name = "";
		}
		if (name != null) {
			name.replace("街道", "").replace("镇", "");
		}
		return name;
	}

	private int getYbAreaLevel(int id) {
		if (id < 0) {
			return -1;
		}
		String idStr = Integer.toString(id);
		if (idStr.length() == 2) {
			return 1;
		} else if (idStr.length() == 4) {
			return 2;
		} else if (idStr.length() == 6) {
			return 3;
		} else if (idStr.length() == 9) {
			return 4;
		}
		return -1;
	}

	public List<Yb_area> getYbAreaSonByParentsID(int id) {
		final List<Yb_area> results = new ArrayList<Yb_area>();
		int level = getYbAreaLevel(id) + 1; // 子level需要加1
		if (level <= 0) {
			return results;
		}
		String whereStr = "";
		if (level == 3) {
			// 排除没有下属区域的市辖区
			whereStr = " AND (name<>'市辖区' OR area_code in ('640501', '460201', '640301')) ";
		} else if (level == 4) {
			whereStr = " AND area_num < 300 ";
		}
		String sql = "select * from yb_area where level=? " + whereStr
				+ " AND parent_code = ? order by area_code asc ";

		return queryYbArea(sql, new Object[] { level, Integer.toString(id) },
				false);
	}
}
