package com.mobpvp.site.config;

import lombok.RequiredArgsConstructor;
import com.mobpvp.site.account.AccountDetailsService;
import com.mobpvp.site.config.firewall.SiteHttpFirewall;
import com.mobpvp.site.config.logout.SiteLogoutHandler;
import com.mobpvp.site.config.filter.SiteUrlFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SiteSecurityConfig extends WebSecurityConfigurerAdapter {

    public static final SiteUrlFilter FILTER
            = new SiteUrlFilter();

    public static final LogoutHandler LOGOUT_HANDLER
            = new SiteLogoutHandler();

    public static final AntPathRequestMatcher MATCHER
            = new AntPathRequestMatcher("/logout");

    private final BCryptPasswordEncoder passwordEncoder;
    private final SiteAuthSuccessHandler successHandler;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        UserDetailsService service = new AccountDetailsService();

        auth.userDetailsService(service)
                .passwordEncoder(this.passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .headers()
                .contentTypeOptions()
                .and()
                .xssProtection()
                .and()
                .cacheControl()
                .and()
                .httpStrictTransportSecurity()
                .includeSubDomains(true)
                .maxAgeInSeconds(31536000)
                .and()
                .frameOptions()
                .deny()
                .and()
                .cors()
                .and()
                .authorizeRequests()
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .successHandler(successHandler)
                .loginPage("/login")
                .failureUrl("/login")
                .failureHandler((httpServletRequest, httpServletResponse, e) -> {
                    e.printStackTrace();
                    httpServletRequest.getSession().setAttribute("error_message", "Invalid username or password.");
                    httpServletResponse.sendRedirect("/login");
                })
                .usernameParameter("username")
                .passwordParameter("password")
                .and()
                .addFilterBefore(FILTER, UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutRequestMatcher(MATCHER)
                .addLogoutHandler(LOGOUT_HANDLER)
                .and()
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .exceptionHandling();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.httpFirewall(new SiteHttpFirewall());
        web.ignoring().antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/img/**");
    }

}
