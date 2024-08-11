package com.heartin.todoAuth.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.heartin.todoAuth.domain.UserInfo;

@Mapper
public interface UserInfoMapper {
  UserInfo login(String userId, String password);
  UserInfo userCheck(String userID);
  void insertUserInfo(UserInfo userInfo);
}