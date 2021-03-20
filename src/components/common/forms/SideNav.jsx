import React, { Fragment } from "react";
import SideNav, { Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import * as InoIcons from 'react-icons/io';
import * as MnoIcons from 'react-icons/md';
import speedometer from '../../../images/speedometer.svg';
import catalog from './../../../images/catalogsidenav.svg';
import userlist from './../../../images/listsidenav.svg';


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


