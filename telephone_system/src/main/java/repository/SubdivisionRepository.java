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
	 * Поиск количества подразделений с заданным наименованием
	 * @param name наименование подразделения
	 * @return число подразделений
	 */
	@Query(value = "select count(a) from Subdivision a WHERE a.name like :name")
    Integer findAllcount(@Param("name") String name);
	
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
	@Query(value = "select a.name, a.code from Subdivision a, in(a.department) d WHERE d.name like :name ORDER BY a.name")
	String[][] findAllCodeName(@Param("name") String name);
	
	/**
	 * Поиск всех наименований и кодов подразделений всех кроме подразделений связанных с отделом с заданным наименованием
	 * @return массив наименований и кодов array[][]
	 */
	@Query(value = "select a.name, a.code from Subdivision a, in(a.department) d WHERE d.name not like :name ORDER BY a.name")
	String[][] findAllCodeNameNot(@Param("name") String name);
	
	/**
	 * Поиск всех наименований и кодов подразделений не связанных с отделами
	 * @return массив наименований и кодов array[][]
	 */
	@Query(value = "select a.name, a.code from Subdivision a WHERE a.department IS NULL ORDER BY a.name")
	String[][] findAllCodeNameNotDepartment();
}