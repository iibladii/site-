package select2Data;

/**
 * Структура данных для передачи во фронтенд
 * @author megroup9gmail.com
 *
 */
public class DataListSelect2 {
	private Integer id;
	private String text;
	private Boolean selected;
	
	public DataListSelect2(){};
	
	public Integer getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public Boolean getSelected() {
		return selected;
	}
	
	public void setSelected(Boolean selected) {
		this.selected = selected;
	}
}
