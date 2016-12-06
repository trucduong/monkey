package web.monkey.web.config;

import core.service.config.BaseAnnotationConfigDispatcherServletInitializer;
import web.monkey.config.AppConfig;

public class SpringWebAppInitializer extends BaseAnnotationConfigDispatcherServletInitializer {
	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class<?>[] { AppConfig.class };
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class<?>[] { WebMvcConfig.class };
	}
}