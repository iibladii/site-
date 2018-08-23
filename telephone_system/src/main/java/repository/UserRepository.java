package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;
import controllers.Telephone;
import controllers.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

//https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/ - manual


public interface UserRepository extends CrudRepository<User, Long> {
	
	
	
	
	
	
	@Query("SELECT u FROM User u")
    public List<User> findName();
	
	@Query("SELECT u FROM User u WHERE u.username=:name")
    public User getUserInfo(@Param("name") String name);
	
	@Query("SELECT Distinct u FROM User u, in(u.user) ur, in(ur.role) r WHERE ur.user=u.id and ur.role=r.id and u.username=:name")
    public List<User> find(@Param("name") String name);
	
}
//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/