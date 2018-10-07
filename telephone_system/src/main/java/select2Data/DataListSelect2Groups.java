package select2Data;

import java.util.ArrayList;
import java.util.List;

public class DataListSelect2Groups {
	private String text;
	private List<Children> children;
	
	public DataListSelect2Groups(){
		children = new ArrayList<Children>();
	};
	
	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public List<Children> getchildren() {
		return children;
	}
	
	public void setChildren(Children children) {
		this.children.add(children);
	}
}
