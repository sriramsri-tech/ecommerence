import { useEffect, useState } from "react";
import { updatePassword as updatePasswordAction } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function UpdatePassword() {


    const [password,setPassword]= useState("")
    const [oldPassword,setOldPassword]= useState("")

    const { isUpdated, error } = useSelector((state) => state.authState);

    const dispatch = useDispatch()

    const submitHandler= (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('oldPassword',oldPassword)
        formData.append("password", password);
        dispatch(updatePasswordAction(formData))
    }

    useEffect(()=>{
        if (isUpdated) {
          toast("Password Update successfully", {
            type: "success",
            position: "bottom-center",
          })
          setOldPassword("");
          setPassword("")
          return
        }
       if (error) {
         toast.error(error, {
           position: "bottom-center",
         })
         return
       }
    },[isUpdated, error  ])
  return (
    <div className="update-password-container">
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <h2>Update Password</h2>
            <div>
              <label>Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
            </div>

            <div>
              <label>New Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button>Update</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
