import React, { Component } from 'react';


class ApiRow extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col'>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Description</th>
                  <th>Request</th>
                </tr>
              </thead>
              <tbody>
                {this.props.children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default ApiRow;