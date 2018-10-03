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

public interface User_roleRepository extends CrudRepository<User_Role, Long> {
	/**
	 * Получим объект связывающий пользователя с ролью
	 * @return список пользователей
	 */
	@Query("SELECT ur FROM User_Role ur, in(ur.user) u, in(ur.role) r WHERE u=:user and r=:role")
    public User_Role findObject(@Param("user") User user, @Param("role") Role role);
	
	/**
	 * Получим список объектов для указанного пользователя
	 * @return список объектов
	 */
	@Query("SELECT ur FROM User_Role ur, in(ur.user) u WHERE u=:user")
    public List<User_Role> findListObject(@Param("user") User user);
}