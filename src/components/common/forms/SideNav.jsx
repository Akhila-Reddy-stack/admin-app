import React, { Fragment } from "react";
import SideNav, { Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import * as InoIcons from 'react-icons/io';
import * as MnoIcons from 'react-icons/md';
import seller from '../../../images/seller.svg';
import speedometer from '../../../images/speedometer.svg';
import onlineorder from './../../../images/onlineorder1.svg';
import catalog from './../../../images/new images/catalogsidenav.svg';
import customer from './../../../images/new images/customerssidenav.svg';
import banner from './../../../images/new images/bannerssidenav.svg';
import contact from './../../../images/new images/contactdetailssidenav.svg';
import category from './../../../images/new images/categorysidenav.svg';
import product from './../../../images/new images/productsidenav.svg';
import offer from './../../../images/new images/offersidenav.svg';
import userlist from './../../../images/new images/listsidenav.svg';
import employeelist from './../../../images/new images/employeesidenav.svg';
import feedback from './../../../images/new images/feedbacksidenav.svg';

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
               <img src={speedometer} className="icon"  style={{width:'31px', margin: '10px'}}/><a href="/dashboard" id="sidenavcolor"> Dashboard </a>
               </NavText>
             </NavItem>
             <NavItem eventKey="Inventry" id="sidenavpadding">
               <NavText>
               <img src={catalog} className="icon"  style={{width:'31px', margin: '10px'}}/><a href="/inventry/list" id="sidenavcolor"> Inventry
                 </a>
               </NavText>
             </NavItem>
              <NavItem eventKey="USerDetails" id="sidenavpadding">
               <NavText>
               <img src={userlist} className="icon"  style={{width:'31px', margin: '10px'}}/><a href="/userDetails" id="sidenavcolor"> User Details             
                 </a>
               </NavText>
             </NavItem>
            </SideNav.Nav>
          </SideNav>
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
