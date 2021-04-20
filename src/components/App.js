
import Wrapper from './Wrapper';
import { withSnackbar } from 'notistack';
import React, { Fragment, PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

class App extends PureComponent {
  constructor(props) {
    super(props);
  this.state = {
    isLogedIn: false,
    isWrapper: false,
    isUser: true
  }
}

  componentDidMount = async () => {
  }

  render() {
    const { isWrapper, isUser, isLogedIn, userRole } = this.state;
    return (
      <Fragment>
        <Wrapper userRole={userRole} props={this.props} />
      </Fragment>
    );
  }
}

export default withSnackbar(App);
