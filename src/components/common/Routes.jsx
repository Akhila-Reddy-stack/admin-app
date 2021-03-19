import React, { PureComponent } from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "../dashboard/DashboardPage";
import DashboardList from "../dashboard/DashboardList";
import UserDetailsCard from "../UserDetails/UserDetailscard";
import UserHistory from "../UserDetails/forms/UserHistory";
import ListCalculation from "../UserDetails/forms/ListCalculation";
import UserHistoryPay from "../UserDetails/forms/userHistoryPay";
import UserCheckItemsList from "../UserDetails/forms/UserCheckItems";
import CurrentUser from "../UserDetails/forms/CurrentUser";
import CurrentUserDetails from "../UserDetails/forms/CurrentUserDetails";
import Inventry from "../Inventry/index";

class Routes extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={DashboardPage} />
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route path="/dashboard/list" exact component={DashboardList} />
        <Route path="/inventry/:pageName" exact component={Inventry} />
        <Route path="/userDetails" exact component={UserDetailsCard} />
        <Route path="/userDetails/history" exact component={UserHistory} />
        <Route path="/userDetails/check" exact component={ListCalculation} />
        <Route path="/userDetails/summary" exact component={ListCalculation} />
        <Route
          path="/userDetails/checkhistory"
          exact
          component={UserHistoryPay}
        />
        <Route path="/userDetails/pay" exact component={UserCheckItemsList} />
        <Route path="/userDetails/activeUser" exact component={CurrentUser} />
        <Route
          path="/userDetails/activeUserDetails"
          exact
          component={CurrentUserDetails}
        />
      </Switch>
    );
  }
}

export default Routes;
