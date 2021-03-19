import "../../../styles/nav.css";
import React, { Fragment, PureComponent } from "react";
import * as InoIcons from "react-icons/io";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  async componentDidMount() {
    console.log(";;;;;;;; props", this.props);
  }

  toggle = async () => {
    await this.setState({ isOpen: !this.state.isOpen });
  };



  render() {
    return (
      <Fragment>
        <section className="header-section">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/dashboard">ADMIN </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="p-0 pl-3 pr-3">
                    <UncontrolledDropdown>
                      <DropdownToggle className="p-0 bg-white border-0">
                        <span style={{ color: "rgb(245, 88, 92)" }}>
                          Profile
                        </span>
                        <InoIcons.IoIosContact
                          style={{
                            color: "rgb(245, 88, 92)",
                            height: "25px",
                            width: "35px",
                          }}
                        />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          className="pl-3 text-dark logout"
                          onClick={this.logout}
                        >
                          {" "}
                          <InoIcons.IoIosLogOut style={{ color: "red" }} />{" "}
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </section>
      </Fragment>
    );
  }
}

export default Header;
