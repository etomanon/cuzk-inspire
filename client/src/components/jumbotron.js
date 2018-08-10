import React, { Component } from 'react';


class Jumbotron extends Component {
  render() {
    return (
      <div className='container'>
      <div className="jumbotron bg-primary text-white">
        <h1 className="display-4">{this.props.title}</h1>
        <p className="lead">{this.props.text}</p>
      </div>
      </div>
        )
    }
}

export default Jumbotron;