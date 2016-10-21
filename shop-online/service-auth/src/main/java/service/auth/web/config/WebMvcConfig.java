package service.auth.web.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import core.service.config.BaseServiceMvcConfig;

@Configuration
@ComponentScan(basePackages = { "service.auth.web" })
@EnableWebMvc
public class WebMvcConfig extends BaseServiceMvcConfig {

	
}