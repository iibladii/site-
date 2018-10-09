package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;
import controllers.Department;
import controllers.Subdivision;

public interface DepartmentRepository extends CrudRepository<Department, Long> {

	/**
	 * Поиск конкретного подразделения согласно условию
	 * @param name шаблон наименования подразделения
	 * @returnнайденное подразделение
	 */
	@Query(value = "select a from Department a WHERE a.name like :name")
    Department findOne(@Param("name") String name);
	
	/**
	 * Поиск подазделений согласно фильтру
	 * @param name шаблон наименования подразделения
	 * @return список подразделений
	 */
	@Query(value = "select a from Department a WHERE a.name like :name")
    List<Department> findAll(@Param("name") String name);
	
	/**
	 * Поиск числа различных подразделений согласно фильтру
	 * @param name шаблон наименования подразделения
	 * @return число различных подразделений
	 */
	@Query(value = "select count(a) from Department a WHERE a.name like :name")
    Integer findAllcount(@Param("name") String name);
	
	/**
	 * Подразделения связанные с конкретным отделом
	 * @return список подразделений
	 */
	@Query(value = "select s.name, s.code from Department a, in(a.subdivision) s WHERE a.name like :name")
    String[][] findAllrole(@Param("name") String name);
	
	/**
	 * Поиск количества подразделений в бд
	 * @return количество подразделений
	 */
	@Query(value = "select a from Department a WHERE a.name like :name")
    Department findAllCount();
}