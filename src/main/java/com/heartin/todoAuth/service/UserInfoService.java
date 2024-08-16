package com.heartin.todoAuth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.heartin.todoAuth.domain.UserInfo;
import com.heartin.todoAuth.mapper.UserInfoMapper;

@Service
public class UserInfoService {

  @Autowired
  private UserInfoMapper UserInfoMapper;

  @Transactional
  public UserInfo login(String userId) {
    return UserInfoMapper.login(userId);
  }

  @Transactional
  public UserInfo userCheck(String userId) {
    return UserInfoMapper.userCheck(userId);
  }
  
  @Transactional
  public void insertUserInfo(UserInfo userInfo) {
	UserInfoMapper.insertUserInfo(userInfo);
    return;
  }

}