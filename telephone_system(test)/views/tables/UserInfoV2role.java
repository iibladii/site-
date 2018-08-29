package tables;

import java.util.ArrayList;

public class UserInfoV2role {
    private Integer id;
    private String text;
    private String selected;
    
   public UserInfoV2role(Integer id, String text, String selected) {
    	this.id=id;
    	this.text=text;
    	this.selected=selected;
    }
    
    public Integer getId() {
        return id;
    }
    
    public String getText() {
        return text;
    }
    
    public String getSelected() {
        return selected;
    }
}