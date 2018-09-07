package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;
import controllers.Department;
import controllers.Dots;
public interface DotsRepository extends CrudRepository<Dots, Long> {
	@Query(value = "select a from Dots a WHERE a.dot like :dot")
    List<Dots> findAll(@Param("dot") String dot);
}