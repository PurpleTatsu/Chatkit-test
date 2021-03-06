

import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import MessageList from './MessageList';
import Input from './Input';

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentRoom: { users: [] },
      messages: [],
      users: []
    }
    this.addMessage = this.addMessage.bind(this);
  }

  
  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:89fdb86d-cf32-4bd6-a2f8-5285114c23a4',
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/89fdb86d-cf32-4bd6-a2f8-5285114c23a4/token'
      })
    })
    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser: currentUser })
        return currentUser.subscribeToRoom({
          roomId: "fdbb85de-3084-457d-b6ab-561a4cad3e54",
          messageLimit: 50,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message],
              })
            },
          }
        })
      })
      .then(currentRoom => {
        this.setState({
          currentRoom,
          users: currentRoom.userIds
        })
      })
      .catch(error => console.log(error))
      
  }




  addMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    })
      .catch(error => console.error('error', error));
  }
  render() {
    return (
      <div className="header">
        <div id="header-title">
        <img id="dino" src="https://github.com/PurpleTatsu/Chatkit-test/blob/master/chatkit-app/src/images/dino%20sticker%20GA.png?raw=true"/>
        <h2 className="header">Aloha! Start chatting here.</h2>
        </div>
        <MessageList messages={this.state.messages} />
        <Input className="input-field" onSubmit={this.addMessage} />
      </div>
    )
  }
}
export default ChatApp;