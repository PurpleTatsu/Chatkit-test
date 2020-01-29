import React, { Component } from 'react';
import ScrollIntoView from 'react-scroll-into-view';


class MessageList extends Component {

  render() {

    let heroHealth = 50;
    return (
      <ul className="message-list">
        {this.props.messages.map((message, index) => (

          <li key={index} className="cont" ref={(ref) => this.messages = ref}>
            <ScrollIntoView selector={index}>
              <h4 className="message-sender">{message.senderId}</h4>
{/* javascript logic within interpolation */}
              <p className="message-text">{message.text}</p>

            </ScrollIntoView>


          </li>
        ))}
        <li></li>
      </ul>
    )
  }
}
export default MessageList;