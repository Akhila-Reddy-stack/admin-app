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
} from "reactstrap";
import { data } from "./data1";
import cellEditFactory from "react-bootstrap-table2-editor";
const { SearchBar } = Search;

class CurrentUser extends PureComponent {
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
    let allKeys = ["Sno", "Name", "InTime", "Status"];
    let excludeKeys = [];
    let keys = _.filter(allKeys, (v) => !_.includes(excludeKeys, v));
    let def = {
      Sno: { dataField: "Sno", text: "S.no", sort: true },
      Name: { dataField: "Name", text: "Name", sort: true },
      InTime: {
        dataField: "InTime",
        text: "In Time",
        sort: true,
      },
      Status: {
        dataField: "Status",
        text: "Status",
        sort: true,
      },
    };
    return { keys: keys, def: def };
  }

  render() {
    const { data, columns } = this.state;
    console.log(this.state);
    return (
      <Fragment>
        <Container className="userhistory-con">
          <Row>
            <div class="userhistory-head"> Current Users:</div>
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
            <Button className="next-btn">Next</Button>
          </div>
        </Container>
      </Fragment>
    );
  }
}

export default withSnackbar(CurrentUser);

function getColumns(columnsHeaders, hideColumns) {
  let columns = [];
  const { keys, def } = columnsHeaders;

  _.forEach(keys, (key) => {
    columns.push({ ...def[key], hidden: _.includes(hideColumns, key) });
  });
  return columns;
}
