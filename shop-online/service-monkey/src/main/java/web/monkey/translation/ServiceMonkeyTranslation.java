package web.monkey.translation;

import core.common.locate.Language;
import core.common.locate.LocalizeUtil;

public class ServiceMonkeyTranslation {

	public String orderShopName;
	public String orderShopAddress;
	public String orderShopPhone;
	
	public static ServiceMonkeyTranslation get() {
		try {
			return LocalizeUtil.load("/i18n/", ServiceMonkeyTranslation.class, Language.VIET_NAM.toString());
		} catch (InstantiationException e) {
		} catch (IllegalAccessException e) {
		}
		
		return new ServiceMonkeyTranslation();
	}
}
