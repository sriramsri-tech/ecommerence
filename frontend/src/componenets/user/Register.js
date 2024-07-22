import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register (){

    const [userData, setUserData] = useState({
      name: "",
      email: "",
      password: "",
      avatar: null,
    });


    const onChange = (e) => {
      if (e.target.name === "avatar") {
        // If the input is for the avatar, update the state with the selected file
        setUserData({ ...userData, avatar: e.target.files[0] });
      } else {
        setUserData({ ...userData, [e.target.name]: e.target.value });
      }
    };

   //     const onChange =(e) =>{
    //        setUserData({...userData, [e.target.name] : e.target.value})
    //    }


        const dispatch = useDispatch()
        const { loading, error, isAuthenticated } = useSelector(
          (state) => state.authState
        );
         const navigate = useNavigate();

        const submitHandler = (e) =>{
            e.preventDefault()
            const formData = new FormData();
            formData.append('name', userData.name)
            formData.append("email", userData.email);
            formData.append("password", userData.password);

             formData.append("avatar", userData.avatar);

        dispatch(register(formData))
        }

        useEffect(()=>{
            if (isAuthenticated) {
              navigate("/");
              return
            }
             if (error) {
               toast.error(error, {
                 position: "bottom-center",
               });
               return;
             }
        },[error, isAuthenticated])
    return (
      <div>
        <div className="logins">
          <div>
            <div>
              <form onSubmit={submitHandler}>
                <h1 className="log">Login</h1>
                <div>
                  <label className="emails">Name</label>
                  { <input
                    className="emaili"
                    type="name"
                    name="name"
                    onChange={onChange}
                  /> }
                </div>

                <div className="ema">
                  <label className="emails">Email</label>
                  <input
                    className="emaili"
                    type="email"
                    name="email"
                    onChange={onChange}
                  />
                </div>
                <div className="ema">
                  <label className="emails">password</label>
                  <input
                    className="passi"
                    type="password"
                    name="password"
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label className="emails">Avatar</label>
                  <input
                    type="file"
                    onChange={onChange}
                  />
                </div>

             //   <div>//how to show</div>
                <div>
                  <button disabled={loading}>Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}