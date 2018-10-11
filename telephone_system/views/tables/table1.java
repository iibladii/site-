package tables;

import java.util.ArrayList;

public class table1 {
    private ArrayList<Integer> id;
    private ArrayList<String> number;
    private ArrayList<String> att1;
    private ArrayList<String> att2;
    private ArrayList<String> department;
    private ArrayList<String> room;
    private ArrayList<String> subdivision;
    private ArrayList<String> code;
    private ArrayList<String> adsl;
    private Integer page_no;
    private Integer page_count;
    public table1(Integer page_no,Integer page_count) {
    	this.id = new ArrayList<Integer>();
    	this.number = new ArrayList<String>();
    	this.att1 = new ArrayList<String>();
    	this.att2 = new ArrayList<String>();
    	this.department = new ArrayList<String>();
    	this.room = new ArrayList<String>();
    	this.subdivision = new ArrayList<String>();
    	this.code = new ArrayList<String>();
    	this.adsl = new ArrayList<String>();
    	this.page_no=page_no;
    	this.page_count=page_count;
    }

    /**
     * Конструктор
     * @param id id
     * @param number номер телефона
     * @param att1 связанные номера
     * @param att2 охрана
     * @param room местоположение
     * @param subdivision подразделение
     * @param department отдел
     * @param code код подразделения
     * @param adsl адсл
     */
    public void add(Integer id,String number,String att1,String att2,String room,String subdivision,String department,String code,String adsl) {
    	this.id.add(id);
    	this.number.add(number);
    	this.att1.add(att1);
    	this.att2.add(att2);
    	this.department.add(department);
    	this.room.add(room);
    	this.subdivision.add(subdivision);
    	this.code.add(code);
    	this.adsl.add(adsl);
    }
    
    public ArrayList<Integer> getId() {
        return id;
    }

    public ArrayList<String> getNumber() {
        return number;
    }
    
    public ArrayList<String> getAtt1() {
        return att1;
    }
    
    public ArrayList<String> getAtt2() {
        return att2;
    }
    
    public ArrayList<String> getDepartment() {
        return department;
    }
    
    public ArrayList<String> getRoom() {
        return room;
    }
    
    public ArrayList<String> getSubdivision() {
        return subdivision;
    }
    
    public ArrayList<String> getCode() {
        return code;
    }
    
    public ArrayList<String> getAdsl() {
        return adsl;
    }
    
    public Integer getSize() {
        return id.size();
    }
    
    public Integer getPage_no() {
        return page_no;
    }
    
    public Integer getPage_count() {
        return page_count;
    }
}