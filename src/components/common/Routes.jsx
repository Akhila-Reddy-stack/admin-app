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
  constructor(props) {
    super(props);
  this.state = {

  }
}

  render() {
    console.log(this.props)
    return (
      <Switch>
        {/* <Route path="/" exact component={DashboardPage} /> */}
        {/* <Route path="/dashboard" exact component={DashboardPage} /> */}
        <Route path="/dashboard/list" exact component={DashboardList}  props={this.props.props} />
        <Route path="/inventry/:pageName" exact component={Inventry}   props={this.props.props.props}/>
        <Route path="/userDetails" exact component={UserDetailsCard}  props={this.props} />
        <Route path="/userDetails/history" exact component={UserHistory}   props={this.props}/>
        <Route path="/userDetails/check" exact component={ListCalculation}  props={this.props} />
        <Route path="/userDetails/summary" exact component={ListCalculation}   props={this.props}/>
        <Route
          path="/userDetails/checkhistory"
          exact
          component={UserHistoryPay}  props={this.props}
        />
        <Route path="/userDetails/pay" exact component={UserCheckItemsList}  props={this.props} />
        <Route path="/userDetails/activeUser" exact component={CurrentUser}   props={this.props}/>
        <Route
          path="/userDetails/activeUserDetails"
          exact
          component={CurrentUserDetails}  props={this.props}
        />
      </Switch>
    );
  }
}

export default Routes;
