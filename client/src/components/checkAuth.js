import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authGet, userGet } from '../actions/index';

import Loader from 'src/components/loader'

class CheckAuth extends Component {

    componentDidMount() {
        this.props.authGet();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.props.authGet();
        }
        if(this.props.auth.auth && !this.props.user.profile.email && 
            !this.props.user.pending && !this.props.user.error) {
            this.props.userGet()
        }
    }

    render() {
        if (!this.props.auth.auth && publicRoutes.indexOf(this.props.location.pathname) === -1) {
            return (
                <div>
                    <Loader
                        loading={this.props.auth.pending}
                        instant={true}
                    />
                    {
                        this.props.auth.error &&
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col">
                                    <div className="bg-danger text-white p-4 mt-4">
                                        Please, log in.
                                </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            )
        }
        else {
            return this.props.children;
        }
    }
}

const publicRoutes = ["/", "/error"]

function mapStateToProps(state) {
    return {
        user: state.user,
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ authGet, userGet }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckAuth);