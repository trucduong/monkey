package service.catalogue.importexport;

public abstract class ExcelReader<T> {
	protected abstract boolean check();
	protected abstract boolean read();
}
