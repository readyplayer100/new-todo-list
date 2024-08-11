package com.heartin.todoAuth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan("com.heartin.todoAuth.mapper")
@SpringBootApplication
public class TodoAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoAuthApplication.class, args);
	}

}
