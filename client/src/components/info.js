import React, { Component } from 'react';

import './info.css';

export default class Info extends Component {
    render = () => {
        return (
            <i className={`info-icon text-info ${this.props.icon}`}>
                {this.props.title && <div className="info-title">
                    {this.props.title}
                </div>}
            </i>)
    }
}