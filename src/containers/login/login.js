import React, {Component} from 'react';
import {NavBar,WingBlank,List,WhiteSpace,Button,InputItem} from 'antd-mobile'
import logo from '../img/logo.jpg'
import '../logo/logo.less'
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
  login=()=>{
    console.log(this.state);
  }
  
  goRegister=()=>{
    this.props.history.replace('/register')
  }
  
  
  render () {
    return (
      <div >
        <NavBar type='primary'>用户注册</NavBar>
        <div className='logoContainer'>
          <img src={logo} alt="img" className='logo' />
        </div>
        <List>
          <WingBlank>
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

export default Login;