package object;

/**
 * Класс для обмена данными между клиентом и сервером
 * @author megroup9gmail.com
 *
 */
public class KartotekaDataObject {
	private String telephone;
	private String departmentName;
    private String subdivisionName;

    public KartotekaDataObject(String telephone, String departmentName, String subdivisionName) {
    	this.telephone = telephone;
        this.departmentName = departmentName;
        this.subdivisionName = subdivisionName;
    }

    public KartotekaDataObject() {
    }
    
    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
    
    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getSubdivisionName() {
        return subdivisionName;
    }

    public void setSubdivisionName(String subdivisionName) {
        this.subdivisionName = subdivisionName;
    }
}
