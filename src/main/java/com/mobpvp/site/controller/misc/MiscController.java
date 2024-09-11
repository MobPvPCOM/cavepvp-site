package com.mobpvp.site.controller.misc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MiscController {

    @RequestMapping("/policy")
    public ModelAndView privacyPolicy() {
        return new ModelAndView("misc/privacy-policy");
    }

    @RequestMapping("/ranked/tutorial")
    public ModelAndView rankedTutorial() {
        return new ModelAndView("misc/ranked-tutorial");
    }

}