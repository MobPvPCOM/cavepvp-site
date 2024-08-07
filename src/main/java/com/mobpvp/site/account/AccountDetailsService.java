package com.mobpvp.site.account;

import com.mobpvp.site.model.profile.ProfileModel;
import com.mobpvp.site.model.account.ForumAccountModel;
import com.mobpvp.site.request.RequestHandler;
import com.mobpvp.site.request.RequestResponse;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class AccountDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        RequestResponse response = RequestHandler.get("forum/account/login/%s", username);

        if (!response.wasSuccessful())
            throw new UsernameNotFoundException(username);

        ForumAccountModel account = new ForumAccountModel(response.asObject());
        if (account.getPassword() == null)
            throw new UsernameNotFoundException(username);

        response = RequestHandler.get(
                "profile/%s?webResolved=true&includePermissions=true",
                account.getUuid().toString()
        );

        if (!response.wasSuccessful())
            throw new UsernameNotFoundException(username);

        ProfileModel profile = new ProfileModel(response.asObject());
        return new User(
                profile.getUuid().toString(),
                account.getPassword(),
                getAuthority(profile)
        );
    }

    private List<GrantedAuthority> getAuthority(ProfileModel account) {
        List<GrantedAuthority> authorities = new ArrayList<>();

        account.getPermissions().forEach((permission, value) -> {
            if (value)
                authorities.add(new SimpleGrantedAuthority(permission));
        });

        return authorities;
    }

}