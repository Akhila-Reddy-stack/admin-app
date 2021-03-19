import React, { Fragment } from "react";
import SideNav, { Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import * as InoIcons from 'react-icons/io';
import * as MnoIcons from 'react-icons/md';
import speedometer from '../../../images/speedometer.svg';
import onlineorder from './../../../images/onlineorder1.svg';
import catalog from './../../../images/new images/catalogsidenav.svg';
import category from './../../../images/new images/categorysidenav.svg';
import product from './../../../images/new images/productsidenav.svg';
import offer from './../../../images/new images/offersidenav.svg';


class SidebarNavItems extends React.Component {
  state = {
  }
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log("props", this.props)
  }

  render() {
    const { userRole } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          <SideNav expanded={true}>
            <SideNav.Nav>
              {/* dashboard */}
              <NavItem eventKey="Dashboard" id="sidenavpadding">
                <NavText>
                  <img src={speedometer} className="icon" style={{ width: '31px', margin: '10px' }} /><a href="/sellerdashboard" id="sidenavcolor"> Dashboard </a>
                </NavText>
              </NavItem>
              <NavItem eventKey="Orders">
                <NavText>
                  <img src={onlineorder} className="icon" style={{ width: '31px', margin: '10px' }} /><a href="/orders/order-list" id="sidenavcolor"> Orders
                  </a>
                </NavText>
              </NavItem>
              <NavItem eventKey="Catalog">
                <NavText>
                  <img src={catalog} className="icon" style={{ width: '31px', margin: '10px' }} /> Catalog <span style={{ paddingLeft: '42px' }}> <MnoIcons.MdKeyboardArrowRight style={{ fontSize: '32px', color: '#f5585c' }} /></span>
                </NavText>
                <NavItem eventKey="Catalog" id="submenupadding1">
                  <NavText id="submenupadding">
                    <img src={product} className="icon" style={{ width: '31px', margin: '2px' }} />  <a href="/catalog/products" id="sidenavcolor"> Products</a>
                  </NavText>
                </NavItem>
                <NavItem eventKey="Catalog" id="submenupadding1">
                  <NavText id="submenupadding">
                    <img src={offer} className="icon" style={{ width: '31px', margin: '2px' }} />   <a href="/catalog/offers" id="sidenavcolor"> Offers</a>
                  </NavText>
                </NavItem>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
