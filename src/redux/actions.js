
import io from 'socket.io-client'

import {AUTH_SUCCESS,ERRORMSG,RECEIVE_USER,RESET_USER,RECEIVE_USERLIST} from './action-type'
import {reqRegister,reqLogin,reqUpdateUser,reqUser,reqUserList} from '../api'

export const success = user =>({ type: AUTH_SUCCESS , data:user })

export const errorMsg = msg =>({ type:ERRORMSG , data:msg })

export const receive_user = user =>({ type:RECEIVE_USER , data:user })

export const reset_user = msg =>({ type:RESET_USER , data:msg });

export const receive_userList = userList =>({ type:RECEIVE_USERLIST , data:userList });


export function register(user) {
  const {username,password,repassword,type} = user;
  if(!username){
    return errorMsg('用户名不能为空')
  }else if(!password){
    return errorMsg('密码不能为空')
  }else if(password !==repassword){
    return  errorMsg('两次输入密码不一致')
  }else if(!type){
    return errorMsg('请选择用户类型')
  }
  return async dispatch=>{
    const response = await reqRegister({username,password,type});
    console.log(response);
    const result = response.data
    if(result.code===0){
      dispatch(success(result.data))
    }else {
      dispatch(errorMsg(result.msg))
    }
  }
  
}

export  function login(user) {
  
  return async dispatch=>{
    const {username,password} = user;
    if(!username){
      dispatch(errorMsg('用户名不能为空'))
      return
    }else if(!password){
      dispatch(errorMsg('密码不能为空'))
      return
    }
    const response =await reqLogin({username,password})
    const result = response.data
    if(result.code===0){
      dispatch(success(result.data))
    }else {
      dispatch(errorMsg(result.msg))
    }
  }
  
}

export function updateUser(user) {
  const {header,info,post,company,salary} = user;
  if(!header){
    return errorMsg('请选择头像')
  }else if(!info){
    return errorMsg('请完善信息')
  }else if(!post){
    return  errorMsg('请完善信息')
  }
  return async dispatch=>{
    const response = await reqUpdateUser({header,info,post,company,salary});
   // console.log(response);
    const result = response.data;
    if(result.code === 0){
      dispatch(receive_user(result.data))
    }
  }
}

export function getUser() {
  return async dispatch=>{
    const response = await reqUser();
    const result = response.data;
    if(result.code === 0){
      dispatch(receive_user(result.data))
    }else {
      dispatch(reset_user(result.msg))
    }
  }
}

export function getUserList(type) {
  return async dispatch=>{
    const response =await reqUserList(type);
    const result = response.data;
    if(result.code === 0){
      dispatch(receive_userList(result.data))
    }else {
      dispatch(reset_user(result.msg))
    }
  }
}

const socket = io('ws://localhost:4000')
socket.on('receiveMsg',chatMsg=>{
  console.log('receiveMsg',chatMsg);
})

export function sendMessage({content,from,to}) {
  return dispatch=>{
    socket.emit('sendMsg',{content,from,to})
    console.log('sendMsg',{content,from,to});
  }
}