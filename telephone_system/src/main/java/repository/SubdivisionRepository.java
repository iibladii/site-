package repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Department;
import controllers.Subdivision;

public interface SubdivisionRepository extends CrudRepository<Subdivision, Long> {

	/**
	 * Получение объекта подразделения
	 * @param number номер телефона
	 * @return объект подразделения
	 */
	@Query(value = "SELECT s.department FROM Subdivision s, in(s.telephone) t WHERE t.number like :number")
	Department findDepListFromTelephone(@Param("number") String number);
	
	/**
	 * Получение наименования подразделения по номеру телефона
	 * @param number номер телефона
	 * @return объект подразделения
	 */
	@Query(value = "SELECT s.name FROM Subdivision s, in(s.telephone) t WHERE t.number like :number")
	String findSubdivNameByTelephone(@Param("number") String number);
	
	/**
	 * Выборка подразделения имеющего заданное наименование и код
	 * @param name наименование подразделения
	 * @param code код подразделения
	 * @return объект подразделения
	 */
	@Query(value = "select a from Subdivision a WHERE a.name like :name and a.code like :code")
    Subdivision findOne(@Param("name") String name, @Param("code") String code);
	
	/**
	 * Выборка подразделений имеющих заданное наименование и код
	 * @param name наименование подразделения
	 * @param code код подразделения
	 * @return список подразделений
	 */
	@Query(value = "select a from Subdivision a WHERE a.name like :name and a.code like :code")
    List<Subdivision> findAll_(@Param("name") String name, @Param("code") String code);
	
	/**
	 * Подсчёт количества подразделений имеющих заданное наименование и код
	 * @param name наименование подразделения
	 * @param code код подразделения
	 * @return количество подразделений имеющих заданное наименование и код
	 */
	@Query(value = "select count(a) from Subdivision a WHERE a.name like :name and a.code like :code")
    Integer findAllcount_(@Param("name") String name, @Param("code") String code);
	
	/**
	 * Поиск всех подразделений с заданным наименованием
	 * @param name наименование подразделения
	 * @returnсписок подразделений
	 */
	@Query(value = "select a from Subdivision a WHERE a.name like :name")
    List<Subdivision> findAll(@Param("name") String name);
	
	/**
	 * Поиск всех подразделений с заданным наименованием и кодом
	 * @param name наименование подразделения
	 * @return список подразделений
	 */
	@Query(value = "select a from Subdivision a WHERE a.name like :name and a.code like :code")
    Subdivision findAllByNameCode(@Param("name") String name, @Param("code") String code);
	
	/**
	 * Поиск количества подразделений с заданным наименованием
	 * @param name наименование подразделения
	 * @return число подразделений
	 */
	@Query(value = "select count(a) from Subdivision a WHERE a.name like :name")
    Integer findAllcount(@Param("name") String name);
	
	/**
	 * Поиск количества подразделений с заданным наименованием и кодом
	 * @param name наименование подразделения
	 * @param code код подразделения
	 * @return число подразделений
	 */
	@Query(value = "select count(a) from Subdivision a WHERE a.name like :name and a.code like :code")
    Integer findAllcountbyNameCode(@Param("name") String name, @Param("code") String code);
	
	/**
	 * Поиск всех подразделений
	 * @return список подразделений
	 */
	@Query(value = "select a.name from Subdivision a")
	ArrayList<String> findAll_();
	
	/**
	 * Поиск подразделения по его коду
	 * @return объект подразделения
	 */
	@Query(value = "select a from Subdivision a WHERE a.code like :code")
	Subdivision findObjectByCode(@Param("code") String code);
	
	/**
	 * Поиск подразделения по его названию
	 * @return объект подразделения
	 */
	@Query(value = "select a from Subdivision a WHERE a.name like :name")
	Subdivision findObjectByName(@Param("name") String name);
	
	/**
	 * Поиск подразделения по его названию и коду
	 * @param name наименование подразделения
	 * @param code код подразделения
	 * @returnобъект подразделения
	 */
	@Query(value = "select a from Subdivision a WHERE a.name like :name and a.code like :code")
	Subdivision findObjectByCodeName(@Param("name") String name, @Param("code") String code);
	
	/**
	 * Поиск всех наименований и кодов подразделений связанных с отделом с заданным наименованием
	 * @return массив наименований и кодов array[][]
	 */
	@Query(value = "select s.name, s.code from Subdivision s, in(s.department) d WHERE d.name like :name and d.code like :code ORDER BY d.code")
	String[][] findAllCodeName(@Param("name") String name, @Param("code") String code);
	
	/**
	 * Поиск всех наименований и кодов подразделений всех кроме подразделений связанных с отделом с заданным наименованием
	 * @return массив наименований и кодов array[][]
	 */
	@Query(value = "select a.name, a.code from Subdivision a, in(a.department) d WHERE d.name not like :name and d.code like :code ORDER BY a.name")
	String[][] findAllCodeNameNot(@Param("name") String name, @Param("code") String code);
	
	/**
	 * Поиск всех наименований и кодов подразделений не связанных с отделами
	 * @return массив наименований и кодов array[][]
	 */
	@Query(value = "select a.name, a.code from Subdivision a WHERE a.department IS NULL ORDER BY a.name")
	String[][] findAllCodeNameNotDepartment();
	
	/**
	 * Поиск числа различных отделов согласно фильтру
	 * @param name наименование отделов
	 * @param code код отделов
	 * @return число различных отделов
	 */
	@Query(value = "select count(a) from Subdivision a WHERE a.name like :name and a.code like :code")
    Integer findAllcountNameCode(@Param("name") String name, @Param("code") String code);
}