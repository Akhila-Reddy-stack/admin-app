import React, { Component } from 'react';
export default class CustomCard extends Component {
  render() {
    return (
      <div className="bg-white box-style" children={this.props.children}>
      </div>
    )
  }
} 