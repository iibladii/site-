package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;
import controllers.Security;

public interface SecurityRepository extends CrudRepository<Security, Long> {

	@Query(value = "SELECT count(s) FROM Security s WHERE s.name like :name")
	public Integer findCountRep(@Param("name") String name);
}