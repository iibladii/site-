package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Telephone;

public interface TelephoneRepository extends CrudRepository<Telephone, Long> {

	//@Query("SELECT p FROM Telephone p, in(p.department) t, in(p.subdivision) s, in(p.adsl) a WHERE p.att1 like :att1 and p.att2 like :att2 and p.number like :number and p.room like :room and t.name like :department and a.name like :adsl and s.name like :subdivision and s.code like :subdivision_code")
    //public List<Telephone> find(@Param("number") String number,@Param("att1") String att1,@Param("att2") String att2,@Param("room") String room,@Param("department") String department,@Param("adsl") String adsl,@Param("subdivision") String subdivision,@Param("subdivision_code") String subdivision_code);
	/**
	 * Выборка на основе заданных параметров
	 * @param number
	 * @param att1
	 * @param att2
	 * @param room
	 * @param department
	 * @param adsl
	 * @param subdivision
	 * @param subdivision_code
	 * @return результаты выборки
	 */
	@Query("SELECT distinct p FROM Telephone p, in(p.department) t, in(p.adsl) a, in(t.subdivision) s WHERE p.att1 like :att1 and p.att2 like :att2 and p.number like :number and p.room like :room and t.name like :department and a.name like :adsl and s.name like :subdivision and s.code like :subdivision_code and p.isDel != true")
    public List<Telephone> find(@Param("number") String number,@Param("att1") String att1,@Param("att2") String att2,@Param("room") String room,@Param("department") String department,@Param("adsl") String adsl,@Param("subdivision") String subdivision,@Param("subdivision_code") String subdivision_code);
	
	/**
	 * Выборка на основе заданных параметров
	 * @param number
	 * @param att1
	 * @param att2
	 * @param room
	 * @param department
	 * @param adsl
	 * @param subdivision
	 * @param subdivision_code
	 * @return результаты выборки
	 */
	@Query("SELECT distinct p FROM Telephone p, in(p.department) t, in(p.adsl) a, in(t.subdivision) s WHERE p.att1 like :att1 and p.att2 like :att2 and p.number like :number and p.room like :room and t.name like :department and a.name like :adsl and s.name like :subdivision and s.code like :subdivision_code and p.isDel != false")
    public List<Telephone> findDel(@Param("number") String number,@Param("att1") String att1,@Param("att2") String att2,@Param("room") String room,@Param("department") String department,@Param("adsl") String adsl,@Param("subdivision") String subdivision,@Param("subdivision_code") String subdivision_code);
	
	
	/**
	 * Поиск конкретного телефона
	 * @param number номер
	 * @return объект телефона
	 */
	@Query("SELECT p FROM Telephone p WHERE p.number like :number")
    public Telephone find_(@Param("number") String number);
	
	/**
	 * Поиск отдела связанного с телефоном
	 * @param number номер телефона
	 * @return (наименование, код) отдела
	 */
	@Query("SELECT d.name, d.code FROM Telephone p, in(p.department) d WHERE p.number like :number")
    public String[] findDepartmentName(@Param("number") String number);
	
	/**
	 * Поиск подразделения связанного с телефоном
	 * @param number номер телефона
	 * @return наименование отдела
	 */
	@Query("SELECT d.name, d.code FROM Telephone p, in(p.subdivision) d WHERE p.number like :number")
    public String[][] findSubdivisionCodeName(@Param("number") String number);
	
	/**
	 * Поиск количества совпадений по номеру в базе
	 * @param number номер телефона
	 * @return число совтадений по номеру
	 */
	@Query("SELECT count(p) FROM Telephone p WHERE p.number like :number")
    public Integer findCountNumber(@Param("number") String number);
	
}