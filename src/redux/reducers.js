

import {combineReducers} from  'redux'
import {AUTH_SUCCESS,ERRORMSG,RESET_USER,RECEIVE_USER,RECEIVE_USERLIST} from './action-type'

import {getRedirectTo} from '../utils'
const initUser = {
  username:'',
  type:'',
  msg:'',
  redirectTo:''
};
function user(preState=initUser,action) {
  switch (action.type){
    case AUTH_SUCCESS:
      const user = action.data;
      return {...user,redirectTo:getRedirectTo(user.type,user.header)}
    case ERRORMSG:
      const msg = action.data;
      return {...preState,msg}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser,msg}
    default:
      return preState;
  }
}

 const  initUserList =[];
function userList(preState=initUserList,action) {
  switch (action.type){
    case RECEIVE_USERLIST:
      return action.data;
    default:
      return preState;
  }
}

export default combineReducers({
  user,
  userList
})