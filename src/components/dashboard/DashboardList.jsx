import _ from "lodash";
import { withSnackbar } from "notistack";
import React, { Fragment, PureComponent } from "react";
import {
  Button,
  Col,
  Row,
  Container,
} from "reactstrap";

class DashboardList extends PureComponent {
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

  prevfunc = async () => {
    console.log("ppppp");
    this.props.history.push("/dashboard");
  };

  render() {
    const { data } = this.state;
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
            <Button className="prev-btn" onClick={this.prevfunc}>
              Prev{" "}
            </Button>
            <Button className="next-btn"> Next</Button>
          </div>
        </Container>
      </Fragment>
    );
  }
}

export default withSnackbar(DashboardList);

