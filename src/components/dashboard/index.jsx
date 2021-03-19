import DashboardPage from "./DashboardPage";
import DashboardList from "./DashboardList";
import React, { Fragment, PureComponent } from "react";

class Dashboard extends PureComponent {
  state = {
    userRole: "",
  };

  async componentDidMount() {
    console.log(";;;;;;;;; props", this.props);
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
        return <DashboardList props={this.props} userRole={userRole} />;
      default:
        return <DashboardPage props={this.props} />;
    }
  };

  render() {
    console.log(this.props);
    return <Fragment>{this.frameLoad()}</Fragment>;
  }
}

export default Dashboard;
