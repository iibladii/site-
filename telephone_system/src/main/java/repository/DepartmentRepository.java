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
	 * Поиск подразделения по коду и наименованию
	 * @param name наименование
	 * @param code код
	 * @return список подраздеелний
	 */
	@Query(value = "select a from Department a WHERE a.name like :name and a.code like :code order by a.code")
    List<Department> findAllCodeName(@Param("name") String name, @Param("code") String code);
	
	/**
	 * Поиск числа различных подразделений согласно фильтру
	 * @param name шаблон наименования подразделения
	 * @return число различных подразделений
	 */
	@Query(value = "select count(a) from Department a WHERE a.name like :name")
    Integer findAllcount(@Param("name") String name);
	
	/**
	 * Поиск числа различных подразделений согласно фильтру
	 * @param name наименование подразделения
	 * @param code код подразделения
	 * @return число различных подразделений
	 */
	@Query(value = "select count(a) from Department a WHERE a.name like :name and a.code like :code")
    Integer findAllcountNameCode(@Param("name") String name, @Param("code") String code);
	
	/**
	 * Подразделения связанные с конкретным отделом
	 * @return список подразделений
	 */
	@Query(value = "select s.name, s.code from Department a, in(a.subdivision) s WHERE a.name like :name and a.code like :code")
    String[][] findAllrole(@Param("name") String name, @Param("code") String code);
	
	/**
	 * Поиск количества подразделений в бд
	 * @return количество подразделений
	 */
	@Query(value = "select a from Department a WHERE a.name like :name")
    Department findAllCount();
	
	/**
	 * Поиск всех отделов
	 * @return список наименований, кодов подразделений
	 */
	@Query(value = "select a.name, a.code from Department a")
    String[][] findAllDepartment();
	
	/**
	 * Поиск списка всех отделов
	 * @return список наименований подразделений
	 */
	@Query(value = "select a.name from Department a Where a.name like :name")
    List<String> findAllDep(@Param("name") String name);
}