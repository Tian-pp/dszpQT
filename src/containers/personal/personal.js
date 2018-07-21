/*
用户个人中心路由组件
 */

import React from 'react'
import {Result, List, WhiteSpace,Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'

import {reset_user} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {
  
  render() {
    const {username,header,info,post,company,salary} = this.props.user
    return (
      <div>
        <Result
          img={<img src={require(`../../assets/imgs/${header}.png`)} style={{width: 50}} alt="header"/>}
          title={username}
          message={company}
        />
        
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位: {post}</Brief>
            <Brief>简介: {info}</Brief>
            {salary ? <Brief>薪资: {salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={() =>
            Modal.alert('退出', '确定要退出登录吗???', [
              { text: '取消', onPress: () => console.log('cancel') },
              { text: '确认', onPress: () => {
                Cookies.remove('userId');
                this.props.reset_user()
                } },
            ])
          }>退出登录</Button>
        </List>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {reset_user}
)(Personal)