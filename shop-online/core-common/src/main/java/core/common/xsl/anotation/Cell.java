package core.common.xsl.anotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
public @interface Cell {
	int row();
	int col();
}
