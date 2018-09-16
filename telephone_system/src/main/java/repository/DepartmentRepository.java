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

	@Query(value = "select a from Department a WHERE a.name like :name")
    Department findOne(@Param("name") String name);
	
	@Query(value = "select a from Department a WHERE a.name like :name")
    List<Department> findAll(@Param("name") String name);
	
	@Query(value = "select count(a) from Department a WHERE a.name like :name")
    Integer findAllcount(@Param("name") String name);
	
	@Query(value = "select a from Department a WHERE a.name like :name")
    List<Department> findAll_(@Param("name") String name);
}