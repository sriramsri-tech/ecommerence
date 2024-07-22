import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckOutsteps";
import { toast } from "react-toastify";

   export const validateShipping = (shippingInfo, navigate) => {
     if (
       !shippingInfo.address ||
       !shippingInfo.city ||
       !shippingInfo.state ||
       !shippingInfo.country ||
       !shippingInfo.phoneNo
     ) {
       toast.error("please fill the shipping information");
       navigate("/shipping");
     }
   };
  

export default function Shipping() {


  const { shippingInfo ={}} = useSelector((state) => state.cartState);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);

 

  // Convert the countries object to an array of country names
  const countryList = Object.values(countries).map((country) => country.name);
  const dispatch = useDispatch()
    const navigate = useNavigate();


   const onSubmit= (e)=>{
    e.preventDefault();
      dispatch(saveShippingInfo({address,city,phoneNo,postalCode,country,state}))
      navigate("/shipping/order/confirm");
   }

  return (
    <Fragment Shipping={true}>
      <CheckoutSteps />
      <form onSubmit={onSubmit}>
        <div className="shipping-container">
          <div className="shipping-form">
            <h2>Shipping Info</h2>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone No</label>
              <input
                type="number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countryList.map((countryName, index) => (
                  <option key={index} value={countryName}>
                    {countryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="number"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
