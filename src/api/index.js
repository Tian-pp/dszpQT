import ajax from './ajax';

export const reqRegister=({username,password,type})=>ajax('/register',{username,password,type},'POST')

export const reqLogin=({username,password})=> ajax('/login',{username,password},'POST');

export const reqUpdateUser = (user)=> ajax('/update',user,'POST');

export const reqUser = ()=> ajax('/user');

export const reqUserList = (type)=> ajax('/list',{type});
