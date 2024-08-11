package com.heartin.todoAuth.domain;

import java.util.List;

public class AllTodoListWithToken {
  
	/** TodoList */
    private List<TodoList> allTodoList;

    /** USER ID */
    private String userId;

    /** Token */
    private String token;

    public List<TodoList> getAllTodoList() {
        return allTodoList;
    }

    public void setAllTodoList(List<TodoList> allTodoList) {
        this.allTodoList = allTodoList;
    }

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