import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'

export default () => [
  <Route exact path="/" render={() => <Redirect to="/list"/>} component={TopicList} />,
  <Route path="/detail" component={TopicDetail} />,
  <Route path="/list" component={TopicList} />,
]
