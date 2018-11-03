package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;
import controllers.Security;

public interface SecurityRepository extends CrudRepository<Security, Long> {

	/**
	 * Получим количество объектов с указанным параметром name
	 * @param name наименование
	 * @return количество строк в таблице с таким наименованием
	 */
	@Query(value = "SELECT count(s) FROM Security s WHERE s.number_dot like :name")
	public Integer findCountRep(@Param("name") String name);
	
	/**
	 * Получим объект
	 * @param name имя объекта
	 * @return объект
	 */
	@Query(value = "SELECT s FROM Security s WHERE s.number_dot like :name")
	public Security findObjRep(@Param("name") String name);
}