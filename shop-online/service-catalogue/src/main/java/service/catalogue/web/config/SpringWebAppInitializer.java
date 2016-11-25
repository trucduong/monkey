package service.catalogue.web.config;

import core.service.config.BaseAnnotationConfigDispatcherServletInitializer;
import service.catalogue.config.AppConfig;

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