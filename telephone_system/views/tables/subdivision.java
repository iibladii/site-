package tables;

import java.util.ArrayList;

//Класс
public class subdivision {
	    private ArrayList<String> adsl;
	    private ArrayList<String> code;
	    private Integer count_elements;
	    private Integer page;
	    
	    /*
	     * count_elements - число елементов
	     * page - номер текущей страницы
	     */
	    public subdivision(Integer count_elements, Integer page) {
	    	this.adsl = new ArrayList<String>();
	    	this.code = new ArrayList<String>();
	    	this.count_elements=count_elements;
	    	this.page=page;
	    }

	    public void add(String adsl,String code) {
	    	this.adsl.add(adsl);
	    	this.code.add(code);
	    }
	    
	    public ArrayList<String> getRoleList() {
	        return adsl;
	    }
	    
	    public ArrayList<String> getCodeList() {
	        return code;
	    }
	    
	    public Integer getCount_elements() {
	        return count_elements;
	    }
	    
	    public Integer getPage() {
	        return page;
	    }
	    
	    public Integer getSize() {
	        return adsl.size();
	    }
}
