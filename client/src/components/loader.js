import React, { Component } from 'react';

import './loader.css';

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    componentDidMount = () => {
        this.componentDidUpdate(this.props);
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.loading && !prevProps.loading) {
            this.hide();
            this.loading();
        }
        if (!this.props.loading && prevProps.loading) {
            this.hide();
        }
    }

    loading = () => {
        if (this.props.instant) {
            this.show();
        }
        else {
            setTimeout(() => {
                if (this.props.loading) {
                    this.show();
                }
            }, 2000);
        }
    }

    show = () => {
        this.setState({ show: true });
    }

    hide = () => {
        this.setState({ show: false });
    }

    render = () => {
        if (this.props.loading && this.state.show) {
            return (
                <div className="loading">
                    <div className="loading__bar"></div>
                    <div className="loading__bar"></div>
                    <div className="loading__bar"></div>
                    <div className="loading__bar"></div>
                </div>
            )
        }
        else {
            return null
        }
    }
}

export default Loader;