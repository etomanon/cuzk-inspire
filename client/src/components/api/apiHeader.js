import React, { Component } from 'react';


class ApiHeader extends Component {
  render() {
    return (
      <div className="row mt-3">
        <div className="col-lg">
          <div className="h3">{this.props.title}</div>
          <hr />
        </div>
      </div>
    )
  }
}

export default ApiHeader;