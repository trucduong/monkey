package web.monkey.web.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;

@Controller
public class HomeController {

	@Autowired
	Environment env;
	
//	@RequestMapping(value = View.HOME_PAGE_URL, method = RequestMethod.GET)
//	public ModelAndView gotoHome() throws CommonException {
//		ModelAndView mv = Navigator.create(View.HOME_PAGE);

//		ServiceResult result = ServiceProvider.get(ServiceAuthAction.getAccountByName(env, "admin"));
//		if (ServiceProvider.isSuccess(result)) {
//			mv.addObject("account", ServiceProvider.getValue(result, AccountDto.class));
//		} else {
//			throw new CommonException(result.getValue());
//		}

//		return mv;
//	}
}
