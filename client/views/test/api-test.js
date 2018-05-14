import React from 'react';
import axios from 'axios';

/* eslint-enable */
export default class TestApi extends React.Component {
  getTopics(){
    axios.get('/api/topics')
         .then (resp => {
           console.log (resp);
         }).catch (err => {
      console.log (err);
    })
  }
  
  login(){
    axios.post('/api/user/login', {
      accesstoken: 'sdfasdfdsaf'
    }).then(resp => {
      console.log (resp);
    }).catch(err => {
      console.log(err);
    })
    
  }
  
  markAll() {
    axios.post('/api/message/markAll?needAccessToken=true')
         .then(resp => {
           console.log (resp);
         }).catch(err => {
      console.log(err);
    })
  }
  
  render() {
    return (
        <div>
          <Button onClick={this.getTopics}>topics</Button>
          <Button onClick={this.login}>login</Button>
          <Button onClick={this.markAll}>marklogin</Button>
        </div>
    )
  }
}
/* eslint-enable */
