import Header from './common/forms/Header';
import SideNav from './common/forms/SideNav';
import Routes from './common/Routes';
import React, { Fragment, PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';

class Wrapper extends PureComponent {
  render() {
    const { userRole } = this.props;
    return (
      <Fragment>
        <Header userRole={userRole} />
        <Container fluid >
          <Row>
            <SideNav userRole={userRole} />
            <Col md={2} sm={12} className="p-0">
              {/* {this.props.userRole === 'A' &&
                <SideNav userRole={userRole} />
              } */}
            </Col>
            <Col className="content" md={10} sm={12} >
              <Routes   props={this.props}/>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default Wrapper;
