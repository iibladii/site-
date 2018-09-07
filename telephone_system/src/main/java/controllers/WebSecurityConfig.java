package controllers;

import java.util.Iterator;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	DataSource dataSource;

	/*
    @Autowired
    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
    	auth.jdbcAuthentication().dataSource(dataSource)
  	  .usersByUsernameQuery(
  	  "select username, password, enabled from users where username = ?")
  	  .authoritiesByUsernameQuery(
  	  "select username, role from user_roles where username = ?");
    }*/
	@Autowired
	/**
	 * Переопределим метод авторизации
	 * @param auth
	 * @throws Exception
	 */
    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
    	auth.jdbcAuthentication().dataSource(dataSource)
  	  .usersByUsernameQuery(
  	  "select username, password, enabled from user where username = ?")
  	  .authoritiesByUsernameQuery(
  	  "select user.username, role.role_name from user,user_role,role where user.id = user_role.user_id and role.id = user_role.role_id and user.username = ?");
    }     
        
        
		@Override
		protected void configure(HttpSecurity http) throws Exception {

		  http.authorizeRequests()
		  	.antMatchers("/", "/home","/login","/loginPlagin/**","/styles/**").permitAll()
			.antMatchers("/greeting").access("hasRole('ROLE_ADMIN')")	
			.anyRequest().authenticated()
			.and()
			  .formLogin().loginPage("/login")
			  .usernameParameter("username").passwordParameter("password")
			.and()
			  .logout().logoutSuccessUrl("/login?logout")	
			 .and()
			 .exceptionHandling().accessDeniedPage("/error")
			.and()
			  .csrf();
		}

		@Override
	    public void configure(WebSecurity web) throws Exception {
	        web.ignoring()
	            //.antMatchers("/scripts/**")
	            //.antMatchers("/styles/**")
	            //.antMatchers("/images/**")
	            .antMatchers("/styles/**");
	    }
		
		//Получим имя пользователя String str = WebSecurityConfig.getCurrentUsername();//Получим логин пользователя
		public static String getCurrentUsername() {
		      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		      //return auth.getAuthorities().toString();
		      return auth.getName();
		}
		public static Iterator getCurrentUserrole() {
		      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		      Iterator iterator = auth.getAuthorities().iterator();
		      return iterator;
		      //return auth.getName();
		}
		
}
