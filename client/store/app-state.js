import React, {Component} from 'react';
import { observable, computed, autorun, action } from 'mobx';

export class AppState{
  constructor({count,name}={count:0,name:'qwe'}){
    this.count=count,
    this.name=name
  }
  
  @observable count
  @observable name
  @computed get msg(){
    return `${this.name} 说 ，count 是${this.count}`
  }
  @action add(){
    this.count +=1
  }
  @action changeName(){
    this.name = name
  }
  toJson(){
    return {
      count:this.count,
      name:this.name,
    }
  }
}

const appState=new AppState()
autorun(()=>{
  console.log(appState.msg);
})

setInterval(()=>{
  appState.add()
},2000)



