package com.mobpvp.site.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MaintenanceController {

    @RequestMapping("/maintenance")
    public ModelAndView maintenance() {
        return new ModelAndView("maintenance");
    }

}
