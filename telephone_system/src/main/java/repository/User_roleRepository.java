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

}