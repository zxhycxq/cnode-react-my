import React from 'react';
import { observer , inject } from 'mobx-react';
import PropTypes from 'prop-types'

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
  changeName(event){
    this.props.appState.changeName(event.target.value)
  }
  render() {
    return (
        <div>
           <div>嘿嘿，首页哦-- {this.props._wrapperState.msg}</div>
        </div>
    )
  }
}

TopicList.propTypes={
  appState:PropTypes.object.isRequired,
}
