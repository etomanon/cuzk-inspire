import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { userGet, userFormat, userSrs } from '../actions/index';

import Loader from 'src/components/loader'
import Sources from 'src/components/sources';
import Select from 'src/components/select';

import './profile.css'
import cuzk from 'src/utils/cuzk';

class Profile extends Component {

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.props.userGet()
    }, 15000)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  onClick = () => {
    axios.post('/api/profile/token')
      .then(val => {
        this.props.userGet();
      })
  }

  onFormat = (evt) => {
    evt.preventDefault();
    this.props.userFormat(evt.target.value);
  }

  onSrs = (evt) => {
    evt.preventDefault();
    this.props.userSrs(evt.target.value);
  }

  copy = () => {
    this.clipboard.classList.add('api-show')
    let dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value = this.tokenText.textContent;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setTimeout(() => {
      this.clipboard.classList.remove('api-show')
    }, 1500)
  }

  render() {
    const profile = this.props.user.profile;
    return (
      <div>
        <Loader
          loading={profile.pending}
        />
        <div className="container">
          <div className="row align-items-start">
            <div className="col-sm-6 mt-4">
              <ul className="list-group">
                <li className="list-group-item active">{profile.user}</li>
                <li className="list-group-item bg-light">{profile.email}</li>
                <li className="list-group-item">
                  <div className="font-weight-bold mb-2">Your default format</div>
                  <Select
                    onChange={this.onFormat}
                    value={profile.format}
                    options={cuzk.formats} />
                </li>
                <li className="list-group-item">
                  <div className="font-weight-bold mb-2">Your default SRS</div>
                  <Select
                    onChange={this.onSrs}
                    value={profile.srs}
                    options={cuzk.srs} />
                </li>
              </ul>
            </div>
            <div className="col-sm-6 mt-4">
              <li onClick={() => { this.copy() }}
                className="list-group-item active profile-copy">
                Your API key | Click to copy <i className="far fa-copy"></i>
              </li>

              <li onClick={() => { this.copy() }}
                className="list-group-item bg-light profile-copy"
                style={{ wordWrap: 'break-word' }}>
                <span ref={(el) => { this.tokenText = el }}>{profile.freeToken}</span>
                <div ref={(ref) => { this.clipboard = ref }} className="api-popup">
                  <span>API key copied to clipboard</span>
                </div>
              </li>

              <a onClick={this.onClick}
                className="list-group-item list-group-item-action pointer-active font-weight-bold">
                Generate new API key
                </a>
              <li className="list-group-item">Your number of requests:
              <span className="text-primary"> {profile.hits}</span>
              </li>
            </div>
          </div>
          <Sources
            classes="mt-4" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userGet, userFormat, userSrs }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);