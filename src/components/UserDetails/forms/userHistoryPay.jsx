import _ from "lodash";
import { withSnackbar } from "notistack";
import React, { Fragment, PureComponent } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import * as InoIcons from "react-icons/io";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Row,
  Container,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { data } from "./dataa";
import cellEditFactory from "react-bootstrap-table2-editor";
const { SearchBar } = Search;

class UserHistoryPay extends PureComponent {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
  }

  state = {
    data: data,
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
    let allKeys = ["Sno", "Date", "Status", "Payment", ""];
    let excludeKeys = [];
    let keys = _.filter(allKeys, (v) => !_.includes(excludeKeys, v));
    let def = {
      Sno: { dataField: "Sno", text: "S.no", sort: true },
      Date: { dataField: "Date", text: "Date", sort: true },
      Status: {
        dataField: "Status",
        text: "Status",
        sort: true,
      },
      Payment: {
        dataField: "Payment",
        text: "Payment",
        sort: true,
      },
      "": {
        dataField: "",
        text: " ",
        sort: true,
      },
    };
    return { keys: keys, def: def };
  }
  render() {
    const { isTableLoading, data, columns } = this.state;
    const breadCrumbItems = {
      title: "Inventry",
      items: [
        { name: "Home", active: false, link: "/dashboard" },
        { name: "Inventry", active: true },
      ],
    };

    console.log(this.state);
    return (
      <Fragment>
        <Container className="userhistory-con">
          <div>
            <div class="userhistory-head"> Result</div>
            <div class="user-wrap">
              <div> Name :</div>
              <div> Contact :</div>
              <div> Id :</div>
              <div> History :</div>
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
                            <Col sm={2}>
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
                                  cellEdit={cellEditFactory({ mode: "click" })}
                                  pagination={paginationFactory()}
                                  striped
                                  hover
                                  condensed
                                  classes="table table-bordered table-hover table-sm"
                                  wrapperClasses="table-responsive"
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
            <Button className="prev-btn">Prev </Button>
            <a href="/userDetails/pay">   <Button className="next-btn">Next </Button></a>
          </div>
        </Container>
        {/* } */}
      </Fragment>
    );
  }
}

export default withSnackbar(UserHistoryPay);

function getColumns(columnsHeaders, hideColumns) {
  let columns = [];
  const { keys, def } = columnsHeaders;

  _.forEach(keys, (key) => {
    columns.push({ ...def[key], hidden: _.includes(hideColumns, key) });
  });
  return columns;
}
