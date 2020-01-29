import React, { Component, useState, useEffect, useRef } from 'react';
import ChatMessage from './components/ChatMessage';
import Signup from './components/Signup';
import ChatApp from './components/ChatApp';
import Footer from './components/Footer';
// import React, { useState, useEffect, useRef } from "react";


import { default as Chatkit } from '@pusher/chatkit-server';

const chatkit = new Chatkit({
  instanceLocator: "v1:us1:89fdb86d-cf32-4bd6-a2f8-5285114c23a4",
  key: "2ff86d58-869f-4bf7-81e2-3f473aa52533:akQRoLIESjCO8l3m5j3rYYXsHpMt3KhfnwIzkAuZTQo="
})


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentId: '',
      currentView: 'signup'
    }
    this.changeView = this.changeView.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  createUser(username) {
    chatkit.createUser({
      id: username,
      name: username,
    })
      .then((currentUser) => {
        this.setState({
          currentUsername: username,
          currentId: username,
          currentView: 'chatApp'
        })
      }).catch((err) => {
        if (err.status === 400) {
          this.setState({
            currentUsername: username,
            currentId: username,
            currentView: 'chatApp'
          })
        } else {
          console.log(err.status);
        }
      });
  }

  changeView(view) {
    this.setState({
      currentView: view
    })
  }
  
  render() {
    let view = '';
    // const messagesEndRef = useRef(null);
    // const scrollToBottom = () => {
    //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    // };
    // useEffect(scrollToBottom, [view]);
    
    if (this.state.currentView === "ChatMessage") {
      view = <ChatMessage changeView={this.changeView} />
    } else if (this.state.currentView === "signup") {
      view = <Signup onSubmit={this.createUser} />
    } else if (this.state.currentView === "chatApp") {
      view = <ChatApp currentId={this.state.currentId} />
    }
    return (
      <div className="App">
        {view}
      </div>
    );
  }
}
export default App;