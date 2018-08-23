package tables;

import java.util.ArrayList;

//Класс
public class UserInfo {
	    private ArrayList<String> role;
	    private String firstName;
	    private String secondName;
	    private String thirdName;
	    private String login;
	    
	    public UserInfo(String firstName,String secondName,String thirdName,String login) {
	    	this.role = new ArrayList<String>();
	    	this.firstName=firstName;
	    	this.secondName=secondName;
	    	this.thirdName=thirdName;
	    	this.login=login;
	    }

	    public void add(String role) {
	    	this.role.add(role);
	    }
	    
	    public ArrayList<String> getRoleList() {
	        return role;
	    }
	    
	    public String getFirstName() {
	        return firstName;
	    }
	    
	    public String getSecondName() {
	        return secondName;
	    }
	    
	    public String getThirdName() {
	        return thirdName;
	    }
	    
	    public String getLogin() {
	        return login;
	    }
	    
	    public Integer getSize() {
	        return role.size();
	    }
}
