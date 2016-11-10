package core.common.xsl;

import java.lang.annotation.Annotation;

public class AnotationProvider {
	public static <T extends Annotation> T getClassAnotation(Class<?> objClass, Class<T> anotationClass) {
		if (objClass.isAnnotationPresent(anotationClass)) {
			
		}
		
		return null;
	}
}
