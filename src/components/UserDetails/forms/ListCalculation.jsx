import React, { Fragment, PureComponent } from "react";
import _ from "lodash";
import { withSnackbar } from "notistack";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import * as InoIcons from "react-icons/io";
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

class ListCalculation extends PureComponent {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
  }

  state = {
    data: [],
    isTableLoading: true,
  };

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
    let allKeys = [
      "Sno",
      "Brand",
      "Product",
      "Price",
      "Qty",
      "Amount",
      "TotalPrice",
    ];
    let excludeKeys = [];
    let keys = _.filter(allKeys, (v) => !_.includes(excludeKeys, v));
    let def = {
      Sno: { dataField: "Sno", text: "Sno", sort: true },
      Brand: { dataField: "Brand", text: "Brand", sort: true },
      Product: { dataField: "Product", text: "Product" },
      Price: { dataField: "Price", text: "Price" },
      Qty: { dataField: "Qty", text: "Qty", sort: true },
      Amount: { dataField: "Amount", text: "Amount", sort: true },
      TotalPrice: { dataField: "TotalPrice", text: "Total Price", sort: true },
    };
    return { keys: keys, def: def };
  }

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

  render() {
    const {  data, columns } = this.state;
    console.log(this.state);
    return (
      <Fragment>
        <Container>
          <Row>
            <div className="User-details-header">Check </div>
          </Row>
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
                                  cellEdit={cellEditFactory({ mode: "click" })}
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
            <a href="/userDetails/checkhistory">
              {" "}
              <Button className="next-btn">Next</Button>
            </a>
          </div>
        </Container>
      </Fragment>
    );
  }
}

export default withSnackbar(ListCalculation);

function getColumns(columnsHeaders, hideColumns) {
  let columns = [];
  const { keys, def } = columnsHeaders;

  _.forEach(keys, (key) => {
    columns.push({ ...def[key], hidden: _.includes(hideColumns, key) });
  });
  return columns;
}
