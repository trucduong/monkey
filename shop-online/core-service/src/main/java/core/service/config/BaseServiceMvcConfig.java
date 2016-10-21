package core.service.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

public abstract class BaseServiceMvcConfig extends WebMvcConfigurerAdapter {
	
	@Bean
	public MessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename(getMessageSourceBasename());
		messageSource.setCacheSeconds(5);
		messageSource.setDefaultEncoding("UTF-8");
		return messageSource;
	}

	protected String getMessageSourceBasename() {
		return "classpath:i18n/messages";
	}
}
