package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;
//https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/ - manual

public interface AdslRepository extends CrudRepository<Adsl, Long> {
	@Query(value = "select a from Adsl a WHERE a.name like :name")
    List<Adsl> findAll(@Param("name") String name);
	
	@Query(value = "select count(a) from Adsl a WHERE a.name like :name")
    Integer findAllcount(@Param("name") String name);

	@Query(value = "select a from Adsl a")
    Adsl findOne();
}
//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/