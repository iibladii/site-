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
	 * Поиск количества подразделений с заданным yfbvtyjdfybtv
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
	 * Поиск подразделения по его названию
	 * @return объект подразделения
	 */
	@Query(value = "select a from Subdivision a WHERE a.name like :name")
	Subdivision findObjectByName(@Param("name") String name);
}