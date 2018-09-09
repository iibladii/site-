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
public class Department {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;

    @OneToMany(mappedBy="department")
    private List<Subdivision> subdivision;

    @ManyToOne
    private Telephone telephone;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public List<Subdivision> getSubdivision() {
		return subdivision;
	}
	public Telephone getTelephone() {
		return telephone;
	}
	
	public void setSubdivision(Subdivision subdivision) {
		this.subdivision.add(subdivision);
	} 
}

