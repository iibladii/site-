package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import controllers.Adsl;
import controllers.Telephone;
import controllers.User;
import controllers.User_Role;

public interface UserRepository extends CrudRepository<User, Long> {
	
	/**
	 * Получим список всех пользователей
	 * @return список пользователей
	 */
	@Query("SELECT u FROM User u")
    public List<User> findName();
	
	/**
	 * Число пользователей имеющих заданный логин
	 * @param username логин пользователя в системе
	 * @return число найденных пользователей
	 */
	@Query("SELECT Count(u) FROM User u WHERE u.username = :username")
    public Integer findCountLogin(@Param("username") String username);
	
	/**
	 * Получение пользователя с указаным логином
	 * @param name логин пользователя
	 * @return пользователь
	 */
	@Query("SELECT u FROM User u WHERE u.username=:name")
    public User getUserInfo(@Param("name") String name);
	
	/**
	 * Список пользователей имеющих заданное имя хотябы одну роль в системе
	 * @param name имя пользователя
	 * @return список пользователей
	 */
	@Query("SELECT Distinct u FROM User u, in(u.user) ur, in(ur.role) r WHERE ur.user=u.id and ur.role=r.id and u.username=:name")
    public List<User> find(@Param("name") String name);
}