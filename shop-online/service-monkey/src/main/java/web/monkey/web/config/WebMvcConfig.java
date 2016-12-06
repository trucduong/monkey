package web.monkey.web.config;

import java.util.List;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import core.service.config.BaseServiceMvcConfig;
import web.monkey.shared.utils.ServiceActions;

@Configuration
@ComponentScan(basePackages = { "web.monkey.web" })
@EnableWebMvc
public class WebMvcConfig extends BaseServiceMvcConfig {
	@Override
	protected void addByPassAuthorization(List<String> bypasses) {
		bypasses.add(ServiceActions.AUTH_SERVICE + ServiceActions.LOGIN);
		bypasses.add(ServiceActions.AUTH_SERVICE + ServiceActions.LOGOUT);
	}
}