package com.heartin.todoAuth.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.heartin.todoAuth.domain.TodoList;
import com.heartin.todoAuth.domain.UserInfo;
import com.heartin.todoAuth.mapper.TodoListMapper;
import com.heartin.todoAuth.mapper.UserInfoMapper;

@Service
public class TodoListService {

  @Autowired
  private TodoListMapper todoListMapper;


  @Transactional
  public void insert(TodoList todoList) {
	  todoListMapper.insert(todoList);
	  return;
    
  }
  
  @Transactional
  public int lastId() {
	  return todoListMapper.lastId();
    
  }

  @Transactional
  public List<TodoList>  getAll(String userId) {
    return todoListMapper.getAll(userId);
  }
  
  @Transactional
  public void delete(int seq) {
	  todoListMapper.delete(seq);
    return;
  }

  @Transactional
  public void update(int seq, String status) {
	  todoListMapper.update(seq, status);
    return;
  }

}