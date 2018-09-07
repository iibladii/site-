package controllers;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.NamedQuery;

@Entity

public class Security {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String number_dot;

    @OneToMany(mappedBy="security")
    private List<Telephone> security;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNumber_dot() {
		return number_dot;
	}

	public void setNumber_dot(String number_dot) {
		this.number_dot = number_dot;
	}
}
