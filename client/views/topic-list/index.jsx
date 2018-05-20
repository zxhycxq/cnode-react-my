import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types'
import Heimet from 'react-helmet'
import queryString from 'query-string'

import Tabs, { Tab } from 'material-ui/Tabs';
import List from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import { AppState } from '../../store/app-state'
import Container from '../layout/coontainer';
import TopicListItem from './list-item'
import { tabs } from '../../util/variable-define'

@inject(stores => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
}) @observer
export default class TopicList extends React.Component{
  static contextType = {
    router: PropTypes.object,
  }
  
  constructor(){
    super()
    this.onChangeTab=this.onChangeTab.bind(this);
    this.changeName=this.changeName.bind(this);
    this.listItemClick=this.listItemClick.bind(this);
  }
  componentDidMount() {
    const tab = this.getTab()
    this.props.topicStore.fetchTopics(tab)
  }
  
  componentWillReceiveProps(nextProps) {
  if (nextProps.location.search !== this.props.location.send()){
    this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search))
  }
  }
  
  onChangeTab(e, index) {
    this.context.router.history.push({
      pathname: '/index',
      search: `?tab-${value}`,
    })
  }
  changeName(event){
    this.props.appState.changeName(event.target.value)
  }
  // eslint-disable-line
  listItemClick(topic){
    this.context.router.history.push(`/detail${topic.id}`)
  }
  
  getTab(search) {
    search = search || this.props.location.search;
    const query = queryString.parse(this.props.location.search())
    return query.tab || 'all';
  }
  
  render() {
    const { tabIndex } = this.state;
    const { topicStore } = this.props;
    const topicList = topicStore.topics
    const syncingTopics = topicStore.symlink
    return (
        <Container>
          <Heimet >
            <title>这是标题</title>
            <meta name="description" content="我是描述"/>
          </Heimet>
          <Tabs value={tab} onChange={this.onChangeTab}>
            {
              Object.keys(tabs).map((tab) => {
                <Tab key={tab} label={tabs[tab]} value={tab} />
              })
            }
          </Tabs>
          <List>
            {
              topicList.map(topic =>
                  <TopicListItem
                  key={topic.id}
                  onClick={() => this.listItemClick(topic)}
                  topic={topic}
                  />)
            }
          </List>
          {
            syncingTopics ?
                (
                    <div
                        style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      padding: '40px 0'
                    }}>
                      <CircularProgress color="accent" aize={100}/></div>)
                :null
          }
        </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.object.isRequired
}
TopicList.propTypes = {
  location: PropTypes.object.isRequired
}

export const topicSecondaryStyles = (theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 3,
    },
    count: {
      textAlign: 'center',
      marginRight: 20,
    },
    userName: {
      marginRight: 20,
      color: '#9e9e9e',
    },
    accentColor: {
      color: theme.palette.accent[300],
    },
  }
}

/*
*
*
*
*
*   {
            syncingTopics ?
                <div><CircularProgress color="accent" aize={100}/></div>
            :null
          }
* */
