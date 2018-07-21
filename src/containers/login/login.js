import React, {Component} from 'react';
import {NavBar,WingBlank,List,WhiteSpace,Button,InputItem} from 'antd-mobile'
import{connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import logo from '../img/logo.jpg'
import '../logo/logo.less'
import {login} from '../../redux/actions'

class Login extends Component {
  state = {
    username :'',
    password :'',
  }
  hanlder=(name,val)=>{
    this.setState({
      [name]: val
    })
  }
  
  login =()=>{
    //console.log(this.state);
    this.props.login(this.state);
  }
  
  goRegister=()=>{
    this.props.history.replace('/register')
  }
  
  
  render () {
    const {msg,redirectTo} = this.props.user;
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
      <div >
        <NavBar type='primary'>用户登录</NavBar>
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
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;录</Button>
            <WhiteSpace/>
            <Button onClick={this.goRegister}>未注册用户</Button>
          </WingBlank>
        </List>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {login}
)(Login);