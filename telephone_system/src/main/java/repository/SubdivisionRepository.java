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

	@Query(value = "select a from Subdivision a WHERE a.name like :name and a.code like :code")
    Subdivision findOne(@Param("name") String name, @Param("code") String code);
	
	@Query(value = "select a from Subdivision a WHERE a.name like :name and a.code like :code")
    List<Subdivision> findAll_(@Param("name") String name, @Param("code") String code);
	
	@Query(value = "select count(a) from Subdivision a WHERE a.name like :name and a.code like :code")
    Integer findAllcount_(@Param("name") String name, @Param("code") String code);
	
	@Query(value = "select a from Subdivision a WHERE a.name like :name")
    List<Subdivision> findAll(@Param("name") String name);
	
	@Query(value = "select count(a) from Subdivision a WHERE a.name like :name")
    Integer findAllcount(@Param("name") String name);
	
	@Query(value = "select a.name from Subdivision a")
	ArrayList<String> findAll_();
}