import { Fragment, useEffect, useState } from "react";
import { login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Login(){

    const [email,setEmail] = useState('')
    const [password,setPassword]  = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location= useLocation();

     const { loading, error, isAuthenticated } = useSelector(
       (state) => state.authState
     );
     const redirect = location.search?'/'+location.search.split('=')[1]:'/'

    const submitHandler =(e)=>{
        e.preventDefault();
       dispatch( login(email,password))
    }

    useEffect(()=>{

        if(isAuthenticated){
            navigate(redirect)
        }
       if(error){
          toast.error(error, {
            position: "bottom-center",
          })
          return
       }
    },[error,isAuthenticated])
      return (
        <Fragment>
          <div className="logins">
            <div>
              <div>
                <form onSubmit={submitHandler}>
                  <h1 className="log">Login</h1>
                  <div className="ema">
                    <label>Email</label>
                    <input
                      className="emaili"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="ema">
                    <label>password</label>
                    <input
                      className="passi"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <h3>Forgot password</h3>
                  <div>
                    <button disabled={loading}>Login</button>
                    <Link to="/register">
                      
                      <h4>new user</h4>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      );
}