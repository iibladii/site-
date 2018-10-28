package object;

import java.util.ArrayList;
import java.util.List;

/**
 * Класс для обмена данными между клиентом и сервером
 * @author megroup9gmail.com
 *
 */
public class KartotekaDataObject {
	private String telephone;
	private String departmentName;
    private String subdivisionName;
    private String att1;
    private String att2;
    private String[] kross;
    private String comments;
    private String room;
    
    /**
     * Инициализация объекта
     * @param telephone телефон
     * @param departmentName наименование отдела
     * @param subdivisionName наименование подразделения
     * @param att1 связанные номера
     * @param att2 охрана
     * @param comments комментарии
     */
    public KartotekaDataObject(String telephone, String departmentName, String subdivisionName, String att1, String att2, String[] kross, String comments, String room) {
    	this.telephone = telephone;
        this.departmentName = departmentName;
        this.subdivisionName = subdivisionName;
        this.att1 = att1;
        this.att2 = att2;
        this.kross = kross;
        this.comments = comments;
        this.room = room;
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
    
    public String getAtt1() {
        return att1;
    }

    public void setAtt1(String att1) {
        this.att1 = att1;
    }
    
    public String getAtt2() {
        return att2;
    }

    public void setAtt2(String att2) {
        this.att2 = att2;
    }
    
    public String[] getKross() {
        return kross;
    }

    public void setKross(String[] kross) {
        this.kross = kross;
    }
    
    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }
    
    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
