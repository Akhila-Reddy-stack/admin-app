import React, { Fragment, PureComponent } from 'react';
import { Container, Col, Row } from 'reactstrap';

class DashBoxNew extends PureComponent {

  componentDidMount = async () => {
  }

  redirect = async () => {
    const { id, path, name, data, cname } = this.props;
    if (name === 'product-details') {
      this.props.props.history.push({
        pathname: path,
        state: { id: id, cname: cname },
      })
    } else {
      this.props.props.history.push({
        pathname: path,
        state: { data: data, cname: cname },
      })
    }
  }

  render() {
    const { bgClass, topic, value, status, icon, } = this.props;
    return (
      <Fragment>
        <div className={bgClass} onClick={this.redirect} style={{ cursor: "pointer" }}>
          <Container>
            <Row>
              <Col md={4}>
                <div class="iconimage1"> 
                  {icon}
                </div>
              </Col>
              <Col md={8} style={{ paddingTop: '28px', paddingLeft: '44px', textAlign: 'center' }}>              
                <p className="sml-title">{topic}</p>
                <p className="price">{value}</p>
                <p className="percent">{status} </p>
              </Col>
            </Row>

          </Container>
        </div>
      </Fragment>
    )
  }
}

export default DashBoxNew;