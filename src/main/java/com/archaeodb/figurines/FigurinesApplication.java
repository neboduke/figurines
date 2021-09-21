package com.archaeodb.figurines;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class FigurinesApplication {

	public static void main(String[] args) {

		SpringApplication.run(FigurinesApplication.class, args);
		System.out.println("XXX");
	}

}
