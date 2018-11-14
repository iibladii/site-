package tables;

import java.util.ArrayList;

/**
 * Данные возвращаемые в ответ на запрос списка отделеов
 * @author megroup9gmail.com
 *
 */
public class departmentInfo {
	    private ArrayList<String> name;//Наименование отделов
	    private ArrayList<String> code;//Коды отделов
	    private Integer sizePage;//Размер передаваемой страницы
	    private Integer page;//Номер страницы
	    private Integer countPage;//Число страниц заданного размера в бд
	    
	    /**
	     * Конструктор
	     * @param page номер возвращаемой страницы
	     */
	    public departmentInfo(Integer page) {
	    	this.name = new ArrayList<String>();
	    	this.code = new ArrayList<String>();
	    	this.page=page;
	    }

	    public void addName(String name) {
	    	this.name.add(name);
	    }
	    
	    public ArrayList<String> getName() {
	        return name;
	    }
	    
	    public ArrayList<String> getCode() {
	        return code;
	    }
	    
	    public void setCode(String code) {
	    	this.code.add(code);
	    }
	    
	    public Integer getSizePage() {
	        return sizePage;
	    }
	    
	    public void setSizePage(Integer sizePage) {
	    	this.sizePage = sizePage;
	    }
	    
	    public Integer getPage() {
	        return page;
	    }
	    
	    public Integer getCountPAge() {
	        return countPage;
	    }
	    
	    public void setCountPAge(Integer countPage) {
	    	this.countPage = countPage;
	    }
}
