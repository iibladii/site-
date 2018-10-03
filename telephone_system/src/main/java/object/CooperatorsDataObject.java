package object;

/**
 * Класс для обмена данными между клиентом и сервером
 * @author megroup9gmail.com
 *
 */
public class CooperatorsDataObject {
	private String fname;
    private String sname;
    private String tname;
    private String login;
    private String pass;
    private String[] roles;

    public CooperatorsDataObject(String fname, String sname, String tname, String login, String pass, String[] roles) {
        this.fname = fname;
        this.sname = sname;
        this.tname = tname;
        this.login = login;
        this.pass = pass;
        this.roles = roles;
    }

    public CooperatorsDataObject() {
    }

    public String getFName() {
        return fname;
    }

    public void setFName(String fname) {
        this.fname = fname;
    }

    public String getSName() {
        return sname;
    }

    public void setSName(String sname) {
        this.sname = sname;
    }
    
    public String getTName() {
        return tname;
    }

    public void setTName(String tname) {
        this.tname = tname;
    }
    
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
    
    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
    
    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }
}
