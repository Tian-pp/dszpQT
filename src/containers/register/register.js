import React, {Component} from 'react';
import {NavBar,WingBlank,List,WhiteSpace,Button,InputItem,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


import logo from '../img/logo.jpg'
import '../logo/logo.less'
import {register} from '../../redux/actions'

class Register extends Component {
  state = {
    username :'',
    password :'',
    repassword :'',
    type : 'laoban'
  }
  hanlder=(name,val)=>{
    this.setState({
      [name]: val
    })
  }
  register=()=>{
   // console.log(this.state);
    this.props.register(this.state);
  }
  
  goLogin=()=>{
    this.props.history.replace('/login')
  }
  
  
  render () {
    const {type} = this.state;
    const {msg,redirectTo} = this.props.user;
    if(redirectTo){
     return <Redirect to={redirectTo} />
    }
    return (
     <div>
       <NavBar type='primary'>用户注册</NavBar>
       <div className='logoContainer'>
         <img src={logo} alt="img" className='logo' />
       </div>
       <List>
         <WingBlank>
           <p className='errorMsg'>{msg}</p>
           <WhiteSpace />
           <InputItem placeholder='请输入用户名' onChange={val=>{this.hanlder('username',val)}}>用户名：</InputItem>
           <WhiteSpace/>
           <InputItem type='password' placeholder='请输入密码' onChange={val=>{this.hanlder('password',val)}}>密&nbsp;&nbsp;码：</InputItem>
           <WhiteSpace/>
           <InputItem type='password' placeholder='请确认密码' onChange={val=>{this.hanlder('repassword',val)}}>确认密码：</InputItem>
           <WhiteSpace/>
           <List.Item>
             <span>用户类型</span>&nbsp;&nbsp;
             <Radio checked={type==='dashen'} onChange={(val)=>{this.hanlder('type','dashen')}}>大神</Radio>&nbsp;&nbsp;&nbsp;
             <Radio checked={type==='laoban'} onChange={(val)=>{this.hanlder('type','laoban')}}>老板</Radio>
           </List.Item>
           <WhiteSpace/>
           <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;册</Button>
           <WhiteSpace/>
           <Button onClick={this.goLogin}>已注册用户</Button>
         </WingBlank>
       </List>
     </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {register}
)(Register);