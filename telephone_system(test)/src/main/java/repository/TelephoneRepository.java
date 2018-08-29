package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Telephone;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

//https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/ - manual


public interface TelephoneRepository extends CrudRepository<Telephone, Long> {
	//@Query("SELECT p FROM Person p WHERE LOWER(p.name) = LOWER(:name)")
	
	
	//@Query("SELECT p FROM User p WHERE p.name = :name_")
    //public List<User> find(@Param("name_") String name_);
	
	
	
	
	/*
	@Query("SELECT p FROM Telephone p WHERE p.att1 like :name_")
    public List<Telephone> find(@Param("name_") String name_);
	*/
	/*
	@Query("SELECT p FROM Telephone p WHERE p.att1 like :att1 and p.att2 like :att2 and p.number like :number")
    public List<Telephone> find(@Param("number") String number,@Param("att1") String att1,@Param("att2") String att2);
	*/
	/*
	@Query("SELECT p FROM Telephone p, in(p.department) t WHERE p.att1 like :att1 and p.att2 like :att2 and p.number like :number and p.room like :room")
    public List<Telephone> find(@Param("number") String number,@Param("att1") String att1,@Param("att2") String att2,@Param("room") String room);
	*/
	
	//@Query("SELECT p FROM Telephone p, in(p.department) t, in(p.subdivision) s, in(p.adsl) a WHERE p.att1 like :att1 and p.att2 like :att2 and p.number like :number and p.room like :room and t.name like :department and a.name like :adsl and s.name like :subdivision and s.code like :subdivision_code")
    //public List<Telephone> find(@Param("number") String number,@Param("att1") String att1,@Param("att2") String att2,@Param("room") String room,@Param("department") String department,@Param("adsl") String adsl,@Param("subdivision") String subdivision,@Param("subdivision_code") String subdivision_code);
	@Query("SELECT p FROM Telephone p, in(p.department) t, in(p.adsl) a, in(t.subdivision) s WHERE p.att1 like :att1 and p.att2 like :att2 and p.number like :number and p.room like :room and t.name like :department and a.name like :adsl and s.name like :subdivision and s.code like :subdivision_code")
    public List<Telephone> find(@Param("number") String number,@Param("att1") String att1,@Param("att2") String att2,@Param("room") String room,@Param("department") String department,@Param("adsl") String adsl,@Param("subdivision") String subdivision,@Param("subdivision_code") String subdivision_code);
	
	//List<User> findByTicket(Ticket ticket);
	
	//@Query(value = "select uc from User us where t.id = 1")
    //List<User> findByTicketId();
	
	
	/*
	@Query("SELECT p FROM User p WHERE p.name='dd'")
    public List<User> find();
    */
}
//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/