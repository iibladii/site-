package object;

/**
 * Класс для обмена данными между клиентом и сервером
 * @author megroup9gmail.com
 *
 */
public class DepartmentDataObject {
	private String departmentName;
    private String[] subdivisionName;

    public DepartmentDataObject(String departmentName, String[] subdivisionName) {
        this.departmentName = departmentName;
        this.subdivisionName = subdivisionName;
    }

    public DepartmentDataObject() {
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String[] getSName() {
        return subdivisionName;
    }

    public void setSName(String[] subdivisionName) {
        this.subdivisionName = subdivisionName;
    }
}
