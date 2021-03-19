
import Wrapper from './Wrapper';
import { withSnackbar } from 'notistack';
import React, { Fragment, PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

class App extends PureComponent {

  state = {
    isLogedIn: false,
    isWrapper: false,
    isUser: true
  }

  componentDidMount = async () => {
  }

  render() {
    const { isWrapper, isUser, isLogedIn, userRole } = this.state;
    return (
      <Fragment>
        <Wrapper userRole={userRole} />
      </Fragment>
    );
  }
}

export default withSnackbar(App);
