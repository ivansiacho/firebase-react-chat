import React, { Component } from 'react';

export default class SmartScroller extends Component {
  componentDidMount() {
    this.autoScroll = true
    this.scrollToBottom();
  }

  componentDidUpdate() {
    if (this.autoScroll) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this.node.scrollTop = this.node.scrollHeight;
  }

  handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = this.node;
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
    this.autoScroll = distanceToBottom < 10;
  }

  render() {
    return (
      <div
        {...this.props}
        ref={node => this.node = node}
        onScroll={this.handleScroll.bind(this)}
      />
    );
  }
}