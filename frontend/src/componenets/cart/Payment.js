import { useElements, useStripe } from "@stripe/react-stripe-js"
import { CardNumberElement,CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { validateShipping } from "./Shipping"

export default function Payment(){

    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderInfo =  JSON.parse(sessionStorage.getItem('orderInfo'))
    const {user}= useSelector(state=> state.authState)
    const {items:cartItems , shippingInfo}= useSelector(state=> state.cartState)
    const paymentData = {

        
    amount:  Math.round(orderInfo.totalPrice * 100),
    shipping: {
        name: user.name,
        address:{
            city: shippingInfo.city,
            postal_code:shippingInfo.postalcode,
            country: shippingInfo.country,
            state: shippingInfo.state,
            line1:shippingInfo.address
        },
        phone:shippingInfo.phoneNo    
}
    }
    const order= {
        orderItems : cartItems,
        shippingInfo,
         itemPrice: orderInfo.itemPrice,
       shippingPrice: orderInfo.shippingPrice,
        totalPrice :orderInfo.totalPrice
    }
   
        
       
    
    useEffect(()=>{
        validateShipping(shippingInfo,navigate)        
    },[])

    const submitHandler=(e)=>{
      e.preventDefault()
    }
    return (
      <div>
        <div>
          <form>
            <label>Card Number</label>
            <CardNumberElement type="text" />
            <div>
              <label>Card Expiry</label>
              <CardExpiryElement type="text" />
            </div>
            <div>
              <label>Card Cvc</label>
              <CardCvcElement type="text" />
            </div>
            <div>
                <button>
                    Pay - {'$${orderInfo && orderInfo.totalPrice}'}
                </button>
            </div>
          </form>
        </div>
      </div>
    );
}