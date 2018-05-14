import React, {Component} from 'react';
import { observable, computed, autorun, action } from 'mobx';

export class AppState{
  @observable count = 0
  @observable name='jake'
  @computed get msg(){
    return `${this.name} 说 ，count 是${this.count}`
  }
  @action add(){
    this.count +=1
  }
  @action changeName(){
    this.name = name
  }
}

const appState=new AppState()
autorun(()=>{
  console.log(appState.msg);
})

setInterval(()=>{
  appState.add()
},2000)



