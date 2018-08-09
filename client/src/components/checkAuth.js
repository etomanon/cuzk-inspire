import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userGet } from '../actions/index';

import Loader from 'src/components/loader'

class CheckAuth extends Component {

    componentDidMount() {
        this.props.userGet();
    }

    render() {
        if (!this.props.user.profile.user && publicRoutes.indexOf(this.props.location.pathname) !== -1) {
            return (
                <div>
                    <Loader
                        loading={this.props.user.pending}
                        instant={true}
                    />
                    {
                        this.props.user.error &&
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
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ userGet }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckAuth);