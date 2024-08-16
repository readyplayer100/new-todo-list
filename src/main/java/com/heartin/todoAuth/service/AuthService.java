package com.heartin.todoAuth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    PasswordEncoder passwordEncoder;

    //加密
    public String createEndocedPwd(String pwd) {
        String encodedPwd = passwordEncoder.encode(pwd);
        return encodedPwd;
    }

    // 密码验证
    public boolean pwdMatch(String newPwd, String originPwd) {
        if (passwordEncoder.matches(newPwd, originPwd)) {
            return true;
        }
        return false;
    }
}
