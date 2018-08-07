import React, { Component } from 'react';
import { findKey } from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userFormat, userSrs } from 'src/actions/index';

import cuzk from 'src/utils/cuzk';

import Info from 'src/components/info';
import Select from 'src/components/select';
import SearchHint from 'src/components/api/searchHint';

import './apiForm.css';

class ApiForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: 'text', path: 'text', search: "",
            index: -1, help: [], level: "Obec", lowerAdmin: false
        };
    }
    componentDidUpdate = () => {
        let el = this.adminUnitRef;
        if (el && (!el.getAttribute('name') ||
            el.getAttribute('name') === 'adminUnit')) {
            el.setAttribute('name', (new Date() / 1000).toString())
        }
    }
    handleChange = evt => {
        let search = evt.target.value;
        let level;
        if (this.state.help) {
            let find = this.state.help.find(el => search === el.name);
            if (find === undefined) {
                level = "Obec";
            }
            else {
                level = getLevel(find.level);
            }
            this.setState({
                search,
                level
            }, e => {
                if (this.state.search !== '' && this.state.search.length >= 2) {
                    axios.get(`${this.props.hintUrl}${this.state.search}?key=${this.props.profile.freeToken}`)
                        .then(res => {
                            if (search === this.state.search) {
                                this.setState({ help: res.data.adminUnits })
                            }
                        })
                        .catch(e => {
                            this.setState({ help: [] })
                        })
                }
                else {
                    this.setState({ help: [] })
                }

            })
        }
        return;
    }
    handleClick = el => {
        this.setState({ search: el.name, level: getLevel(el.level) }, () => {
            this.formRef.dispatchEvent(new Event('submit'));
            this.formRef.submit();
        });
        this.setState({ help: [] });
    }
    setAdminForm = e => {
        this.adminUnitRef.name = 'adminUnit';
        return true;
    }
    handleKeyDown = evt => {
        let errorKeys = ['[', ']', '(', ')', '{', '}', '.', '?', '#', '%', '*', '+', '/', '\\'];
        let key = evt.key;
        if (errorKeys.indexOf(key) !== -1) {
            evt.preventDefault();
        }
        if (this.state.help) {
            let el = this.state.help[this.state.index];
            switch (key) {
                case 'Enter':
                    if (el !== undefined) {
                        this.setState({ search: el.name, level: getLevel(el.level) },
                            state => {
                                this.handleClick(el);
                            });
                    }
                    break;
                case 'ArrowUp':
                    this.setState(prevState => {
                        return { index: prevState.index - 1 }
                    },
                        () => {
                            if (this.state.index < -1) {
                                this.setState({ index: -1 })
                            }
                        })
                    break;
                case 'ArrowDown':
                    this.setState(prevState => {
                        return { index: prevState.index + 1 }
                    },
                        () => {
                            if (this.state.index >= this.state.help.length) {
                                this.setState({ index: 0 })
                            }
                        })
                    break
                default:
                    return false;
            }
        }
        return;
    }
    handleCheckbox = evt => {
        this.setState({
            lowerAdmin: evt.target.checked
        });
    }
    onFormat = (evt) => {
        this.props.userFormat(evt.target.value);
    }

    onSrs = (evt) => {
        this.props.userSrs(evt.target.value);
    }

    render = () => {
        return (this.props.profile && <form ref={el => this.formRef = el}
            method="post" action={this.props.action}
            className="row justify-content-center mt-2 mb-4"
            onSubmit={this.setAdminForm} >
            <div className="col-lg-5">
                <div className="form-group mb-0" style={{ position: "relative" }}>

                    <label className="font-weight-bold m-0" htmlFor="admin">
                        {this.props.level ? findKey(units, o => o === this.state.level)
                            : 'Town'}</label>


                    <small className="form-text text-muted">{this.props.label}</small>
                    <input ref={(el) => { this.adminUnitRef = el }} type="text" placeholder="Brno" onChange={this.handleChange}
                        className="form-control text-center font-weight-bold"
                        value={this.state.search}
                        id="admin" tabIndex="0" onKeyDown={this.handleKeyDown} />
                    {this.props.level && <input type="hidden" name="level" value={this.state.level} />}
                    <input type="hidden" name="apiKey" value={this.props.profile.freeToken} />
                    {this.state.help && this.props.level ? <SearchHint
                        index={this.state.index}
                        hints={this.state.help}
                        info='level'
                        handleClick={this.handleClick} />
                        :
                        <SearchHint
                            index={this.state.index}
                            hints={this.state.help}
                            info='code'
                            handleClick={this.handleClick} />
                    }
                </div>
                {this.props.level && <div className="checkbox-info custom-checkbox mt-2 align-items-center">
                    <div><input type="checkbox" className="custom-control-input" id="lower-admin"
                        name="lowerAdmin" value={this.state.lowerAdmin} checked={this.state.lowerAdmin}
                        onChange={this.handleCheckbox} />
                        <label
                            ref={el => this.labelRef = el}
                            className="custom-control-label mr-1" htmlFor="lower-admin">Download lower admin units</label>
                    </div>
                    <Info
                        icon="far fa-question-circle"
                        title={<div>Get all towns in chosen district<br />
                            or get all districts in chosen region.</div>}
                    />
                </div>}
                <div className="font-weight-bold m-2">Format</div>
                <Select
                    name="format"
                    onChange={this.onFormat}
                    value={this.props.profile.format}
                    options={cuzk.formats} />
                <div className="font-weight-bold m-2">SRS</div>
                <Select
                    name="srs"
                    onChange={this.onSrs}
                    value={this.props.profile.srs}
                    options={cuzk.srs} />

                <button type="submit" className="btn btn-primary mt-3 mb-2">Download</button>

            </div>
        </form>
        )
    }
}

const units = {
    "Town": "Obec",
    "District": "Okres",
    "Region": "Kraj"
}

const getLevel = (text) => {
    return units[text];
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ userFormat, userSrs }, dispatch);
}

export default connect(null, mapDispatchToProps)(ApiForm);