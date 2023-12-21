import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../libs/firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate();

  const [user] = useAuthState(auth);


  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          navigate("/home", { replace: true });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  }

  return (
    <div className="signin-page d-flex align-items-center justify-content-center flex-column">
      <h2 className="siginin-title">sign In</h2>
      <div className="signup-img-box">
        <img src="/images/signup-image.svg" alt="" />
      </div>
      <form onClick={handleSignIn}>
        <div className="input-email-box">
          <input type="text" ref={emailRef} placeholder="email" />
        </div>
        <div className="input-password-box">
          <input type="password" ref={passwordRef} placeholder="passward"/>
        </div>
        <button className="signin-submit">送信</button>
      </form>
    </div>
  )
}

export default SignIn