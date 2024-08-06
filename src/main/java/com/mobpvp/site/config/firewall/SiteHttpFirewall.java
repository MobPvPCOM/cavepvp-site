package com.mobpvp.site.config.firewall;

import org.springframework.security.web.firewall.FirewalledRequest;
import org.springframework.security.web.firewall.RequestRejectedException;
import org.springframework.security.web.firewall.StrictHttpFirewall;

import javax.servlet.http.HttpServletRequest;

public class SiteHttpFirewall extends StrictHttpFirewall {

    @Override
    public FirewalledRequest getFirewalledRequest(HttpServletRequest request) {
        try {
            return super.getFirewalledRequest(request);
        } catch (RequestRejectedException exception) {
            return new FirewalledRequest(request) {
                @Override
                public void reset() {}
            };
        }
    }

}