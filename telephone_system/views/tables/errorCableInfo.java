package tables;

import java.util.ArrayList;

//Класс
public class errorCableInfo {
	    private ArrayList<String> errorcable;
	    private Integer count_elements;
	    private Integer page;
	    
	    /*
	     * count_elements - число елементов
	     * page - номер текущей страницы
	     */
	    public errorCableInfo(Integer count_elements, Integer page) {
	    	this.errorcable = new ArrayList<String>();
	    	this.count_elements=count_elements;
	    	this.page=page;
	    }

	    public void add(String errorcable) {
	    	this.errorcable.add(errorcable);
	    }
	    
	    public ArrayList<String> getRoleList() {
	        return errorcable;
	    }
	    
	    public Integer getCount_elements() {
	        return count_elements;
	    }
	    
	    public Integer getPage() {
	        return page;
	    }
	    
	    public Integer getSize() {
	        return errorcable.size();
	    }
}
