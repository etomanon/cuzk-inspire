import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import './App.css';
import Navigation from 'src/main/navigation';
import Home from 'src/apps/home';
import Footer from 'src/main/footer';
import Download from 'src/apps//download/download';
import Profile from 'src/apps/profile';
import AdminUnit from 'src/apps/download/sources/adminUnit';
import Building from 'src/apps/download/sources/building';
import CheckAuth from 'src/components/checkAuth';
import PageFade from 'src/components/pageFade';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation location={this.props.location.pathname}/>
        <TransitionGroup>
          <PageFade key={this.props.location.pathname}>
            <div className="text-center">
              <CheckAuth>
                <Switch location={this.props.location}>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/profile' component={Profile} />
                  <Route exact path='/download' component={Download} />
                  <Route exact path='/download/admin-unit' component={AdminUnit} />
                  <Route exact path='/download/building' component={Building} />
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
