

import UserCheckItemsList from "./forms/UserCheckItems";
import React, { Fragment, PureComponent } from "react";
import "./user.scss";
import CurrentUser from "./forms/CurrentUser";
import UserHistory from "./forms/UserHistory";
import CurrentUserDetails from "./forms/CurrentUserDetails";
import ListCalculation from "./forms/ListCalculation";
import UserDetailsCard from './UserDetailscard'
import UserHistoryPay from "./forms/userHistoryPay";

class UserDetails extends PureComponent {
  state = {
    userRole: "",
  };

  async componentDidMount() {
  }
  frameLoad = () => {
    const {
      match: {
        params: { pageName },
      },
    } = this.props;
    const { userRole } = this.state;
    switch (pageName) {
      case "list":
        return <UserDetailsCard props={this.props} userRole={userRole} />;
      case "history":
        return <UserHistory props={this.props} userRole={userRole} />;
      case "summary":
        return <ListCalculation props={this.props} userRole={userRole} />;
      case "checkhistory":
        return <UserHistoryPay props={this.props} userRole={userRole} />;
      case "pay":
        return <UserCheckItemsList props={this.props} userRole={userRole} />;
      case "activeUser":
        return <CurrentUser props={this.props} userRole={userRole} />;
      case "activeUserDetails":
        return <CurrentUserDetails props={this.props} userRole={userRole} />;
      default:
        return;
    }
  };

  render() {
    return <Fragment>{this.frameLoad()}</Fragment>;
  }
}

export default UserDetails;
