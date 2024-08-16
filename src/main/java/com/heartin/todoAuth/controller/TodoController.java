package com.heartin.todoAuth.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;

import com.heartin.todoAuth.domain.AllTodoListWithToken;
import com.heartin.todoAuth.domain.TodoList;
import com.heartin.todoAuth.domain.TodoListWithToken;
import com.heartin.todoAuth.domain.UserInfo;
import com.heartin.todoAuth.domain.UserToken;
import com.heartin.todoAuth.service.AuthService;
import com.heartin.todoAuth.service.TodoListService;
import com.heartin.todoAuth.service.UserInfoService;

import jakarta.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.heartin.todoAuth.util.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "*") 
public class TodoController {
	
	@Autowired
	private UserInfoService userInfoService;

	@Autowired
	private TodoListService todoListService;
	
	@Autowired
	private AuthService authService;
	
	
//	@GetMapping("/**/{path:[^.]*}")
//    public String any() {
//        return "forward:/index.html";
//    }
	
	@PostMapping("/login")
    @ResponseBody
    public UserToken login(@RequestBody(required = false) UserInfo user) {
    	System.out.println("useid=" + user.getUserId() + " password=" + user.getPassword());
    	System.out.println("encode password=" + authService.createEndocedPwd(user.getPassword()));
        
        UserInfo loginUser  = userInfoService.login(user.getUserId());
        
        UserToken userToken = new UserToken();
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();

        if (loginUser != null && authService.pwdMatch(user.getPassword(), loginUser.getPassword())){
            userToken.setUserId(user.getUserId());
            userToken.setToken(jwtTokenUtil.generateToken(user.getUserId()));
        }else {
            userToken.setUserId(null);
            userToken.setToken(null);
        }
        return userToken;
    }

	@PostMapping("/add")
    @ResponseBody
    public TodoList addTodo(@RequestBody(required = false) TodoListWithToken todoListWithToken) {
		
    	System.out.println("no=" + todoListWithToken.getToken() + "\n todo=" + todoListWithToken.getTodoList().getComment());
        
    	//验证Token
		TodoList retList = todoListWithToken.getTodoList();
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
        try {
            if (!jwtTokenUtil.validateToken(todoListWithToken.getToken(), todoListWithToken.getUserId()))
        	{
        		//验证出错时No返回-1
        		retList.setSeq(-1);
        		return retList;
        	}
        }catch(Exception ex){
       	   ex.printStackTrace();
    		//验证出错时No返回-1
   	    	retList.setSeq(-1);
   		    return retList;
        }

    	//Token验证OK时
        try {
            todoListService.insert(retList);
            retList.setSeq(todoListService.lastId());

        }catch(Exception ex){
      	   ex.printStackTrace();
    
      	   //保存出错时No返回-2
     		retList.setSeq(-2);
        }
 		return retList;
    }

	@PostMapping("/delete")
    @ResponseBody
    public TodoList deleteTodo(@RequestBody(required = false) TodoListWithToken todoListWithToken) {
		
    	System.out.println("no=" + todoListWithToken.getToken() + "\n todo=" + todoListWithToken.getTodoList().getComment());
        
    	//验证Token
		TodoList retList = todoListWithToken.getTodoList();
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
        try {
            if (!jwtTokenUtil.validateToken(todoListWithToken.getToken(), todoListWithToken.getUserId()))
        	{
        		//验证出错时No返回-1
        		retList.setSeq(-1);
        		return retList;
        	}
        }catch(Exception ex){
       	   ex.printStackTrace();
    		//验证出错时No返回-1
   	    	retList.setSeq(-1);
   		    return retList;
        }

    	//Token验证OK时
        try {
            todoListService.delete(todoListWithToken.getTodoList().getSeq());
            retList.setSeq(0);
            
        }catch(Exception ex){
      	   ex.printStackTrace();
    
      	   //保存出错时No返回-2
     		retList.setSeq(-2);
        }
 		return retList;
    }
	
	@PostMapping("/register")
    @ResponseBody
    public UserInfo register(@RequestBody(required = false) UserInfo user) {
    	System.out.println("userid=" + user.getUserId() + " password=" + user.getPassword());
        
        UserInfo registerUser  = userInfoService.userCheck(user.getUserId());
        UserInfo returnRegisterUser = new UserInfo();

        if (registerUser == null){
        	returnRegisterUser.setUserId(user.getUserId());
        	user.setPassword(authService.createEndocedPwd(user.getPassword()));
        	userInfoService.insertUserInfo(user);
        }
        return returnRegisterUser;
    }
	
	@PostMapping("/update")
    @ResponseBody
    public TodoList updateTodo(@RequestBody(required = false) TodoListWithToken todoListWithToken) {
		
    	System.out.println("no=" + todoListWithToken.getToken() + "\n todo=" + todoListWithToken.getTodoList().getComment());
        
    	//验证Token
		TodoList retList = todoListWithToken.getTodoList();
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
        try {
            if (!jwtTokenUtil.validateToken(todoListWithToken.getToken(), todoListWithToken.getUserId()))
        	{
        		//验证出错时No返回-1
        		retList.setSeq(-1);
        		return retList;
        	}
        }catch(Exception ex){
       	   ex.printStackTrace();
    		//验证出错时No返回-1
   	    	retList.setSeq(-1);
   		    return retList;
        }

    	//Token验证OK
        try {
            todoListService.update(todoListWithToken.getTodoList().getSeq(),todoListWithToken.getTodoList().getStatus());
            retList.setSeq(0);
            
        }catch(Exception ex){
      	   ex.printStackTrace();
    
      	   //保存出错时No返回-2
     		retList.setSeq(-2);
        }
 		return retList;
    }

	@PostMapping("/getAll")
    @ResponseBody
    public AllTodoListWithToken getAllTodo(@RequestBody UserToken userToken) {
		
		System.out.println("user=" + userToken.getUserId() );
        
		AllTodoListWithToken all = new AllTodoListWithToken();
    	all.setUserId(userToken.getUserId());
    	
    	//验证Token
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
        try {
            if (!jwtTokenUtil.validateToken(userToken.getToken(), userToken.getUserId()))
        	{
        		//验证出错时No返回null
            	all.setUserId(null);
        		return all;
        	}
        }catch(Exception ex){
       	   ex.printStackTrace();
    		//验证出错时No返回
       	all.setUserId(null);
		return all;
        }
    	//Token验证OK
        try {
            all.setAllTodoList(todoListService.getAll(userToken.getUserId()));
            
            List<TodoList> todoList = todoListService.getAll(userToken.getUserId());

         // 遍历列表并依次打印每个 TodoList 对象的属性
         for (TodoList todo : todoList) {
             System.out.println("no: " + todo.getSeq());
             System.out.println("userid: " + todo.getUserId());
             System.out.println("comment: " + todo.getComment());
             System.out.println("ddl: " + todo.getDdl());
             System.out.println("status: " + todo.getStatus());
             System.out.println("------------------------");
         }
         
     		return all;
            
        }catch(Exception ex){
      	   ex.printStackTrace();
           all.setAllTodoList(null);
      	   //保存出错时No返回-2
     		return all;
        }
    }
}