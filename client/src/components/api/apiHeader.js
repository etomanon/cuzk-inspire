import React, { Component } from 'react';


class ApiHeader extends Component {
  render() {
    return (
      <div className="row mt-3 mb-3">
        <div className="col-lg">
          <div className="h3 text-primary">{this.props.title}</div>
          <hr />
        </div>
      </div>
    )
  }
}

export default ApiHeader;