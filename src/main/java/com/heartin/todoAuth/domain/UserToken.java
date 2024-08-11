package com.heartin.todoAuth.domain;

import java.io.Serializable;

public class UserToken implements Serializable {

    private static final long serialVersionUID = 1L;

    /** USER ID */
    private String userId;

    /** Token */
    private String token;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}