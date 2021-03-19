import React, { Component } from "react";
import { Form } from "informed";
import { DatePicker } from "../common/forms/DatePicker";
import { Col, Row } from "reactstrap";
import DashboardCard from "../common/forms/DashboardCard";
import { Link } from "react-router-dom";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      DashBoardData: [],
      initialDate: new Date().toISOString().split("T")[0],
    };
  }
  componentDidMount = async () => {
    setTimeout(
      function () {
        this.setState({ loading: false });
      }.bind(this),
      600
    );
  };

  handleDateChange = async () => {
    this.setState({ loading: true });
    const { OrderDate } = this.formApi.getState().values;
    this.setState({ loading: false });
  };

  setFormApi = (formApi) => (this.formApi = formApi);

  checkcode = async () => {
    console.log("ppppp");
    this.props.history.push("/dashboard/list");
  };

  render() {
    const { loading, DashBoardData, dataSets, initialDate } = this.state;
    return (
      <>
        <Form
          getApi={this.setFormApi}
          initialValues={{ OrderDate: initialDate }}
        >
          {({ formApi, formState }) => (
            <Row className="px-4 mt-2 border-bottom">
              <Col md={3}>
                <DatePicker
                  label="Select Date"
                  className="form-control-sm"
                  faClass="fas fa-filter mr-2"
                  field="OrderDate"
                />
              </Col>
            </Row>
          )}
        </Form>
        {!loading ? (
          <>
            <div className="d-flex p-2 justify-content-around flex-wrap">
              <DashboardCard
                title={DashBoardData.TotalUsers || 0}
                SubTitle="Total Users"
                faClass="far fa-chart-bar"
                background="linear-gradient(315deg, #60dfcd 0%, #1e9afe 74%)"
              />
              <DashboardCard
                title={
                  DashBoardData.Checkcode
                    ? DashBoardData.Checkcode.toFixed(2)
                    : 0
                }
                SubTitle="Total Amount"
                faClass="far fa-chart-bar"
                background="linear-gradient(315deg, #d5adc8 0%, #ff8489 74%)"
              />{" "}
              <DashboardCard
                title={DashBoardData.TotalUsers || 0}
                SubTitle="Check Code"
                faClass="fa fa-check"
                onClick={this.checkcode}
                background="linear-gradient(to right, rgb(86, 171, 47), rgb(168, 224, 99))"
              />
            </div>
          </>
        ) : (
          <></>
        )}
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
