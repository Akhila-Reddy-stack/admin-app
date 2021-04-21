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
import DownloadLink from "react-download-link";
import axios from 'axios'
import fileDownload from 'js-file-download'
import { validateProperty } from '../../common/forms/JoiValidation'
import { Loader } from '../../common/forms/Loading/Loader'
import { FaPercent, FaPenAlt } from "react-icons/fa";
const QRCode = require('qrcode');
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

const styles = {
  labelAsterisk: {
    color: "red"
  }
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
      DownloadLink: false,
      isSubmit: false,
      loading: true,
    };
  }

  validateProperty = (name, value) => {
    const schema = Joi.reach(Joi.object(this.schema), name);
    const { error } = Joi.validate(value, schema);
    return error ? error.details[0].message : null;
  };

  async componentDidMount() {
    setTimeout(
      function () {
        this.setState({ loading: false })
      }.bind(this),
      600
    )
    console.log(this.props);
    if (this.props.props.location.state != undefined) {
      await this.setState({
        data: this.props.props.location.state.row,
        formType: this.props.props.location.formType,
        tax: this.props.props.location.state.row.Pricewithtax,
      });
      console.log(this.state);
      return this.formStateCheck(this.state.data);
    }
    const data = this.formApi.getState().values;
    console.log(data)

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

  onSubmit = async () => {
    console.log(this.state);
    const data = this.formApi.getState().values;
    console.log(this.state, data)
    await this.setState({ loading: true })
    if (data.Departmentoftheitem && data.Qty && data.Avgcost && data.Priceyoucharge && data.Instock && data.MRP && data.Pricewithtax) {
      const { Pricewithtax } = this.state;
      data["Departmentoftheitem"] = data.Departmentoftheitem || "";
      data["Description"] = data.Description || "";
      data["SecondDescription"] = data.SecondDescription || "";
      data["Qty"] = data.Qty || "";
      data["Avgcost"] = data.Avgcost || "";
      data["Priceyoucharge"] = data.Priceyoucharge || "";
      data["Pricewithtax"] = Pricewithtax || data.Pricewithtax || "0%";
      data["Instock"] = data.Instock || "";
      data["MRP"] = data.MRP || "";
      console.log(data)
      console.log(this.state);
      if (this.state.formType === "edit") {
        data["Itemnumber"] = this.state.data.Itemnumber;
        const res = await updateInventry(data);
        console.log(res);
        if (res.data.status === true) {
          this.props.enqueueSnackbar(res.data.message, options);
          setTimeout("location.href = '/Inventry/list';", 3000);
        }
        else if (res.data.status === false) {
          this.props.enqueueSnackbar("Sorry Falied", Eoptions);
          setTimeout("location.href = '/Inventry/list';", 3000);
        } else {
          this.props.enqueueSnackbar("Sorry Failed !!", Eoptions);
        }
      } else {
        console.log(data);
        data["Itemnumber"] = this.state.Item;

        // await this.setState({
        //   DownloadLink: "true"
        // })
        const res = await addInventry(data);
        console.log(res);
        if (res.data.status === true) {
          await this.setState({
            DownloadLink: "true",
            Item: data.Itemnumber
          })
          console.log(this.state)
          this.props.enqueueSnackbar(res.data.message, options);
          // this.forceUpdate();
          // this.getDataFromURL(("url"));
          setTimeout("location.href = '/Inventry/list';", 3000);
        }
        else if (res.data.status === false) {
          this.props.enqueueSnackbar("Sorry Falied", Eoptions);
          setTimeout("location.href = '/Inventry/list';", 3000);
        } else {
          this.props.enqueueSnackbar("Sorry Failed !!", Eoptions);
        }
        // await this.setState({
        //   DownloadLink : "true"
        // })
      }
      // this.generateHtmlFile();
    }
    else {
      this.props.enqueueSnackbar("Please Fill Required Details!!", Eoptions);
    }
    await this.setState({ loading: false })

  };

  componentDidUpdate = async () => {
    const data = this.formApi.getState().values;
    console.log(this.state, data)
    if (this.state.formType != "edit") {

      if (data.Departmentoftheitem && data.Qty && data.Avgcost && data.Priceyoucharge && data.Instock && data.MRP && data.Pricewithtax) {
        await this.setState({
          DownloadLink: "true",
          Item:this.state.Item
        })
      }

    }

  }

  getDataFromURL = async (url) => new  Promise(async (resolve, reject) => {
    var bloburl;
    await this.setState({
      Item: new Date().getTime()
    })
    this.forceUpdate();
    await  this.onSubmit();
    var data = this.formApi.getState().values;
    console.log(data, this.state)
    console.log(this.state.DownloadLink, "downloadlink")
    if (this.state.DownloadLink === "true") {
      var ItemNumber = data.Itemnumber
      console.log(this.state)
      var segs = [
        { data: this.state.Item, mode: 'numeric' }
      ]
      console.log(segs)
      QRCode.toDataURL(segs, function (err, url) {
        console.log(url)
        bloburl = url
      })
      // setTimeout(() => {
      //     fetch(bloburl)
      //         .then(response => response.text())
      //         .then(data => {
      //             resolve(data)
      //         });
      // });
      this.handleDownload(bloburl, 'test-download.jpg')
    }
  }, 2000);

  handleDownload = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }
  render() {
    const { loading, PricewithtaxList, formType, isSubmit } = this.state;
    const styles = {
      labelAsterisk: {
        color: "red"
      }
    };
    return (
      <Fragment>
        <ReactNotification ref={this.notificationDOMRef} />
        <Loader fullPage loading={loading} />
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
                  <Form getApi={this.setFormApi}
                    onSubmit={this.onSubmit}
                  >
                    {({ formApi, formState }) => (
                      <div class="formpadding">
                        <Row className="">
                          <Col md={3} sm={12}>
                            <Input
                              required={true}
                              field="Departmentoftheitem"
                              label="Department of the item"
                              name="Departmentoftheitem"
                              faClass={"fas fa-list-alt mr-2"}

                              asterisk={true}
                              required
                              onChange={this.handleChange}
                              required={true}
                              validateOnBlur
                              validate={e =>
                                validateProperty(true, 'name', e, 'Department of the item')
                              }
                              required={true}
                            />
                          </Col>
                          <Col md={3} sm={12}>
                            <Input
                              field="Qty"
                              label="Quantity"
                              name="Qty"
                              faClass={'fas fa-list mr-2'}
                              asterisk={true}
                              required
                              onChange={this.handleChange}
                              validateOnBlur
                              validate={(e) =>
                                validateProperty(true, 'numberRange', e, 'Quantity', { "min": 1, "max": 1000000000 })
                              }
                              required={true}
                            />
                          </Col>
                          <Col md={3} sm={12}>
                            <Input
                              field="Avgcost"
                              label="Avg cost"
                              type="number"
                              name="Avgcost"
                              faClass="fas fa-list mr-2"
                              asterisk={true}
                              required
                              onChange={this.handleChange}
                              validateOnBlur
                              validate={(e) =>
                                validateProperty(true, 'numberRange', e, 'Avgcost', { "min": 1, "max": 1000000000 })
                              }
                              required={true}
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
                              faClass="fas fa-money-bill-wave-alt mr-2"
                              asterisk={true}
                              required
                              onChange={this.handleChange}
                              validateOnBlur
                              validate={(e) =>
                                validateProperty(true, 'numberRange', e, 'MRP', { "min": 1, "max": 1000000000 })
                              }
                              required={true}
                            />
                          </Col>
                          <Col md={3} sm={12}>
                            <Input
                              field="Priceyoucharge"
                              label="Price you charge in (%)"
                              type="number"
                              name="Priceyoucharge"

                              faClass="fas fa-rupee-sign"
                              asterisk={true}
                              required
                              onChange={this.handleChange}
                              validateOnBlur
                              validate={(e) =>
                                validateProperty(true, 'numberRange', e, 'Price you charge', { "min": 1, "max": 1000000000 })
                              }
                              required={true}
                            />
                          </Col>
                          <Col md={3} sm={12}>
                            <DropDown
                              label="Price with tax in (%)"
                              className="form-control-sm"
                              field="Pricewithtax"
                              faClass="fas fa-money-bill-wave-alt mr-2"
                              optionsNames={{
                                value: "PricewithtaxId",
                                label: "Pricewithtax",
                              }}
                              asterisk={true}
                              required
                              onChange={(event) => this.taxPercentage(event)}
                              options={PricewithtaxList}
                            validateOnBlur
                            validate={(e) =>
                              validateProperty(
                                true,
                                'select',
                                e,
                                'Price with tax',
                              )
                            }
                            />
                          </Col>
                          <Col md={3} sm={12}>
                            <Input
                              field="Instock"
                              label="In stock"
                              type="number"
                              name="Instock"
                              asterisk={true}
                              faClass="fas fa-list mr-2"
                              required
                              onChange={this.handleChange}
                              validateOnBlur
                              validate={(e) =>
                                validateProperty(true, 'numberRange', e, 'Instock', { "min": 1, "max": 1000000000 })
                              }
                            />
                          </Col>
                        </Row>
                        <Row className="">
                          <Col md={6} sm={12}>
                            <Textarea
                              field="Description"
                              label="Description"
                              faClass="fas fa-comments"
                              name="Description"
                              onChange={this.handleChange}
                            />
                          </Col>
                          <Col md={6} sm={4}>
                            <Textarea
                              field="SecondDescription"
                              label="Second Description"
                              faClass="fas fa-comments mr-2"
                              icon={<FaPenAlt />}
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
                          {/* <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                          // disabled={this.state.}
                          > */}

                          <DownloadLink className="btn btn-primary btn-sm inventrysubmit"
                            label="Submit"
                            onSubmit={this.onSubmit}
                            // filename="file.png"
                            exportFile={() => Promise.resolve(this.getDataFromURL("url"))}

                          >
                          </DownloadLink>

                          {/* </button> */}

                        </div>
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="px-4 pt-2 ">
            <span style={{ fontSize: "12px", color: "red" }}>
              Note: *  Required Info
            </span>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default withSnackbar(AddInventry);
