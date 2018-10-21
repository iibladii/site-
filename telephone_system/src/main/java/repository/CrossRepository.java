package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;
//https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/ - manual
import controllers.Cross;

public interface CrossRepository extends CrudRepository<Cross, Long> {
	
	/**
	 * Получение объекта кросса
	 * @param name наименование элемента кросса
	 * @return объект кросса
	 */
	@Query(value = "select a from Cross a WHERE a.name like :name")
    List<Cross> findCrossObject(@Param("name") String name);
	
}