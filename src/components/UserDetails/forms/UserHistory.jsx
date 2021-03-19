import _ from "lodash";
import { withSnackbar } from "notistack";
import React, { Fragment, PureComponent } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import * as InoIcons from "react-icons/io";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import DefaultModal from '../../common/forms/DefaultModal'
import {
  Button,
  Col,
  Row,
  Container,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { data } from "./data";
import cellEditFactory from "react-bootstrap-table2-editor";
const { SearchBar } = Search;

class UserHistory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      isTableLoading: true,
      isShow: false,
    };
    this.notificationDOMRef = React.createRef();
  }

  componentDidMount = async () => {
    await this.initTableData();
  };

  initTableData = async () => {
    const { hideColumns } = this.state;
    const columnHeaders = this.getColumnHeaders(this.props.prefixUrl);
    const columns = getColumns(columnHeaders, hideColumns);
    await this.setState({ columns, columnHeaders, hideColumns });
  };

  getColumnHeaders(prefixUrl = "") {
    //dynamic headers
    let allKeys = ["Sno", "NameoftheUser", "Contact", "Date", "Itemnumber"];
    let excludeKeys = [];
    let keys = _.filter(allKeys, (v) => !_.includes(excludeKeys, v));
    let def = {
      Sno: {
        dataField: "Sno",
        text: "Sno",
        sort: true,
        formatter: this.rowFormatter1,
      },
      NameoftheUser: {
        dataField: "NameoftheUser",
        text: "Name of the User",
        sort: true,
        formatter: this.rowFormatter2,
      },
      Contact: {
        dataField: "Contact",
        text: "Contact",
        formatter: this.rowFormatter3,
      },
      Date: { dataField: "Date", text: "Qty", formatter: this.rowFormatter4 },
      Itemnumber: {
        dataField: "Itemnumber",
        text: "Itemnumber",
        sort: true,
        formatter: this.rowFormatter5,
      },
    };
    return { keys: keys, def: def };
  }

  rowFormatter1 = (cell, row, rowIndex, formatExtraData) => {
    let links = [];
    links.push(row.Sno);
    return (
      <div className="actions" onClick={this.HistoryModal}>
        {links.concat(" ")}
      </div>
    );
  };
  rowFormatter2 = (cell, row, rowIndex, formatExtraData) => {
    let links = [];
    links.push(row.NameoftheUser);
    return (
      <div className="actions" onClick={this.HistoryModal}>
        {links.concat(" ")}
      </div>
    );
  };
  rowFormatter3 = (cell, row, rowIndex, formatExtraData) => {
    let links = [];
    links.push(row.Contact);
    return (
      <div className="actions" onClick={this.HistoryModal}>
        {links.concat(" ")}
      </div>
    );
  };
  rowFormatter4 = (cell, row, rowIndex, formatExtraData) => {
    let links = [];
    links.push(row.Date);
    return (
      <div className="actions" onClick={this.HistoryModal}>
        {links.concat(" ")}
      </div>
    );
  };
  rowFormatter5 = (cell, row, rowIndex, formatExtraData) => {
    let links = [];
    links.push(row.Itemnumber);
    return (
      <div className="actions" onClick={this.HistoryModal}>
        {links.concat(" ")}
      </div>
    );
  };
  HistoryModal = async (url, row) => {
    await this.setState({
      isShow: true,
    });
  };
  statusFormatter = (cell, row, rowIndex, formatExtraData) => {
    let links = [];
    if (row.imageStatus === "A") {
      links.push("Active");
      return <div className="actions">{links.concat(" ")}</div>;
    } else {
      links.push("In-Active");
      return <div className="actions">{links.concat(" ")}</div>;
    }
  };

  addNotification = (message, variant = "success") => {
    const { enqueueSnackbar } = this.props;
    const options = {
      variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
        autoHideDuration: 1000,
      },
    };
    enqueueSnackbar(message, options);
  };

  editFun = async (url, row) => {
    let path = url;
    this.props.props.history.push({
      pathname: path,
      state: { row },
      formType: "edit",
    });
  };
  onCloseModal = async () => {
    await this.setState({
      isShow: false,
      selectedRoom: "",
      orderList: [],
    });
  };
  render() {
    const { isShow, data, columns } = this.state;
    console.log(this.state);
    return (
      <Fragment>
        <Container>
          <Row>
            <div className="User-details-header">History </div>
          </Row>
        </Container>
        <br />
        <Container>
          <Row>
            <Col md={12}>
              <div class="card">
                <div
                  className="table-responsive table-div1"
                  id="tablepaddingnew"
                >
                  {data && columns && (
                    <ToolkitProvider
                      keyField="id"
                      data={data}
                      columns={columns}
                      search
                    >
                      {(props) => (
                        <div>
                          <Row className="addrowpadding">
                            <Col sm={10}></Col>
                            <Col sm={2} className="search-btn">
                              <SearchBar {...props.searchProps} />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="table-responsive table-div1">
                                <BootstrapTable
                                  keyField="imageId"
                                  data={data}
                                  columns={columns}
                                  {...props.baseProps}
                                  bootstrap4
                                  pagination={paginationFactory()}
                                  striped
                                  hover
                                  condensed
                                  classes="table table-bordered table-hover table-sm"
                                  wrapperClasses="table-responsive"
                                  // cellEdit={ cellEditFactory({ mode: 'click' }) }
                                  noDataIndication={"No data to display here"}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </ToolkitProvider>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <br />
          <div>
            <Button className="prev">Prev</Button>
              {" "}
              <Button className="next-btn">Next</Button>
          </div>
         
        </Container>
             <Modal
            className="waitermodal"
            open={isShow}
            onClose={this.onCloseModal}
          >
            <div className="user-check">
              <div className="User-details">
                Name &nbsp;&nbsp;&nbsp;: &nbsp; &nbsp;Abdul
              </div>
              <div className="User-details">Contact : 9876567898</div>
              <div className="User-details">
                Id &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                01254
              </div>
            </div>
            <hr className="mt-0" />
            <div>
              <div className="row" style={{ marginBottom: "0.4rem" }}>
                <div className="col-sm-6">Date: 14 Mar 2021</div>
                <div className="col-sm-6">Invoice No:0001</div>
              </div>{" "}
              <b>Purchased Items</b>
            </div>
            <table className="table-sm table-bordered summarytable">
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Brand</th>
                  <th>Products</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tr>
                <td>1</td>
                <td>Beverages</td>
                <td>Bru Filter coffee</td>
                <td>200</td>
              </tr>
            </table>
            <div className="mt-4">
              <div
                className="row justify-content-end"
                style={{ marginBottom: "0.4rem" }}
              >
                <div className="col-sm-6">TotalBillAmount</div>
                <div className="col-sm-6 ">₹ 200</div>
              </div>
              <hr className="border-bottom border-dark" />
              <div className="row justify-content-end">
                <div className="col-sm-6 font-weight-bold">TotalNetAmount</div>
                <div className="col-sm-6 font-weight-bold">₹ 250</div>
              </div>
              <div className="row mt-2 px-3 justify-content-end">
                <div className="col-sm-6   border border-danger" />
              </div>
            </div>
          </Modal>
      </Fragment>
    );
  }
}

export default withSnackbar(UserHistory);

function getColumns(columnsHeaders, hideColumns) {
  let columns = [];
  const { keys, def } = columnsHeaders;

  _.forEach(keys, (key) => {
    columns.push({ ...def[key], hidden: _.includes(hideColumns, key) });
  });
  return columns;
}
