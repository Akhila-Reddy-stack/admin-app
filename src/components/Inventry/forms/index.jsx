import AddInventry from '../forms/AddInventry';
import React, { Fragment, PureComponent } from 'react';

class BannerForms extends PureComponent {
  frameLoad = () => {
    return <AddInventry  props={this.props}  />
  }
  render() {
    return (
      <Fragment>
        {this.frameLoad()}
      </Fragment>
    )
  }
}

export default BannerForms;