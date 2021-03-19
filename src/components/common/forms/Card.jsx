
import 'styles/style.css';
import 'styles/userstyle.scss';
import React, { Fragment, PureComponent } from 'react';
import * as FaIcons from 'react-icons/fa';
import colorcapsicum from './../../../images/colorcapsicum.jpg';

class Card extends PureComponent {
  render() {
    const { prodname, sellerName, fixprice, offerprice, prodcount, image, children } = this.props;
    return (
      <Fragment>
        <div class="item itemborder1" style={{ width: "250px" }}>
          <div class="" style={{ paddingRight: '15px' }}>
            <div class="row" >
              <div class="col-md-12 bg2" style={{ textAlign: 'center' }}>
                <div className="row text-center">
                  <div className="col-md-12">
                    <span className="prodname" id="paragraph2">{prodname}</span>
                  </div>
                </div>
                <div className="row text-center rowpadding1">
                  <div className="col-md-12">
                    <span id="showrupeecolor" className="fixprice"> <FaIcons.FaRupeeSign /> {fixprice}</span>
                    <span id="hiderupeecolor" className="offerprice"><i class="fa fa-rupee"></i> {offerprice}</span>
                  </div>
                </div>
                <div>
                  <span className="sellerName" id="paragraph1">{sellerName}</span>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Card;

