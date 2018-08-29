package tables;

import java.util.ArrayList;

public class SecurityView {
    private ArrayList<String> role;
    private String name;
    
    public SecurityView(String name) {
    	this.role = new ArrayList<String>();
    	this.name=name;
    }

    public void add(String role) {
    	this.role.add(role);
    }
    
    public ArrayList<String> getRoleList() {
        return role;
    }
    
    public String getName() {
        return name;
    }
    
    public Integer getSize() {
        return role.size();
    }
}