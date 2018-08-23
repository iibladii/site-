package tables;

import java.util.ArrayList;

//Класс
public class companateSelect2{
	    private ArrayList<String> results;
	    
	    /*
	     * count_elements - число елементов
	     * page - номер текущей страницы
	     */
	    public companateSelect2() {
	    	results = new ArrayList<String>();
	    }

	    public void add(String sd) {
	    	this.results.add(sd);
	    }
	    
	    public ArrayList<String> getResults() {
	    	return results;
	    }
}