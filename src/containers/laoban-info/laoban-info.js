import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar,List,InputItem,Button,TextareaItem} from 'antd-mobile'

import HeaderSeletor from '../../commonents/herder-selector/header-selector'
import {updateUser} from '../../redux/actions'

class LaobanInfo extends Component {
  state={
    header:'',
    info:'',
    post:'',
    salary:'',
    company:''
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
      return <Redirect to='/laoban' />
    }
    return (
      <div>
        <NavBar type='primary'>老板信息完善</NavBar>
        <HeaderSeletor setHeader={this.setHeader}/>
          <List>
            <p className='errorMsg'>{msg}</p>
            <InputItem placeholder='招聘职位' onChange={val=>{this.hanlder('post',val)}}>招聘职位:</InputItem>
            <InputItem placeholder='公司名称' onChange={val=>{this.hanlder('company',val)}}>公司名称:</InputItem>
            <InputItem placeholder='职位薪资' onChange={val=>{this.hanlder('salary',val)}}>职位薪资:</InputItem>
            <TextareaItem title='职位要求:' rows={3}  onChange={val=>{this.hanlder('info',val)}}/>
            <Button type='primary' onClick={this.save}>保存</Button>
          </List>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {updateUser}
)(LaobanInfo);