import React, { Component } from 'react';

class SearchHint extends Component {
    render() {
        return (
            this.props.hints.length > 0 && <div className="mt-1">
                {this.props.hints.map((el, i) => {
                    let classes = "form-control search-hint"
                    if(i === this.props.index) {
                        classes += " search-hint--active"
                    }
                    return <div onClick={e => { this.props.handleClick(el) }} className={classes}
                        key={i}><div>{el.name}</div> <div>{el[this.props.info]}</div></div>
                })}
            </div>
        )
    }
}

export default SearchHint;