package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;
import controllers.ErrorCable;

public interface ErrorCableRepository extends CrudRepository<ErrorCable, Long> {
	@Query(value = "select a from ErrorCable a WHERE a.name like :name")
    List<ErrorCable> findAll(@Param("name") String name);
	
	@Query(value = "select count(a) from ErrorCable a WHERE a.name like :name")
    Integer findAllcount(@Param("name") String name);
}