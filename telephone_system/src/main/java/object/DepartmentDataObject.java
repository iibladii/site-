package object;

/**
 * Класс для обмена данными между клиентом и сервером
 * @author megroup9gmail.com
 *
 */
public class DepartmentDataObject {
	private String departmentName;
	private String departmentCode;
	private String newcod;
	private String newname;
    private String[] subdivisionName;

    public DepartmentDataObject(String departmentName, String departmentCode, String newcod, String newname, String[] subdivisionName) {
        this.departmentName = departmentName;
        this.departmentCode = departmentCode;
        this.subdivisionName = subdivisionName;
        this.newcod = newcod;
        this.newname = newname;
    }

    public DepartmentDataObject() {
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
    
    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
    
    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }
    
    
    
    public String[] getSubdivisionName() {
        return subdivisionName;
    }

    public void setSubdivisionName(String[] subdivisionName) {
        this.subdivisionName = subdivisionName;
    }
}
