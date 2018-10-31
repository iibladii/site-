package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;
//https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/ - manual
import controllers.Kross;

public interface KrossRepository extends CrudRepository<Kross, Long> {
	
	/**
	 * Получение объекта кросса
	 * @param name наименование элемента кросса
	 * @return объект кросса
	 */
	@Query(value = "select a from Kross a WHERE a.name like :name")
    List<Kross> findCrossObject(@Param("name") String name);
	
	/**
	 * Получение списка элементов кросса по номеру
	 * @param number номер телефона
	 * @return список элементов кросса
	 */
	@Query(value = "select a.name from Kross a, in(a.telephone) t WHERE t.number like :number")
    String[] findCrossByTelephone(@Param("number") String number);
}