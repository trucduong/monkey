package web.shop.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import core.web.navigation.Navigator;
import web.shop.config.View;

@Controller
public class HomeController {
	@RequestMapping(value = View.HOME_PAGE_URL, method=RequestMethod.GET)
	public ModelAndView gotoHome() {
		ModelAndView mv = Navigator.create(View.HOME_PAGE);
		
		return mv;
	}
}
