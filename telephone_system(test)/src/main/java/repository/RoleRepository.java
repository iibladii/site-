package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;
import controllers.Role;
import controllers.User;
import controllers.User_Role;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

//https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/ - manual


public interface RoleRepository extends CrudRepository<Role, Long> {

	//Получим все роли связаные с user=:name
	@Query("SELECT Distinct r FROM Role r, in(r.role) ur, in(ur.user) u WHERE ur.user=u.id and ur.role=r.id and u.username=:name")
    public List<Role> find(@Param("name") String name);

	//Получим все роли не связаные с user=:name но связанные хотябы с одним пользователем
	@Query("SELECT Distinct r FROM Role r, in(r.role) ur WHERE ur.role=r.id and ur.user!=(SELECT DISTINCT ur.user FROM User u, in(u.user) ur, in(ur.role) r WHERE ur.user=u.id and ur.role=r.id and u.username=:name)")
    public List<Role> find5(@Param("name") String name);
	
	//Получим все роли не связаные с пользователями
	@Query("SELECT Distinct r FROM Role r WHERE r.role IS EMPTY")
    public List<Role> find6();
}
//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/