package controllers;

import java.util.ArrayList;
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

    public Department() {
    	subdivision = new ArrayList<Subdivision>();
    }
    
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
	
	/**
	 * Удаление связи между отделом и подразделением
	 * @param subdivisionCode код подразделения
	 */
	public void delInSubdivision(String subdivisionCode) {
		//Проверим все элементы подразделений
		for(int i = 0; i < this.subdivision.size(); i++) {
			if(subdivisionCode.equals(this.subdivision.get(i).getCode())) {
				this.subdivision.remove(this.subdivision.get(i));
				break;//Выход из цикла
			}
		}
	}
}

