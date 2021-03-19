import React, { Component } from "react";
import { Form } from "informed";
import { DatePicker } from "../common/forms/DatePicker";
import { Col, Row } from "reactstrap";
import DashboardCard from "../common/forms/DashboardCard";
import './user.scss'

export default class UserDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      DashBoardData: [],
      initialDate: new Date().toISOString().split("T")[0],
    };
  }

  componentDidMount = async () => {
  };

  handleDateChange = async () => {
    this.setState({ loading: true });
    const { OrderDate } = this.formApi.getState().values;
    this.setState({ loading: false });
  };
  setFormApi = (formApi) => this.formApi = formApi

  render() {
    const {
      loading,
      DashBoardData,
      dataSets,
      initialDate,
    } = this.state;
    return (
      <>
        <div className="User-details-header">User Details </div>
        <div className="d-flex p-2 justify-content-around flex-wrap userdetailsCard">
          <a href="/userDetails/history">
            <DashboardCard className="history-color"
              SubTitle="History of Users"
              faClass="fa fa-history"
              background="linear-gradient(315deg, #FF512F 0%, #F09819 74%)"
            /></a>
          <a href="/userDetails/activeUser">
            <DashboardCard className="user-color"
              SubTitle="Current Users"
              faClass="fa fa-user"
              background="linear-gradient(315deg, #11998e 0%, #38ef7d 74%)"
            />
          </a>
        </div>
      </>
    );
  }
}
function getColors(index) {
  let options = [
    {
      backgroundColor: "transparent",
      borderColor: "rgb(131, 77, 155)",
      pointBackgroundColor: "rgb(131, 77, 155)",
    },
    {
      backgroundColor: "transparent",
      borderColor: "rgb(86, 171, 47)",
      pointBackgroundColor: "rgb(86, 171, 47)",
    },
    {
      backgroundColor: "transparent",
      borderColor: "rgb(255, 75, 43)",
      pointBackgroundColor: "rgb(255, 75, 43)",
    },
    {
      backgroundColor: "transparent",
      borderColor: "rgb(0, 131, 176)",
      pointBackgroundColor: "rgb(0, 131, 176)",
    },
  ];
  return options[index];
}
