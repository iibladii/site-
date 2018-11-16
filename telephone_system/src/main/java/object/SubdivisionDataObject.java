package object;

/**
 * Класс для обмена данными между клиентом и сервером
 * @author megroup9gmail.com
 *
 */
public class SubdivisionDataObject {
	private String subdivisionName;
	private String subdivisionCode;
	private String newcod;
	private String newname;

    public SubdivisionDataObject(String subdivisionName, String subdivisionCode, String newcod, String newname) {
        this.subdivisionName = subdivisionName;
        this.subdivisionCode = subdivisionCode;
        this.newcod = newcod;
        this.newname = newname;
    }

    public SubdivisionDataObject() {
    }

    public String getNewcod() {
        return newcod;
    }

    public void setNewcod(String newcod) {
        this.newcod = newcod;
    }
    
    public String getnewname() {
        return newname;
    }

    public void setnewname(String newname) {
        this.newname = newname;
    }
    
    public String getsubdivisionName() {
        return subdivisionName;
    }

    public void setsubdivisionName(String subdivisionName) {
        this.subdivisionName = subdivisionName;
    }
    
    public String getsubdivisionCode() {
        return subdivisionCode;
    }

    public void setsubdivisionCode(String subdivisionCode) {
        this.subdivisionCode = subdivisionCode;
    }
}
