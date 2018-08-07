import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class CheckAuth extends Component {

    render() {
        const profile = this.props.user.profile;
        if (!profile.user && this.props.location.pathname !== '/') {
            return (
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="bg-danger text-white p-4 mt-4">
                                Please, log in.
                                </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return this.props.children;
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default withRouter(connect(mapStateToProps)(CheckAuth));