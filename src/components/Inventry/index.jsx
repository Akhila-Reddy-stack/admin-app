import InventryList from './InventryList';
import AddInventry from './forms/AddInventry';
import React, { Fragment, PureComponent } from 'react';

class Inventry extends PureComponent {
  constructor(props) {
    super(props);
  this.state = {
    userRole: ''
  }
}
 

  async componentDidMount() {
    console.log(";;;;;;;;; props", this.props)
  }


  frameLoad = () => {
    const { match: { params: { pageName } } } = this.props;
    const { userRole } = this.state;
    switch (pageName) {
      case 'list':
        return <InventryList props={this.props} />
      case 'upload':
        return <AddInventry props={this.props} userRole={userRole} />
      case 'edit':
        return <AddInventry props={this.props} userRole={userRole} />
      default:
        return <InventryList props={this.props} />
    }
  }

  render() {
    return (
      <Fragment>
        {this.frameLoad()}
      </Fragment>
    )
  }

}
  export default Inventry;

