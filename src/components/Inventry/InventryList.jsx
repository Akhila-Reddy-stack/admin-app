import React, { Fragment, PureComponent } from "react";
import _ from "lodash";
import { withSnackbar } from "notistack";
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
import { InventryDetails, deleteInventry } from "../../service/InventryService";
import cellEditFactory from "react-bootstrap-table2-editor";
const { SearchBar } = Search;

const options = {
  variant: "success",
  anchorOrigin: {
    marginTop: "4rem",
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

class InventryList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isTableLoading: true,
    };
    this.notificationDOMRef = React.createRef();
  }

  componentDidMount = async () => {
    await this.InventryDetails();
    await this.initTableData();
  };

  InventryDetails = async () => {
    console.log("oooo");
    let res = await InventryDetails();
    console.log(res);
    if (res.data.status === true) {
      await this.setState({
        inventryList: res.data.data,
      });
      res.data.data.map((d, i) => {
        d["Sno"] = i + 1;
      });
    }
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
      "Itemnumber",
      "Description",
      "Departmentoftheitem",
      // "SecondDescription",
      "Qty",
      "Pricewithtax",
      "Priceyoucharge",
      "Edit",
      "Status",
    ];
    let excludeKeys = [];
    let keys = _.filter(allKeys, (v) => !_.includes(excludeKeys, v));
    let def = {
      Sno: { dataField: "Sno", text: "Sl.No", sort: true },
      Itemnumber: { dataField: "Itemnumber", text: "Item Number", sort: true },
      Description: {
        dataField: "Description",
        text: "Description",
        sort: true,
      },
      Departmentoftheitem: {
        dataField: "Departmentoftheitem",
        text: "Department of the item", sort: true
      },
      // SecondDescription: {
      //   dataField: "SecondDescription",
      //   text: "Second Description",sort: true 
      // },
      Qty: { dataField: "Qty", text: "Qty", sort: true },
      Pricewithtax: { dataField: "Pricewithtax", text: "Price with tax", sort: true },
      Priceyoucharge: { dataField: "Priceyoucharge", text: "Price you charge", sort: true },
      Edit: { dataField: "Edit", text: "Edit", formatter: this.editformatter },
      Status: { dataField: "Status", text: "Status", sort: true, formatter: this.actionsFormatter },
    };
    return { keys: keys, def: def };
  }

  editformatter = (cell, row, rowIndex, formatExtraData) => {
    let links = [];
    links.push(
      <InoIcons.IoMdCreate
        title="Edit"
        onClick={() => this.editFun(`/Inventry/edit`, row)}
      />
    )
    return <div className="actions editcolor">{links.concat(" ")}</div>;
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

  actionsFormatter = (cell, row, rowIndex, formatExtraData) => {
    let links = [];
    links.push(
      <InoIcons.IoMdTrash
        title="Delete"
        onClick={() => this.deleteFun(row)}
      />
    );
    return <div className="actions deletecolor">{links.concat(" ")}</div>;
  };

  deleteFun = async (row) => {
    console.log(";;;;;;;;; row data", row);
    await this.setState({ isTableLoading: true });
    let Itemnumber = row.Itemnumber
    let res = await deleteInventry(Itemnumber)
    console.log(res)
    if (res.data.status === true) {
      this.props.enqueueSnackbar(res.data.message, options);
      await this.initTableData();
    }
    else {
      this.props.enqueueSnackbar("Sorry Failed!!", Eoptions);
    }
    await this.setState({ isTableLoading: false });
    await this.initTableData();
    window.location.reload("/Inventry/list")
  };

  editFun = async (url, row) => {
    let path = url;
    this.props.props.history.push({
      pathname: path,
      state: { row },
      formType: "edit",
    });
    console.log(this.props)
  };

  render() {
    const { isTableLoading, data, columns, inventryList } = this.state;
    console.log(this.state);
    return (
      <Fragment>
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
                <BreadcrumbItem active>Inventry List</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <Row>
            <Col md={12}>
              <div class="card">
                <div
                  className="table-div1"
                  id="tablepaddingnew"
                >
                  {data && columns && (
                    <ToolkitProvider
                      keyField="id"
                      data={inventryList}
                      columns={columns}
                      search
                    >
                      {(props) => (
                        <div>
                          <Row className="addrowpadding">
                            <Col sm={10}>
                              <div className="d-flex justify-content-end">
                                <Link to="/Inventry/upload">
                                  <button
                                    type="button"
                                    class="btn btn-default addbtn"
                                  >
                                    + Add
                                  </button>
                                </Link>
                              </div>
                            </Col>
                            <Col sm={2} className="search-btn">
                              <SearchBar {...props.searchProps} />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className=" table-div1">
                                <BootstrapTable
                                  keyField="imageId"
                                  data={inventryList}
                                  columns={columns}
                                  {...props.baseProps}
                                  bootstrap4
                                  pagination={paginationFactory()}
                                  striped
                                  hover
                                  condensed
                                  classes="table table-bordered table-hover table-sm"
                                  wrapperClasses="table-responsive"
                                  // cellEdit={cellEditFactory({ mode: "click" })}
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
        </Container>
        {/* } */}
      </Fragment>
    );
  }
}

export default withSnackbar(InventryList);

function getColumns(columnsHeaders, hideColumns) {
  let columns = [];
  const { keys, def } = columnsHeaders;

  _.forEach(keys, (key) => {
    columns.push({ ...def[key], hidden: _.includes(hideColumns, key) });
  });
  return columns;
}
