package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

//https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/ - manual


public interface AdslRepository extends CrudRepository<Adsl, Long> {
	//@Query("SELECT p FROM Person p WHERE LOWER(p.name) = LOWER(:name)")
	
	
	//@Query("SELECT p FROM User p WHERE p.name = :name_")
    //public List<User> find(@Param("name_") String name_);
	
	/*
	@Query("SELECT p FROM Telephone p WHERE p.att1 like :name_")
    public List<Telephone> find(@Param("name_") String name_);
	*/
	
	
	//List<User> findByTicket(Ticket ticket);
	
	//@Query(value = "select a from Adsl a WHERE a.name=:name")
    //List<Adsl> findAll_(@Param("name") String name);
	
	@Query(value = "select a from Adsl a WHERE a.name like :name")
    List<Adsl> findAll(@Param("name") String name);
	
	@Query(value = "select count(a) from Adsl a WHERE a.name like :name")
    Integer findAllcount(@Param("name") String name);
	/*
	@Query("SELECT p FROM User p WHERE p.name='dd'")
    public List<User> find();
    */
}
//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/