import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state) => state.authState);
  return (
    <div className="profile">
      <div>
        <Link to="/myprofile/update">
          <button>
            <h2>Edit profile</h2>
          </button>
        </Link>

        <div>
          <h3>Name : {user.name}</h3>
          <h3>email : {user.email}</h3>
        </div>
        <div>
          <h4>Joined : {String(user.createAt).substring(0, 10)}</h4>
          <div className="button-container">
            <Link to="/orders">
              <button className="small-button">
                <h2>My Orders</h2>
              </button>
            </Link>
            <Link to="/myprofile/update/password">
              <button className="small-button">
                <h3>Change Password</h3>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
