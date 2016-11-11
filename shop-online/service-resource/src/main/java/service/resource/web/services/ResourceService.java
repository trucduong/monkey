package service.resource.web.services;

import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import core.common.exception.CommonException;
import core.service.services.BaseService;
import core.service.utils.ServiceErrorCode;
import core.service.utils.ServiceResult;
import service.resource.dao.TempResourceDao;
import service.resource.entities.TempResource;
import service.resource.shared.utils.ServiceResourceAction;

@Controller
@RequestMapping(name = ServiceResourceAction.RESOURCE_SERVICE)
public class ResourceService extends BaseService {

	@Override
	protected Class<?> getThis() {
		return this.getClass();
	}
	
	@Autowired
	private TempResourceDao tempResourceDao;

	@RequestMapping(name = ServiceResourceAction.UPLOAD_TEMP, method = RequestMethod.POST)
	public ServiceResult uploadTempFile(@RequestParam("file") MultipartFile file) throws IOException {

		if (file.isEmpty()) {
			return error(ServiceErrorCode.PARAMETER_ERROR);
		}
		
		TempResource resource = new TempResource();
		resource.setContent(file.getBytes());
		resource.setContentType(file.getContentType());
		resource.setResourceType(file.getName());
		resource.setCreatedDate(new Date());
		tempResourceDao.create(resource);

		return success(resource.getId());
	}
	
	
	@RequestMapping(value=ServiceResourceAction.DOWNLOAD_TEMP, method = RequestMethod.GET)
	public void downloadTempFile(HttpServletResponse response, @PathVariable("id") long id) throws IOException, CommonException {

		TempResource resource = tempResourceDao.find(id);
		if (resource == null) {
//			String errorMessage = "Sorry. The file you are looking for does not exist";
//			OutputStream outputStream = response.getOutputStream();
//			outputStream.write(errorMessage.getBytes(Charset.forName("UTF-8")));
//			outputStream.close();
//			return;
			throw new CommonException(ServiceErrorCode.NOT_FOUND);
		}
		
        response.setContentType(resource.getContentType());

        /* "Content-Disposition : attachment" will be directly download, may provide save as popup, based on your browser setting*/
        response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", resource.getId() + resource.getResourceType()));
        
        response.setContentLength(resource.getContent().length);

        //Copy bytes from source to destination(outputstream in this example), closes both streams.
        FileCopyUtils.copy(resource.getContent(), response.getOutputStream());
	}
	
	

	@RequestMapping(value = ServiceResourceAction.DELETE_TEMP, method = RequestMethod.POST)
	public ServiceResult deleteTempFile(@PathVariable("id") long id) throws CommonException {
		init();
		tempResourceDao.delete(id);
		return success(id);
	}
}
