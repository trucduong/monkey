package web.monkey.importexport.catalogue;

public abstract class ExcelReader<T> {
	protected abstract boolean check();
	protected abstract boolean read();
}
