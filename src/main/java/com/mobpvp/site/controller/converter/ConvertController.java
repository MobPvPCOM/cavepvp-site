//package com.mobpvp.site.controller.converter;
//
//import com.mobpvp.site.cache.CacheHandler;
//import com.mobpvp.site.cache.impl.PlayerCountCache;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.servlet.ModelAndView;
//
//import javax.servlet.http.HttpServletRequest;
//
//@Controller
//public class ConvertController {
//
//    public static final PlayerCountCache CACHE
//            = CacheHandler.getCache(PlayerCountCache.class);
//
//    @RequestMapping("/converter")
//    public ModelAndView showIndex(HttpServletRequest request) {
//        ModelAndView view = new ModelAndView("converter/index");
//        view.addObject("convertedCount", CACHE.getCachedData()); // todo pack conversion count
//
//        return view;
//    }
//
//}