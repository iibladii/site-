package tables;

import java.util.ArrayList;

public class UserNameId {
    private ArrayList<Integer> id;
    private ArrayList<String> name;
    
    public UserNameId() {
    	this.id = new ArrayList<Integer>();
    	this.name = new ArrayList<String>();
    }

    public void add(String name, Integer id) {
    	this.id.add(id);
    	this.name.add(name);
    }
    
    public ArrayList<Integer> getId() {
        return id;
    }
    
    public ArrayList<String> getName() {
        return name;
    }
    
    public Integer getSize() {
        return id.size();
    }
}