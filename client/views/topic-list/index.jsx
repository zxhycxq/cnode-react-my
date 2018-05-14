import React from 'react';
import { observer , inject } from 'mobx-react';
import PropTypes from 'prop-types'
import Heimet from 'react-helmet'
import { AppState } from '../../store/app-state'

@inject('appState')
@observer
export default class TopicList extends React.Component{
  
  constructor(){
    super()
    this.changeName=this.changeName.bind(this)
  }
  
  
  componentDidMount() {
    //
  }
  
  asyncBootstrap(){
    return new Promise(()=>{
    
    })
  }
  
  changeName(event){
    this.props.appState.changeName(event.target.value)
  }
  render() {
    return (
        <div>
          <Heimet >
            <title>这是标题</title>
            <meta name="description" content="我是描述"/>
          </Heimet>
           <div>嘿嘿，首页哦-- {this.props._wrapperState.msg}</div>
        </div>
    )
  }
}

TopicList.propTypes={
  appState:PropTypes.object.isRequired,
}
