import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import { toast } from "react-toastify";
import { clearUpdateProfile } from "../../slices/authSlce";

export default function UpdateProfile() {
  const { loading, error, user, isUpdated } = useSelector(
    (state) => state.authState
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Corrected
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email); // Corrected
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email); // Corrected
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }

    if (isUpdated) {
      toast("Profile Update successfully", {
        type: "success",
        position: "bottom-center",
        onOpen:()=> dispatch(clearUpdateProfile())
      });
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    }
  }, [user, isUpdated, error , dispatch]);

  const onChangeAvatar = (e) => {
    if (e.target.name === "avatar") {
      // Corrected
      setAvatar(e.target.files[0]);
      setAvatarPreview(URL.createObjectURL(e.target.files[0])); // Corrected
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="update-profile-container">
          <div>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email} // Corrected
                onChange={(e) => setEmail(e.target.value)} // Corrected
              />
            </div>
            <div>
              <label>Avatar</label>
              <input type="file" name="avatar" onChange={onChangeAvatar} />
              {avatarPreview && (
                <img src={avatarPreview} alt="Avatar Preview" />
              )}
            </div>
            <button>Update</button>
          </div>
        </div>
      </form>
    </div>
  );
}
