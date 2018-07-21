import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import {WingBlank,Card} from 'antd-mobile'


class UserList extends Component {
  static propTypes = {
    userList:PropTypes.array.isRequired
  }
  render () {
   
    const userList = this.props.userList.filter(user => user.header)
    
    return (
      <WingBlank style={{marginTop:50,marginBottom:50}}>
        {
          userList.map(item=>(
            <div key={item._id}>
              <Card onClick={()=>{this.props.history.push(`/chat/${item._id}`)}}>
                <Card.Header
                  thumb={require(`../../assets/imgs/${item.header}.png`)}
                  extra={<span>{item.username}</span>}
                />
                <Card.Body>
                  <div>职位：{item.post}</div>
                  { item.company ? <div>公司：{item.company}</div> :null }
                  { item.salary ? <div>薪资：{item.salary}</div> : null }
                  <div>简介：{item.info}</div>
                </Card.Body>
              </Card>
            </div>
          ))
        }
      </WingBlank>
    )
  }
}

export default withRouter(UserList);