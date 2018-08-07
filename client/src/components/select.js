import React, { Component } from 'react';

class Select extends Component {
    render() {
        return (
            <div>
                <select onChange={this.props.onChange} className="custom-select" value={this.props.value}
                    name={this.props.name}>
                    {this.props.options.map((el, i) => {
                        return <option key={i} value={el.name}>{el.name}</option>
                    })}
                </select>
            </div>
        );
    }
}

export default Select;