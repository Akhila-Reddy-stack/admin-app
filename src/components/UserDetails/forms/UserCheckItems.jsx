import _ from "lodash";
import { withSnackbar } from "notistack";
import React, { Fragment, PureComponent } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import {
  Button,
  Col,
  Row,
  Container,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import cellEditFactory from "react-bootstrap-table2-editor";
const { SearchBar } = Search;

class UserCheckItemsList extends PureComponent {
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
    let allKeys = ["Sno", "Brand", "Product", "Net", "Qty", "Amount", "Price"];
    let excludeKeys = [];
    let keys = _.filter(allKeys, (v) => !_.includes(excludeKeys, v));
    let def = {
      Sno: { dataField: "Sno", text: "S.no", sort: true },
      Brand: { dataField: "Brand", text: "Brand", sort: true },
      Product: {
        dataField: "Product",
        text: "Product",
        sort: true,
      },
      Net: {
        dataField: "Net",
        text: "Net",
        sort: true,
      },
      Qty: {
        dataField: "Qty",
        text: "Qty",
        sort: true,
      },
      Amount: {
        dataField: "Amount",
        text: "Amount",
        sort: true,
      },
      Price: {
        dataField: "Price",
        text: "Price",
        sort: true,
      },
    };
    return { keys: keys, def: def };
  }


  render() {
    const { isTableLoading, data, columns } = this.state;
    console.log(this.state);
    return (
      <Fragment>
        <Container className="userhistory-con">
          <Row>
            <div class="userhistory-head"> Check Items</div>
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
                          <div className="net-calculation">
                            <div class="tot">
                              <span>Total </span>
                              <span>
                                {" "}
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp;: &nbsp;{" "}
                              </span>
                              <span> 1500 </span>
                            </div>
                            <div class="tot">
                              <span>GST </span>
                              <span>
                                {" "}
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp;&nbsp;&nbsp; &nbsp;: &nbsp;{" "}
                              </span>
                              <span> 500 </span>
                            </div>
                            <div class="tot">
                              <span>Net Amount</span>
                              <span> &nbsp;: &nbsp; </span>
                              <span> 2000 </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </ToolkitProvider>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {/* } */}
      </Fragment>
    );
  }
}

export default withSnackbar(UserCheckItemsList);

function getColumns(columnsHeaders, hideColumns) {
  let columns = [];
  const { keys, def } = columnsHeaders;

  _.forEach(keys, (key) => {
    columns.push({ ...def[key], hidden: _.includes(hideColumns, key) });
  });
  return columns;
}
