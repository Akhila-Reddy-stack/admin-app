import "../../../styles/forms.css";

import { post } from "axios";
import BreadCrumb from "../../common/forms/BreadCrumb";
import { CustomSelect } from "../../common/forms/custom-select";
import { Input } from "../../common/forms/Input";
import { Textarea } from "../../common/forms/textarea";
import img1 from "../../../images/2.svg";
import { Form } from "informed";
import Joi from "joi-browser";
import { withSnackbar } from "notistack";
import React, { Fragment, PureComponent } from "react";
import { Col, Row, Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { addInventry, updateInventry } from "../../../service/InventryService";
import { apiUrl } from "../../../config.json";
import ReactNotification from "react-notifications-component";
import { Link } from "react-router-dom";
import DropDown from "../../common/forms/DropDown";

const options = {
  variant: "success",
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
};
const Eoptions = {
  variant: "warning",
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
    autoHideDuration: 5000,
  },
};

class AddInventry extends PureComponent {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.state = {
      data: {},
      img1: img1,
      editVal: false,
      Status: [
        { id: "A", name: "Active" },
        { id: "D", name: "InActive" },
      ],
      PricewithtaxList: [
        { Pricewithtax: "0%", PricewithtaxId: "0%" },
        { Pricewithtax: "5%", PricewithtaxId: "5%" },
        { Pricewithtax: "9%", PricewithtaxId: "9%" },
        { Pricewithtax: "28%", PricewithtaxId: "28%" },
      ],
      tax: null,
      isImage: true,
    };
  }

  validateProperty = (name, value) => {
    const schema = Joi.reach(Joi.object(this.schema), name);
    const { error } = Joi.validate(value, schema);
    return error ? error.details[0].message : null;
  };

  async componentDidMount() {
    console.log(this.props);
    if (this.props.props.location.state != undefined) {
      await this.setState({
        data: this.props.props.location.state.row,
        formType: this.props.props.location.formType,
        tax: this.props.props.location.state.row.Pricewithtax,
      });
    }
    console.log(this.state);
    return this.formStateCheck(this.state.data);
  }

  formStateCheck = async (data) => {
    data["imageURL"] = data.imageURL;
    await this.setState({
      data,
      imageId: data.imageId,
      imageURL: data.imageURL,
      image: data.imageURL,
    });
    try {
      await this.formApi.setValues(data);
    } catch (err) { }
  };


  handleChange = async ({ currentTarget: Input }) => {
    const { name, value } = Input;
    const { data } = this.state;
    data[name] = value;
    await this.setState({
      [name]: value,
    });
  };

  onSubmit = async () => {
    console.log(this.state);
    const data = this.formApi.getState().values;
    const { Pricewithtax } = this.state;
    data["Departmentoftheitem"] = data.Departmentoftheitem;
    data["Itemnumber"] = Number(data.Itemnumber);
    data["Description"] = data.Description;
    data["SecondDescription"] = data.SecondDescription;
    data["Qty"] = data.Qty;
    data["Avgcost"] = data.Avgcost;
    data["Priceyoucharge"] = data.Priceyoucharge;
    data["Pricewithtax"] = Pricewithtax;
    data["Instock"] = data.Instock;
    console.log(this.state);
    if (this.state.formType === "edit") {
      const res = await updateInventry(data);
      console.log(res);
      if (res.data.status === true) {
        this.props.enqueueSnackbar(res.data.message, options);
        setTimeout("location.href = '/Inventry/list';", 3000);
      } else {
        this.props.enqueueSnackbar("Sorry Failed !!", Eoptions);
      }
    } else {
      console.log(data);
      const res = await addInventry(data);
      console.log(res);
      if (res.data.status === true) {
        this.props.enqueueSnackbar(res.data.message, options);
        setTimeout("location.href = '/Inventry/list';", 3000);
      } else {
        this.props.enqueueSnackbar("Sorry Failed !!", Eoptions);
      }
    }
  };

  // Give the alert to the user
  addNotification(data, type = "success") {
    this.notificationDOMRef.current.addNotification({
      title: `${type} Message`,
      message: data,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true },
    });
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };

  taxPercentage = async (event) => {
    console.log(event.target.value);
    await this.setState({
      Pricewithtax: event.target.value,
    });
    console.log(this.state);
  };

  resetForm = async () => {
    const {
      params: { pageName },
    } = this.props.props.props.match;
    this.formApi.reset();
    this.setState({ isImage: false });
    if (pageName === "edit") {
      setTimeout(() => {
        this.props.props.props.history.push(`/Inventry/list`);
      }, 3000);
    }
  };

  render() {
    const { tax, PricewithtaxList, formType } = this.state;
    return (
      <Fragment>
        <ReactNotification ref={this.notificationDOMRef} />
        <Container>
          <Row>
            <Col
              md={12}
              style={{
                textAlign: "center",
                marginTop: "14px",
                paddingLeft: "19px",
              }}
            >
              <Breadcrumb>
                <BreadcrumbItem>
                  {" "}
                  <a href="/dashboard">Dashboard</a>{" "}
                </BreadcrumbItem>
                <BreadcrumbItem>
                  {" "}
                  <a href="/Inventry/list">Inventry List</a>{" "}
                </BreadcrumbItem>
                <BreadcrumbItem active>Add Inventry</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <Row>
            <Col md={12}>
              <div class="">
                <div className="table-div2" id="tablepaddingnew">
                  <Form getApi={this.setFormApi} onSubmit={this.onSubmit}>
                    {({ formApi, formState }) => (
                      <div class="formpadding">
                        <Row className="">
                          <Col md={3} sm={12}>
                            <Input
                              field="Itemnumber"
                              label="Item Number"
                              name="Itemnumber"
                              disabled={formType === "edit" ? true : false}
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col md={3} sm={12}>
                            <Input
                              field="Departmentoftheitem"
                              label="Department of the item"
                              name="Departmentoftheitem"
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col md={3} sm={12}>
                            <Input
                              field="Qty"
                              label="Quantity"
                              name="Qty"
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col md={3} sm={12}>
                            <Input
                              field="Avgcost"
                              label="Avg cost"
                              type="number"
                              name="Avgcost"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                        <Row className="">
                          <Col md={3} sm={12}>
                            <Input
                              field="MRP"
                              label="MRP in (%)"
                              type="number"
                              name="MRP"
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col md={3} sm={12}>
                            <Input
                              field="Priceyoucharge"
                              label="Price you charge in (%)"
                              type="number"
                              name="Priceyoucharge"
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col md={3} sm={12}>
                            <DropDown
                              label="Price with tax in (%)"
                              className="form-control-sm"
                              field="Pricewithtax"
                              optionsNames={{
                                value: "PricewithtaxId",
                                label: "Pricewithtax",
                              }}
                              onChange={(event) => this.taxPercentage(event)}
                              options={PricewithtaxList}
                            />
                          </Col>
                          <Col md={3} sm={12}>
                            <Input
                              field="Instock"
                              label="In stock"
                              type="number"
                              name="Instock"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                        <Row className="">
                          <Col md={6} sm={12}>
                            <Textarea
                              field="Description"
                              label="Description"
                              name="Description"
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col md={6} sm={4}>
                            <Textarea
                              field="SecondDescription"
                              label="Second Description"
                              name="SecondDescription"
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                          <Link to="/Inventry/list">
                            {" "}
                            <button
                              type="button"
                              className="btn btn-warning btn-sm mr-3"
                              id="cancelbtn"
                            >
                              Cancel
                            </button>
                          </Link>
                          <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default withSnackbar(AddInventry);
