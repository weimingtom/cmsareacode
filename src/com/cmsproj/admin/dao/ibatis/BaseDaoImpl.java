package com.cmsproj.admin.dao.ibatis;

import java.util.List;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

public class BaseDaoImpl extends SqlMapClientDaoSupport {
	//Map<String, Object> param = new HashMap<String, Object>();
	//return queryForList("Article.getArticleListByPage", param);
	public <T> List<T> queryForList(String statment, Object param) {
		return (List<T>) getSqlMapClientTemplate()
				.queryForList(statment, param);
	}

	//return (Integer) queryForObject("Article.getArticleCount", map);
	public <T> T queryForObject(String statment, Object param) {
		return (T) getSqlMapClientTemplate().queryForObject(statment, param);
	}

	//insert("Article.saveArticle", article);
	public void insert(String statment, Object param) {
		getSqlMapClientTemplate().insert(statment, param);
	}

	public void update(String statment, Object param) {
		getSqlMapClientTemplate().insert(statment, param);
	}

	public void delete(String statment, Object param) {
		getSqlMapClientTemplate().insert(statment, param);
	}
}
