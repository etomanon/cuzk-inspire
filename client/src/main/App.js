import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { Redirect } from 'react-router-dom';

import Navigation from 'src/main/navigation';
import Home from 'src/apps/home';
import Footer from 'src/main/footer';
import Download from 'src/apps//download/download';
import Profile from 'src/apps/profile';
import AdminUnit from 'src/apps/download/sources/adminUnit';
import Building from 'src/apps/download/sources/building';
import Error404 from 'src/apps/error404';

import CheckAuth from 'src/components/checkAuth';
import PageFade from 'src/components/pageFade';

import './App.css';
import './Bootstrap.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation location={this.props.location.pathname} />
        <TransitionGroup>
          <PageFade key={this.props.location.pathname}>
            <div className="text-center">
              <CheckAuth location={this.props.location}>
                <Switch location={this.props.location}>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/profile' component={Profile} />
                  <Route exact path='/download' component={Download} />
                  <Route exact path='/download/admin-unit' component={AdminUnit} />
                  <Route exact path='/download/building' component={Building} />
                  <Route exact path='/404' component={Error404} />
                  <Route render={() => <Redirect to="/404" />} />
                </Switch>
              </CheckAuth>
              <Footer />
            </div>
          </PageFade>
        </TransitionGroup>
      </div>
    );
  }
}

export default App;
