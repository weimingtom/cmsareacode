package com.cmsproj.admin.model;

import java.io.Serializable;

public class Yb_area implements Serializable{
	private static final long serialVersionUID = 1350995451588097467L;
	
	private Integer id;
	private Integer level;
	private Integer is_end;
	private String name;
	private String fullname;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	private String parent_code;
	private String area_code;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}
	public Integer getIs_end() {
		return is_end;
	}
	public void setIs_end(Integer is_end) {
		this.is_end = is_end;
	}
	public String getParent_code() {
		return parent_code;
	}
	public void setParent_code(String parent_code) {
		this.parent_code = parent_code;
	}
	public String getArea_code() {
		return area_code;
	}
	public void setArea_code(String area_code) {
		this.area_code = area_code;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
}

