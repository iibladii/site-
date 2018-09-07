package controllers;

import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@EnableWebMvc
@EnableJpaRepositories("repository")
public class MvcConfig extends WebMvcConfigurerAdapter {
	   @Override
	   public void addViewControllers(ViewControllerRegistry registry) {
		   registry.addViewController("/home").setViewName("home");
		   registry.addViewController("/").setViewName("kartoteka");
		   registry.addViewController("/hello").setViewName("hello");
		   registry.addViewController("/login").setViewName("login");
		   //registry.addViewController("/greeting").setViewName("greeting");
		   registry.addViewController("/error").setViewName("error");
	   }
	   
	  /* 
	   @Bean(name = "dataSource")
	   public DriverManagerDataSource dataSource() {
	       DriverManagerDataSource driverManagerDataSource = new DriverManagerDataSource();
	       driverManagerDataSource.setDriverClassName("com.mysql.jdbc.Driver");
	       driverManagerDataSource.setUrl("jdbc:mysql://localhost:3306/db_example? verifyServerCertificate =false&useSSL=false&requireSSL=false");
	       driverManagerDataSource.setUsername("root");
	       driverManagerDataSource.setPassword("cppcpp");
	       return driverManagerDataSource;
	   }
	    */
	   
	   //https://habrahabr.ru/post/111102/
	   @Bean(name = "viewResolver")
	   public InternalResourceViewResolver viewResolver() {
		   InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		   //resolver.setPrefix("/WEB-INF/jsp/");
		   //resolver.setPrefix("/webapp/");
		   resolver.setSuffix(".jsp");
		   return resolver;
	   }  
	   
	   @Override
	   public void addResourceHandlers(ResourceHandlerRegistry registry) {
	        registry.addResourceHandler("/styles/**").addResourceLocations("/theme1/");
	        registry.addResourceHandler("kartoteka/styles/**").addResourceLocations("/theme1/");
	        registry.addResourceHandler("kartoteka/page/styles/**").addResourceLocations("/theme1/");
	   }
}
