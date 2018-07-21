import React, {Component} from 'react';
import {NavBar} from 'antd-mobile'
import {Route,Switch} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie';
import {connect} from 'react-redux'

import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from '../laoban-info/laoban-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NavFooter from '../../commonents/navFooter/navFooter'
import {getUser} from '../../redux/actions'
import {getRedirectTo} from '../../utils'
import NotFound from '../../commonents/not-found/not-found'
import Chat from '../chat/chat'

class Main extends Component {
 
  
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]
  
  componentDidMount=()=>{
    const id = Cookies.get('userId');
    const userId = this.props.user._id;
    if(!userId && id){
      this.props.getUser();
    }
}
  
  render () {
    const userId = Cookies.get('userId');
    
    if(!userId){
     return <Redirect to='/login'/>
    }
    const {user}=this.props;
    if(!user._id){
      return null;
    }
    const path = this.props.location.pathname;
    if(path === '/'){
      return <Redirect to={getRedirectTo(user.type,user.header)}/>
    }
    
   const currentNav = this.navList.find(function (nav,index) {
      return  nav.path === path
    })
    
    
    const {navList} = this;
    if(user.type==='laoban'){
      navList[1].hide=true;
    }else {
      navList[0].hide=true;
    }
    return (
      <div>
        { currentNav ? <NavBar type='primary' className='fixed-header'>{currentNav.title}</NavBar> : null }
        <Switch>
          <Route path='/dasheninfo' component={DashenInfo}/>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/laoban' component={Laoban}/>
          <Route path='/dashen' component={Dashen}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>
          <Route path='/chat/:userid' component={Chat}/>
          <Route  component={NotFound}/>
        </Switch>
        { currentNav ?  <NavFooter navList={navList}/> : null }
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {getUser}
)(Main);