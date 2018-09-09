package controllers;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NamedQuery;

@Entity
public class Telephone {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    
    private Integer id;
    
    private String att1;
    
    private String att2;
    
    private String room;
    
    private String intercity;
    
    private Boolean miniats;
    
    private String note;
    
    private String number;
 
    @ManyToOne
    private Adsl adsl;

    @OneToMany(mappedBy="telephone")
    private List<Department> department;
    
    @ManyToOne
    private Security security;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAtt1() {
		return att1;
	}

	public void setAtt1(String att1) {
		this.att1 = att1;
	}
	
	public String getAtt2() {
		return att2;
	}

	public void setAtt2(String att2) {
		this.att2 = att2;
	}

	public String getRoom() {
		return room;
	}

	public void setRoom(String room) {
		this.room = room;
	}
	
	public String getIntercity() {
		return intercity;
	}

	public void setIntercity(String intercity) {
		this.intercity = intercity;
	}
	
	public Boolean getMiniats() {
		return miniats;
	}

	public void setMiniats(Boolean miniats) {
		this.miniats = miniats;
	}
		
	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
	
	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}
	
	public Adsl getAdsl() {
		return adsl;
	}
    
	public Security getSecurity() {
		return security;
	}
	
	public List<Department> getDepartment() {
		return department;
	}
	
	public void setDepartment(Department sd) {
		this.department.add(sd);
	}
	
}

