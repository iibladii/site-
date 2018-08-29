package repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Department;
import controllers.Subdivision;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

//https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/ - manual


public interface SubdivisionRepository extends CrudRepository<Subdivision, Long> {
	//@Query("SELECT p FROM Person p WHERE LOWER(p.name) = LOWER(:name)")
	
	
	//@Query("SELECT p FROM User p WHERE p.name = :name_")
    //public List<User> find(@Param("name_") String name_);
	
	//@Query("SELECT p FROM User p, in(p.ticket) t WHERE t.name = :name_")
    //public List<Department> find(@Param("name_") String name_);
	
	
	
	//List<User> findByTicket(Ticket ticket);
	
	//@Query(value = "select uc from User us where t.id = 1")
    //List<User> findByTicketId();
	
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
	
	/*
	@Query("SELECT p FROM User p WHERE p.name='dd'")
    public List<User> find();
    */
}
//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/