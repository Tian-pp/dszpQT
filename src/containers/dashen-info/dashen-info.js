import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {NavBar,List,InputItem,Button,TextareaItem} from 'antd-mobile'

import HeaderSeletor from '../../commonents/herder-selector/header-selector'
import {updateUser} from '../../redux/actions'
class DashenInfo extends Component {
  
  state={
    header:'',
    info:'',
    post:'',
  }
  
  hanlder=(name,val)=>{
    this.setState({
      [name]: val
    })
  }
  
  setHeader=(header)=>{
    this.setState({header})
  }
  
  save=()=>{
    this.props.updateUser(this.state)
  }

  render () {
    const {header,msg} = this.props.user;
    if(header){
      return <Redirect to='/dashen' />
    }
    return (
      <div>
        <NavBar type='primary'>大神信息完善</NavBar>
        <HeaderSeletor  setHeader={this.setHeader}/>
          <List>
            <p className='errorMsg'>{msg}</p>
            <InputItem placeholder='求职岗位' onChange={val=>{this.hanlder('post',val)}} >求职岗位:</InputItem>
            <TextareaItem title='个人介绍' rows={3}  onChange={val=>{this.hanlder('info',val)}}/>
            <Button type='primary' onClick={this.save}>保存</Button>
          </List>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {updateUser}
)(DashenInfo);