package core.common.xsl.anotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
public @interface Sheet {
	String name() default "";
	int startRow() default 0;
}