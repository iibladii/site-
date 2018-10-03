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

public interface RoleRepository extends CrudRepository<Role, Long> {

	/**
	 * Поиск конкретной роли
	 * @param role наименование роли
	 * @return объект роли
	 */
	@Query("SELECT Distinct r FROM Role r WHERE r.role_name=:role")
	public Role findRole(@Param("role") String role);
	
	/**
	 * Получим все роли пользователя с логином name
	 * @param name логин пользователя
	 * @return список ролей пользователей
	 */
	@Query("SELECT Distinct r FROM Role r, in(r.role) ur, in(ur.user) u WHERE ur.user=u.id and ur.role=r.id and u.username=:name")
    public List<Role> find(@Param("name") String name);
	
	/**
	 * Получим все роли не связаные с user=:name но связанные хотябы с одним пользователем
	 * @param name имя пользователя
	 * @return все роли не связанные с выбранным пользователем
	 */
	@Query("SELECT Distinct r FROM Role r, in(r.role) ur WHERE ur.role=r.id and ur.user!=(SELECT DISTINCT ur.user FROM User u, in(u.user) ur, in(ur.role) r WHERE ur.user=u.id and ur.role=r.id and u.username=:name)")
    public List<Role> find5(@Param("name") String name);
	
	/**
	 * Получим все роли не связаные с пользователями
	 * @return список ролей
	 */
	@Query("SELECT Distinct r FROM Role r WHERE r.role IS EMPTY")
    public List<Role> find6();
	
	/**
	 * Получим наименования всех ролей меющихся в базе
	 * @return список ролей
	 */
	@Query("SELECT r.role_name FROM Role r")
	public List<String> findAllRole();
}