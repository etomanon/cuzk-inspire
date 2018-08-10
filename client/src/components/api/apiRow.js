import React, { Component } from 'react';


class ApiRow extends Component {
  render() {
    return (
      <tr>
        <td className="api-row align-middle">{this.props.url}</td>
        <td className="api-row align-middle">{this.props.description}</td>
        <td className="api-row">
          <button type="button" onClick={() => {
            this.props.sendRequest(this.props.request, this.props.url)
          }} className="btn btn-danger" data-toggle="modal" data-target="#responseModal">
            Sample request</button>
        </td>
      </tr>
    )
  }
}

export default ApiRow;