import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import './navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = _.debounce(this.handleScroll.bind(this), 50);
    this.scrollTop = 0;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(evt) {
    let scrollingDown = (this.scrollTop - window.scrollY < 0);
    this.scrollTop = window.scrollY;
    let hidden = this.navig.classList.contains('nav-hide');
    if (!scrollingDown) {
      if (hidden) {
        this.navig.classList.remove('nav-hide');
      }
      return
    }
    else if (this.offset(this.navig).top > 40 && !hidden) {
      this.navig.classList.add('nav-hide');
    }
    else if (this.offset(this.navig).top <= 40 && hidden) {
      this.navig.classList.remove('nav-hide');
    }
  }

  offset(el) {
    let rect = el.getBoundingClientRect(),
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop };
  }

  renderProfile() {
    return (this.props.user.profile.user && this.props.auth.auth) ?
      [
        <li key="download" className="nav-item">
          <NavLink onClick={this.handleToggle} className="nav-link"
            activeClassName="font-weight-bold" exact
            to="/download">Download</NavLink>
        </li>,
        <li key="profile" className="nav-item">
          <NavLink onClick={this.handleToggle} className="nav-link"
            activeClassName="font-weight-bold" exact
            to="/profile">Profile</NavLink>
        </li>,
        <li key="logout" className="nav-item">
          <a className="nav-link" href="/api/auth/logout">Logout</a>
        </li>
      ]
      :
      <li className="nav-item">
        <a className="nav-link" href="/api/auth/google">
        Login with <i title="Google Plus" style={{color: "#DC4E42", fontSize: "1.25rem", verticalAlign: "text-bottom"}} className="fab fa-google-plus"></i></a>
      </li>

  }

  handleToggle = () => {
    if (this.mobileNav.classList.contains('show')) {
      this.toggler.click();
    }
  }

  render() {
    return (
      <div className="container fixed-top nav-parent"
        ref={(nav) => { this.navig = nav; }} >
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
          <NavLink to="/"
            className="navbar-brand text-primary align-middle"
          >
            <i className="fas fa-database"></i>
          </NavLink>
          <button className="navbar-toggler" type="button"
            data-toggle="collapse" data-target="#navbarToggler"
            aria-controls="navbarToggler" aria-expanded="false"
            aria-label="Toggle navigation" ref={(el) => { this.toggler = el }}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div ref={el => this.mobileNav = el}
            className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink onClick={this.handleToggle}
                  className="nav-link"
                  exact
                  activeClassName="font-weight-bold" to="/">Home</NavLink>
              </li>
              {this.renderProfile()}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Navigation);