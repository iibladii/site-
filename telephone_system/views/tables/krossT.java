package tables;

import java.util.ArrayList;

//Класс содержащий информацию о кроссе
public class krossT {
	private ArrayList<String> kross;
	public krossT(ArrayList<String> kross) {
		this.kross = kross;
	}
	public ArrayList<String> getKross() {
		return kross;
	}
	
	public void setKross(ArrayList<String> kross) {
		this.kross = kross;
	}
}
