package service.partner.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import core.service.config.BaseServiceAppConfig;

@Configuration
@ComponentScan(basePackages = {"service.partner" },
	excludeFilters = @ComponentScan.Filter(type = FilterType.REGEX, pattern = {"service.partner.web.*" }))
@PropertySource(value = { "classpath:application.properties" })
@EnableScheduling
@EnableAspectJAutoProxy
@EnableTransactionManagement
@EnableCaching
public class AppConfig extends BaseServiceAppConfig {

	@Override
	protected String getEntitiesPackage() {
		return "service.partner.entities";
	}
}