package controllers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class Application extends SpringBootServletInitializer{
//https://www.youtube.com/watch?v=n7k20TTfPOI
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }
	
    public static void main(String[] args) throws Throwable {
        SpringApplication.run(Application.class, args);
    }

}