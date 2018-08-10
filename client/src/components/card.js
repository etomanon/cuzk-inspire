import React, { Component } from 'react';
import './card.css';

class Card extends Component {
    render() {
        return (
            <div className="card card-custom">
                <div className="card-body">
                    <i className={`card-icon text-danger ${this.props.icon}`}></i>
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.text}</p>
                </div>
            </div>
        )
    }
}

export default Card;