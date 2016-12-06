package web.monkey.config;

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
@ComponentScan(basePackages = {"web.monkey" },
	excludeFilters = @ComponentScan.Filter(type = FilterType.REGEX, pattern = {"web.monkey.web.*" }))
@PropertySource(value = { "classpath:application.properties" })
@EnableScheduling
@EnableAspectJAutoProxy
@EnableTransactionManagement
@EnableCaching
public class AppConfig extends BaseServiceAppConfig {

	@Override
	protected String getEntitiesPackage() {
		return "web.monkey.entities";
	}
}