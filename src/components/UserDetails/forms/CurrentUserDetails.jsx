import _ from "lodash";
import { withSnackbar } from "notistack";
import React, { Fragment, PureComponent } from "react";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import * as InoIcons from "react-icons/io";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Row,
  Container,
} from "reactstrap";
const { SearchBar } = Search;

class CurrentUserDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
  }

  state = {
    data: [],
    isTableLoading: true,
  };

  componentDidMount = async () => {
  };

  render() {
    const { isTableLoading, data, columns } = this.state;
    console.log(this.state);
    return (
      <Fragment>
        <Container>
          <Row className="userhistory-con">
            <div class="userhistory-head"> Check Code</div>
          </Row>
        </Container>
        <br />
        <Container>
          <div class="activeusersList">
            <Row>
              <Col md={6}>
                <input class="form-control" />
                <div> Enter the Customer Id</div>
                <Button className="enter-input"> Enter </Button>
              </Col>
            </Row>
            <div class="active-either">(or)</div>
            <Row>
              <Col md={6}>
                <input class="form-control" />
                <div> Enter the Phone number</div>
                <Button className="enter-input"> Enter </Button>
              </Col>
            </Row>
          </div>
          <br />
          <div>
            <Button className="prev-btn">Prev </Button>
            <Button className="next-btn"> Next</Button>
          </div>
        </Container>
      </Fragment>
    );
  }
}

export default withSnackbar(CurrentUserDetails);
