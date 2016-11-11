package core.common.xsl;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import core.common.reflect.ObjectModifier;
import core.common.xsl.anotation.XSLColumn;
import core.common.xsl.anotation.XSLSheet;

public class ExcelMappingProvider {
	public static <T> List<T> read(Class<T> objClass, FileInputStream file) {
		List<T> results = new ArrayList<T>();
		try {
			// Get the workbook instance for XLS file
			XSSFWorkbook workbook = new XSSFWorkbook(file);

			// Get sheet from the workbook
			XSLSheet sheetAnotation = AnotationProvider.getClassAnotation(objClass, XSLSheet.class);
			XSSFSheet sheet = workbook.getSheet(sheetAnotation.name());

			int rowIndex = sheetAnotation.startRow();
			while (true) {
				Row row = sheet.getRow(rowIndex);

				// check continue
				if (getCellValue(row.getCell(0)) == null) {
					break;
				}

				T obj = objClass.newInstance();
				Field fileds[] = objClass.getFields();
				for (Field field : fileds) {
					if (field.isAnnotationPresent(XSLColumn.class)) {
						XSLColumn colAnnotation = field.getAnnotation(XSLColumn.class);
						Cell cell = row.getCell(colAnnotation.index());
						ObjectModifier.set(obj, field, colAnnotation.converter().newInstance().convert(getCellValue(cell)));
					}
				}

				results.add(obj);
				rowIndex++;
			}
		} catch (Exception e) {
		}
		return results;
	}

	public static <T> boolean write(Class<T> objClass, List<T> objects, FileInputStream file, FileOutputStream out) {
		try {
			// Get the workbook instance for XLS file
			XSSFWorkbook workbook = new XSSFWorkbook(file);

			// Get sheet from the workbook
			XSLSheet sheetAnotation = AnotationProvider.getClassAnotation(objClass, XSLSheet.class);
			XSSFSheet sheet = workbook.getSheet(sheetAnotation.name());

			int rowIndex = sheetAnotation.startRow();
			for (Object obj : objects) {
				Row row = sheet.getRow(rowIndex);

				Field fileds[] = objClass.getFields();
				for (Field field : fileds) {
					if (field.isAnnotationPresent(XSLColumn.class)) {
						XSLColumn colAnnotation = field.getAnnotation(XSLColumn.class);
						Cell cell = row.getCell(colAnnotation.index());
						setCellValue(cell, ObjectModifier.get(obj, field));
					}
				}

				rowIndex++;
			}

			workbook.write(out);
			out.close();
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	public static Object getCellValue(Cell cell) {
		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_BOOLEAN:
			return cell.getBooleanCellValue();
		case Cell.CELL_TYPE_NUMERIC:
			return cell.getNumericCellValue();
		case Cell.CELL_TYPE_STRING:
			return cell.getStringCellValue();
		}
		return null;
	}
	
	public static void setCellValue(Cell cell, Object obj) {
		if(obj == null) {
			return;
		}
		cell.setCellValue(String.valueOf(obj));
		
//		if (obj instanceof Integer || obj instanceof Long || obj instanceof Double || obj instanceof BigDecimal) {
//			double value = Double.parseDouble(String.valueOf(obj));
//			cell.setCellValue(value);
//		} else if (obj instanceof String) {
//			cell.setCellValue(String.valueOf(obj));
//		}
	}
}
