package com.heartin.todoAuth.mapper;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import com.heartin.todoAuth.domain.TodoList;

@Mapper
public interface TodoListMapper {
	  int lastId();
	  void insert(TodoList todolist);
	  List<TodoList>  getAll(String userId);
	  void delete(int seq);
	  void update(int seq, String status);
}