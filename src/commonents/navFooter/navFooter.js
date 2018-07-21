import React, {Component} from 'react';
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
class NavFooter extends Component {
  static ={
    navList:PropTypes.array.isRequired
  }
  render () {
    const navList = this.props.navList.filter(nav=>!nav.hide)
    const path = this.props.location.pathname;
    return (
     <TabBar>
       {
         navList.map((item)=>(
           <TabBar.Item key={item.path}
                        title={item.text}
                        icon={{ uri:require(`./imgs/${item.icon}.png`) }}
                        selectedIcon={{ uri:require(`./imgs/${item.icon}-selected.png`) }}
                        selected={item.path===path}
                        onPress={()=>this.props.history.replace(item.path)}
            />
         ))
       }
     </TabBar>
    )
  }
}

export default withRouter(NavFooter);