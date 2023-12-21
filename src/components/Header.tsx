import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../libs/firebase";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <header>
      <div className="container d-flex align-items-center justify-content-between">
        <h1><Link to={user ? "/home" : "/"}>ReVue</Link></h1>
        <ul className="d-flex align-items-center gap-3">
          {!user ?
            (
              <>
                <li className="signup-btn"><Link to="/signup/email">SignUp</Link></li>
                <li className="signin-btn"><Link to="/signIn">SignIn</Link></li>
              </>
            ) : (
              <>
                <li className="logout-btn" onClick={() => { auth.signOut(); navigate("/", { replace: true })}}>Logout</li>
                <li className="user-photo"><img src={user.photoURL || ''} alt="" /></li>
              </>
            )
          }
        </ul>
      </div>
    </header>
  )
}

export default Header