package tables;

import java.util.ArrayList;

//Класс
public class UserInfoV2 {
	    private ArrayList<UserInfoV2role> role_;
	    private String firstName;
	    private String secondName;
	    private String thirdName;
	    private String login;
	    
	    public UserInfoV2(String firstName,String secondName,String thirdName,String login) {
	    	this.role_ = new ArrayList<UserInfoV2role>();
	    	this.firstName=firstName;
	    	this.secondName=secondName;
	    	this.thirdName=thirdName;
	    	this.login=login;
	    }
	    
	    public void add_(Integer id,String role,String edit) {
	    	UserInfoV2role usr = new UserInfoV2role(id, role, edit);
	    	this.role_.add(usr);
	    }
	    
	    public ArrayList<UserInfoV2role> getRole_List() {
	        return role_;
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
}
