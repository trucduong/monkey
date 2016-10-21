package core.common.locate;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.Properties;

public class LocalizeUtil {
	
	/**
	 * Example file name: message_vi.properties
	 * @param path
	 * @param cls
	 * @param language
	 * @return
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	public static <T> T load(String path, Class<T> cls, String language)
			throws InstantiationException, IllegalAccessException {
		String filePath = new StringBuffer(path).append("message_").append(language).append(".properties").toString();
		Properties prop = load(filePath);
		T nls = cls.newInstance();
		Field[] fields = cls.getFields();
		for (Field field : fields) {
			field.set(nls, prop.getProperty(field.getName(), ""));
		}
		return nls;
	}

	private static Properties load(String path) {
		Properties prop = new Properties();
		InputStream input = null;

		try {
			input = new FileInputStream(path + ".properties");
			// load a properties file
			prop.load(input);

		} catch (IOException ex) {
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		return prop;
	}
}
