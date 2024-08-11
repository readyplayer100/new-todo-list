package com.heartin.todoAuth.domain;

public class TodoListWithToken {
  
    /** TodoList */
    private TodoList todoList;

    /** USER ID */
    private String userId;

    /** Token */
    private String token;

    public TodoListWithToken() {
        this.todoList = new TodoList(); // 初始化一个新的 TodoList 对象
    }

    public TodoList getTodoList() {
        return todoList;
    }

    public void setTodoList(TodoList todoList) {
        this.todoList = todoList;
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
