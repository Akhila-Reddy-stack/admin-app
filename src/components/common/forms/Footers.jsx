import Feedback from 'components/common/forms/feedlocation';
import Location from 'components/common/forms/location';
import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from 'service/catalogService';
import { getContactList } from 'service/contactService';
import * as FaIcons from 'react-icons/fa';
import logo from './../../../images/userimages/EFV-Logo.png';

class Footers extends PureComponent {
  state = {
    data: [],
    allCategories: '',
    isLogedIn: false
  }

  componentDidMount = async () => {
    await this.getContactList()
    await this.getCategories();

  }


  getContactList = async () => {
    const res = await getContactList();
    const { data: { statusCode, data } } = res;
    if (!statusCode)
      return this.setState({ data: [], isTableLoading: false });
    await this.setState({ data, isTableLoading: false })
  }

  displaycategories = []
  getCategories = async () => {
    let res = await getCategories()
    if (res.data.statusCode === 1) {
      await this.setState({ allCategories: res.data.data.slice(0, 5) })
    } else {
    }
  }

  render() {
    const { onClick } = this.props;
    const { data, allCategories, isLogedIn } = this.state;
    return (
      <Fragment>
        {data && data.length > 0 &&
          <div>
            <footer id="fooerpadding2" >
              <div className="parallax">
                <div className="container-fluid">
                  <div className="row text-center" style={{ paddingTop: '50px' }}>
                    <div className="col-md-12 footercolumnpadding">
                      <h3 style={{ color: 'white', fontSize: '28px' }}><b><i>GROCERIES</i></b></h3>
                      <p id="footerparagraph" style={{ color: 'white' }}> Groceries is the best platform where you can easily get fresh fruits and veggies baskets. We are working with small families, farmers and all times gather to get produce that are harvested on the same day of the delivery. Groceries is the best platform where you can easily get fresh fruits and veggies baskets. We are working with small families, farmers and all times gather to get produce that are harvested on the same day of the delivery.</p><br />
                    </div>
                  </div>
                  <div className="row p-3">
                    <div className="col-sm-3 col-xs-12"><br />
                      <div className="footer-title">
                        <h3 id="h3heading8">Address</h3>
                      </div>
                      <div className="footer-text">
                        <p style={{ lineHeight: '2.5em' }}>Address : {data[0].address1}</p>
                        <p>{data[0].address2}</p>
                        <p>Phone : {data[0].contactNo}</p>
                        <p>Email : <Link to='' id="alinkcolor2" ><u>groceries@gmail.com</u></Link>
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-2 col-xs-12"><br />
                      <div className="footer-title">
                        <h3 id="h3heading8">Quick Links</h3>
                      </div>
                      <div className="footer-text" style={{ display: 'inline-grid', lineHeight: '2' }}>
                       <p>Fruits</p>
                       <p>Grocery & Staples</p>
                       <p>Home & Kitchen</p>
                       <p>Instant Food</p>
                       <p>Household Needs</p>
                       <p>Vegetables</p>
                      </div>
                    </div>
                    <div className="col-sm-3 col-xs-12"><br />
                      <div className="footer-title">
                        <h3 id="h3heading8">Follow Us On</h3>
                      </div>
                      <a href={data[0].facebook}  ><button className="btn btn-default" id="facebookbtn"><i className="fa fa-facebook"></i></button></a>
                      <a href={data[0].twitter}><button className="btn btn-default" id="twitterbtn"><i className="fa fa-twitter"></i></button></a>
                      <a href={data[0].youtube}  >
                        <button className="btn btn-default" id="youtubebtn"><i className="fa fa-youtube"></i></button></a>
                      <a href={data[0].whatsapp} > <button className="btn btn-default" id="whatsappbtn"><i className="fa fa-whatsapp"></i></button></a>
                      <div className="footer-title"><br/>
                        <h3 id="h3heading8">Explore Our App</h3>
                      </div>
                         <p class="footerdownloadapp" ><FaIcons.FaGooglePlay style={{ fontSize: '21px' }} /> Get It On Google Play</p>
                         <p class="footerdownloadapp" ><FaIcons.FaApple  style={{ fontSize: '21px' }} /> Download On The App Store</p>
                    </div>
                    <div className="col-sm-4">
                      <iframe title="google map ds" src="https://www.google.com/maps/d/u/0/embed?mid=1j9RW9uP2DgykH15H9J9sKwRU_5T2BtLA" frameborder="0" allowfullscreen style={{ width: "100%", height: "100%" }} ></iframe>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col-md-12">
                      <p id="paragraph5">&copy; 2019, Designed And Maintained by <a href="http://www.prematix.com" rel="noopener norefferrer" > Prematix Software Solution Pvt. Ltd.</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        }
        {isLogedIn && <Feedback />}
        <Location />
      </Fragment>
    )
  }
}

export default Footers;